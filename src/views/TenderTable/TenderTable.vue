<template>
  <div class="table-header-container"></div>
  <div class="tender-table">
    <div class="table-title">
      <h1> My Tenders</h1>
    </div>
    <table style="width: 100%;" v-if="tenders.length !==0">
      <thead>
      <tr>

        <th>
          Field <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Official Name <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Status <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Deadline <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Offers <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
      </tr>
      </thead>
      <tbody>

      <tr  v-for="tender in tenders" :key='tender'>
        <td style="width: 30%;text-align: center; color: black">{{tender['awardFileKey']}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{tender['name']}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{tender['tenderStatus'] ? tender['tenderStatus'].name : ''}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{tender['deadForSinging'] ? formatDate(tender['deadForSinging']) : ''}}</td>
        <td style="width: 10%;text-align: center; color: #42474d"><button @click="onTenderOffersClick(tender)"
                                                                          class="offer-button rcorners1" type="button" >
          {{responseDate(tender, offers)}}</button></td>
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
    ></v-pagination>
    <div class="blank-table" v-if="tenders.length ===0">
      <div class="no-tenders">There are no Tenders</div>
    </div>
  </div>

</template>

<script>
import {getAuthenticatedHeaders, logout} from "@/common_functions";
import {API_BASE_URL} from "@/const_config.js";
import {computed} from "vue";


export default {
  emits: ['offersForTender'],
  data() {
    return {
      count: 5,
      page: 1,
      tenderCount: 0,
      offers: [],
      tenders: [],
    }
  },
  computed: {
    pageCount () {
      return (this.tenderCount%this.count !== 0) ? this.tenderCount/this.count+1 : this.tenderCount/this.count}
  },
  async beforeMount() {
    try{
      this.tenders = await fetch(API_BASE_URL+ '/tenders/me?page=' + (this.page-1)+'&count='+this.count, {
      method: 'GET',
      node: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: getAuthenticatedHeaders(),
    }).then((response) => {
          if (response.ok) {
            return response.json()
          } else if(response.status === 401 || response.status === 403){
            logout();

          }
        }
    )
        .then(response => {
          return response;
        });


    this.tenderCount = await fetch(API_BASE_URL+'/tenders/me/count', {
      method: 'GET',
          node: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: getAuthenticatedHeaders(),
    }).then((response) => {
          if (response.ok) {
            return response.json()
          } else if(response.status === 401 || response.status === 403){
            logout();
          }
        }
    )
        .then(response => {
          return response;
        });

    this.offers = await fetch(API_BASE_URL+'/tenders/me/offers?page=0&count=100', {
      method: 'GET',
      node: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: getAuthenticatedHeaders(),
    }).then((response) => {
          if (response.ok) {
            return response.json()
          } else if(response.status === 401 || response.status === 403){
            logout();
          }
        }
    )
        .then(response => {
          return response;
        }); } catch (error){
      console.error(error);
    }
  },

  methods: {

    async pageChange(){
      this.tenders = await fetch(API_BASE_URL+'/tenders/me?page=' + (this.page-1)+'&count='+this.count, {
        method: 'GET',
        node: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: getAuthenticatedHeaders(),
      }).then((response) => {
            if (response.ok) {
              return response.json()
            } else if(response.status === 401 || response.status === 403){
              logout();
            }
          }
      )
          .then(response => {
            return response;
          });

      this.offers = await fetch(API_BASE_URL+'/tenders/me/offers?page=0&count=100', {
        method: 'GET',
        node: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: getAuthenticatedHeaders(),
      }).then((response) => {
            if (response.ok) {
              return response.json()
            } else if(response.status === 401 || response.status === 403){
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
          d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    },
    responseDate(tender, offers) {
      let id = Number(tender['id']);
      return offers.filter(offer => +offer['tenderId'] === id).length;
    },
    onTenderOffersClick(tender) {
      this.$emit("offersForTender", tender);
    },

  }
}
</script>

<style scoped>
.tender-table{
  margin-top: -9.6rem;
  padding-left: 20%;
  width: 60%;
}

.table-header-container {
  height: 8.6875rem;
  width: 101.2%;
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
  width: 100%;
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

.offer-button {
  background-color: #e0e8ec;
  border: none;
  color: #2f3234;
  padding: 0.9375rem 2rem;
  text-align: center;
  text-decoration: none;
  display: flex;
  font-size: 1rem;
  margin: 0.25rem 0.125rem;
  cursor: pointer;
}


</style>