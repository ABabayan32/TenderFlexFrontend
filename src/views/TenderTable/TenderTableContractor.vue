<template>

  <div class="table-header-container"></div>
  <div class="tender-table">
    <div class="table-title">
      <h1> My Tenders</h1>
    </div>

    <table style= "width: 150%;" v-if="tenders.length !==0">
      <thead>
      <tr>

        <th class="uppercase" >
          field <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th class="uppercase">
          official name <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th class="uppercase">
          status <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th class="uppercase">
          deadline <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th class="uppercase">
          offers <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
      </tr>
      </thead>
      <tbody>

      <tr  v-for="tender in tenders" :key='tender'>
        <td class="column-medium" style="color: #068ac2"><a @click="onTenderFieldClick(tender)" type="button" >
          {{tender['cpv'] ? tender['cpv']['name']+'/'+tender['cpv']['field'] : ''}}</a></td>
        <td class="column-medium">{{tender['name']}}</td>
        <td class="column-medium" style="color: #6de165">{{tender['tenderStatus'] ? tender['tenderStatus'].name : ''}}</td>
        <td class="column-small">{{tender['deadForSinging'] ? formatDate(tender['deadForSinging']) : ""}}</td>
        <td class="column-small" style="width: 10%"><button @click="onTenderOffersClick(tender)"
                                                                          class="offer-button rcorners1" type="button" >
          {{responseDate(tender, offers)}}</button></td>
      </tr>
      </tbody>
    </table>
    <div>
      <v-pagination

          :disabled = "tenders.length === 0"
          v-model="page"
          :length="pageCount"
          :showFirstLastPage="true"
          firstIcon="fa fa-angle-double-left"
          lastIcon="fa fa-angle-double-right"
          next-icon="fa fa-angle-right"
          prev-icon="fa fa-angle-left"
          :size="count"
          @update:modelValue="pageChange()"/>
    </div>
    <div class="blank-table" v-if="tenders.length ===0">
      <div class="no-tenders">There are no Tenders</div>
    </div>
  </div>

</template>

<script>
import {formatDate, getAuthenticatedHeaders, logout} from "@/utils";
import {API_BASE_URL} from "@/const_config.js";


export default {
  emits: ['offersForTender','desOfTender'],
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


    responseDate(tender, offers) {
      let id = Number(tender['id']);
      return offers.filter(offer => +offer['tenderId'] === id).length;
    },
    onTenderOffersClick(tender) {
      this.$emit("offersForTender", tender);
    },
    onTenderFieldClick(tender) {
      this.$emit("desOfTender", tender);
    },
    formatDate(date){
      return formatDate(date);
    }

  }
}
</script>

<style scoped>
.
.uppercase{
  text-transform: uppercase;

}
.column-medium {
  width:30%;
  text-align: center;
  color: #42474d;
}
.column-small {
  width:20%;
  text-align: center;
  color: #42474d;
}

.tender-table{
  margin-top: -6.567rem;
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