<template>
  <div class="table-header-container"></div>
  <div class="tender-table">
    <div class="table-title">
      <h1> Tenders</h1>
    </div>
    <table style="width: 150%;" v-if="tenders.length !==0">
      <thead>
      <tr>

        <th>
          FIELD <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          CONTRACTOR NAME <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          TENDER STATUS <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          DEADLINE <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          OFFER STATUS <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="tender in tenders" :key='tender'>
        <td style="width: 30%;text-align: center; color: #3895bd"><a @click="onTenderFieldClick(tender)" type="button" >

          {{tender['cpv'] ? tender['cpv']['name']+'/'+tender['cpv']['field'] : ''}}</a></td>
        <td style="width: 30%;text-align: center; color: #42474d">{{tender['name']}}</td>
        <td style="width: 20%;text-align: center; color: #60c758">{{tender['tenderStatus'] ? tender['tenderStatus'].name : ''}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{tender['deadForSinging'] ? formatDate(tender['deadForSinging']) : ''}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{tender['offerStatus'] ? tender['offerStatus'].name : ''}}</td>
      </tr>
      </tbody>
    </table>
    <v-pagination
        :disabled = "tenders.length === 0"
        v-model="page"
        :length="pageCount"
        :showFirstLastPage="true"
        :size="count"
        @update:modelValue="pageChange()"
    ></v-pagination> <div class="v-pagination_list"></div>

      <div class="blank-table" v-if="tenders.length ===0">
        <div class="no-tenders">There are no published Tenders</div>
      </div>
  </div>
</template>

<script>
import {getAuthenticatedHeaders, logout} from "@/common_functions";
import {API_BASE_URL} from "@/const_config.js";
export default {
  emits: ['desOfTender'],
  data() {
    return {
      count: 5,
      page: 1,
      tenderCount: 0,
      tenders: [],
    }
  },
  computed: {
    pageCount() {
      return (this.tenderCount%this.count !== 0) ? this.tenderCount / this.count + 1 : this.tenderCount/this.count
    }},
  async beforeMount() {
    try {
      this.tenders = await fetch(API_BASE_URL + '/tenders?page=' + (this.page - 1) + '&count=' + this.count, {
        method: 'GET',
        node: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: getAuthenticatedHeaders(),
      }).then((response) => {
            if (response.ok) {
              return response.json()
            } else if (response.status === 401 || response.status === 403) {
              logout();

            }
          }
      )
          .then(response => {
            return response;
          });
      this.tenderCount = await fetch(API_BASE_URL + '/tenders/count', {
        method: 'GET',
        node: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: getAuthenticatedHeaders(),
      }).then((response) => {
            if (response.ok) {
              return response.json()
            } else if (response.status === 401 || response.status === 403) {
              logout();
            }
          }
      )
          .then(response => {
            return response;
          });
    } catch (error) {
      console.error(error);
    }

  },
  methods: {

    async pageChange() {
      this.tenders = await fetch(API_BASE_URL + '/tenders?page=' + (this.page - 1) + '&count=' + this.count, {
        method: 'GET',
        node: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: getAuthenticatedHeaders(),
      }).then((response) => {
            if (response.ok) {
              return response.json()
            } else if (response.status === 401 || response.status === 403) {
              logout();
            }
          }
      )
          .then(response => {
            return response;
          });
    },

    formatDate(miliseconds) {
      let d = new Date(miliseconds);
      return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
          d.getFullYear() ;

    },
    onTenderFieldClick(tender) {
      this.$emit("TenderDesOpen", tender);
    },
  }
}
</script>

<style scoped>
.tender-table{
  margin-top: -5.6rem;
  padding-left: 20%;
  max-width: 60%;
}

.table-header-container {
  height: 10.6875rem;
  max-width: 101.2%;
  margin-left: -0.5rem;
  margin-top: 5.125rem;
  border-color: #ffffff;
  background-color: #27aae1;
}

table  {
  border-spacing: 0;
  border-collapse: collapse;
  background-color: #ffffff;
}

.blank-table {
  max-width: 100%;
  background-color: #ffffff;
  height: 15rem;
}
.no-tenders {
  text-align: center;
  font-size: 1.875rem;
  padding: 6.25rem;
}

tbody>tr {
  height: 5rem;
  border: solid gray;
  border-width: 0.0625rem 0 ;
}

thead{
  background-color: #1a4583;
  border-color: #0a50ad;
  color: #ffffff;
  height: 1.875rem;
}

.table-title {
  font-size: 1.5625rem;
  color: #ffffff;
}
.v-pagination_list {
  display: inline-flex;
  list-style-type: none;
  justify-content: center;
  width: 150%;
}







</style>