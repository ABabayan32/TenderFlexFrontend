<template>
  <div class="tableHeaderContainer"></div>
  <div class="tenderTable">
    <div class="tableTitle">
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
                                                                          class="offerButton rcorners1" type="button" >
          {{responseDate(tender, offers)}}</button></td>
      </tr>
      </tbody>
    </table>
    <v-pagination
        :disabled = "tenders.length === 0"
        v-model="page"
        :length="(tenderCount%count !== 0) ? tenderCount/count+1 : tenderCount/count"
        :showFirstLastPage="true"
        :size="count"
        @update:modelValue="pageChange()"
    ></v-pagination>
    <div class="blankT
    able" v-if="tenders.length ===0">
      <div class="noTenders">There are no Tenders</div>
    </div>
  </div>

</template>

<script>
import {getAuthenticatedHeaders, logout} from "@/common_functions";
import {API_BASE_URL} from "@/const_config.js";

export default {
  emits: ['offersForTender'],
  data() {
    return {
      count: 5,
      page: 1,
      tenderCount: 0,
      offers: [],
      tenders: []
    }
  },
  async beforeMount() {
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
        });
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
      let id = +tender['id'];
      return offers.filter(offer => +offer['tenderId'] === id).length;
    },
    onTenderOffersClick(tender) {
      this.$emit("offersForTender", tender);
    },

  }
}
</script>

<style scoped>
@import "@/views/TenderTable/tenderTable.css";

</style>