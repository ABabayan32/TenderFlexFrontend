<template>
  <div class="header-container"></div>
  <div class="tender-table">
    <div class="table-title">
      <h1> Tenders</h1>
    </div>
    <table style="width: 150%;" v-if="tenders.length !==0">
      <thead>
      <tr>

        <th class="uppercase">
          field <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th class="uppercase">
          contractor name <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th class="uppercase">
          tender status <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th class="uppercase">
          deadline <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="tender in tenders" :key='tender'>
        <td class="column-small" style=" color: #3895bd"><a @click="onTenderFieldClick(tender)" type="button" >
          {{tender['cpv'] ? tender['cpv']['name']+'/'+tender['cpv']['field'] : ''}}</a></td>
        <td class="column-small">{{tender['name']}}</td>
        <td class="column-small" :class="{'status-green': tender['tenderStatus'] && tender['tenderStatus'].id ===1}" >{{tender['tenderStatus'] ? tender['tenderStatus'].name : ''}}</td>
        <td class="column-small">{{tender['deadForSinging'] ? formatTenderDate(tender['deadForSinging']) : ''}}</td>
      </tr>
      </tbody>
    </table>
    <v-pagination v-if="tenders.length !== 0"
        :disabled = "tenders.length === 0"
        v-model="page"
        :length="pageCount"
        firstIcon="fa fa-angle-double-left"
        lastIcon="fa fa-angle-double-right"
        next-icon="fa fa-angle-right"
        prev-icon="fa fa-angle-left"
        :showFirstLastPage="true"
        :size="count"
        @update:modelValue="pageChange()"
    ></v-pagination>
  </div>
  <div class="blank-table blank-table-width" v-if="tenders.length === 0">
    <div class="no-tenders">There are no published Tenders</div>
  </div>
</template>

<script>
import {formatDate, getAuthenticatedHeaders, logout} from "@/utils";
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

    formatTenderDate(miliseconds) {
      let d = new Date(miliseconds);
      return formatDate(d);
    },
    onTenderFieldClick(tender) {
      this.$emit("TenderDesOpen", tender);
    },
  }
}
</script>

<style scoped>


.column-small {
  width:30%;
  text-align: center;
  color: #42474d;
}


.uppercase {
  text-transform: uppercase;
}
.tender-table{
  margin-top: -6.567rem;
  padding-left: 20%;
  max-width: 60%;
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
.v-pagination__item--is-active {
  border-radius: 0px;
  position: static !important;
  background-color: #ed6528 !important;
}

.status-green {
  color: #6de165
}






</style>