<template>
  <div v-if="!tender" class="offer-header-container"></div>

  <div :class="{ 'offer-table': !tender }" class="offer-table-with">
    <div v-if="!tender" class="table-title">
      <h1> Offers</h1>
    </div>
    <table style="width: 150%;" v-if="offers.length !==0 ">
      <thead>
      <tr>
        <th>
          OFFICIAL NAME <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          PRICE <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          COUNTRY <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          RECEIVED DATE <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          STATUS <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="offer in offers" :key='offer'>
        <td v-if="!!tender" style="width: 20%;text-align: center;color: #3895bd">
          <a @click="openOfferDescription(offer)" type="button" >{{offer['name']}}</a></td>
        <td v-if="!tender" style="width: 20%;text-align: center; color: #42474d">{{offer['name']}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{getCurrencyById(offer['currencyId'])+ " " + offer['bidPrice']}}</td>
        <td style="width: 15%;text-align: center; color: #42474d">{{getCountryById(offer['countryId'])}}</td>
        <td style="width: 15%;text-align: center; color: #42474d">{{offer['offerDate'] ? formatDate(offer['offerDate']) : ''}}</td>
        <td style="width: 30%;text-align: center; color: #42474d"
            :class="{ green: offer['offerStatus'].id === 3, red: offer['offerStatus'].id === 5,
             grey: offer['offerStatus'].id === 4, blue: offer['offerStatus'].id === 2}">{{
            offer['offerStatus'] ? (isBidder ? offer['offerStatus'].nameBr : offer['offerStatus'].nameCt) : ''}}</td>
      </tr>
      </tbody>
    </table>
    <v-pagination v-if="offers.length !== 0"
        v-model="page"
        :length="pageCount"
        :showFirstLastPage="true"
        :size="countPerPage"
        @update:modelValue="pageChange()"
    ></v-pagination>

  </div>
  <div class="blank-table" :class="{ 'blank-table-width': !tender }"  v-if="offers.length === 0">
    <div class="no-offers">There are no sent offers</div>
  </div>

</template>

<script>
import {formatDate, getAuthenticatedHeaders, logout} from "@/utils";
import {API_BASE_URL} from "@/const_config.js";
import router from "@/router";
import {el} from "vuetify/locale";
export default {
  emits: ['offerDescriptionOpen'],
    props: ['tender', 'baseUrl', 'isBidder'],
    data() {
      return {
        countPerPage: 5,
        offersCount: 0,
        offers: [],
        countries:[],
        currencies:[],
        page: 1
      }
    },
     computed: {
        pageCount () {
          return (this.offersCount%this.countPerPage !== 0) ? this.offersCount/this.countPerPage+1 : this.offersCount/this.countPerPage}
      },
    async beforeMount() {
      let url;
      if(this.tender){
        url = API_BASE_URL+ '/tenders/'+this.tender.id+'/offers';
      } else {
        url = API_BASE_URL + this.baseUrl;
      }
        this.offers = await fetch(url + '?page='+(this.page-1)+'&count='+this.countPerPage,
            {
              method: 'GET',
              node: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: getAuthenticatedHeaders(),
            })
            .then((response) => {
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
      this.currencies = await fetch(API_BASE_URL+'/currencies',{
        headers: getAuthenticatedHeaders()
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
      this.countries = await fetch(API_BASE_URL+'/countries', {
        headers: getAuthenticatedHeaders()
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
      this.offersCount = await fetch (url + '/count', {
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
      openOfferDescription(offer){
        this.$emit("offerDescriptionOpen", offer);
      },
      async pageChange(){
        let url;
        if(!!this.tender){
          url = API_BASE_URL+ '/tenders/'+this.tender.id+'/offers'
        } else {
          url = API_BASE_URL+ this.baseUrl
        }
        this.offers = await fetch(url + '?page=' + (this.page-1)+'&count='+this.countPerPage, {
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
      getCountryById(id){
        let country;
        if(id) {
          country = this.countries.find(country => country.countryId === id);
        }
        return !!country ? country.name : "";
      },
      getCurrencyById(id){
        let currency
        if(id) {
          currency = this.currencies.find(currency => currency.currencyId === id);
        }
        return !!currency ? currency.name : "";
      },
      formatDate(miliseconds) {
        let d = new Date(miliseconds);
        return formatDate(d);

      }
    }

  }
</script>


<style >
.offer-table{
  margin-top: -6.567rem;
  padding-left: 20%;
}

.offer-table-with {
  width: 60%;
}

.offer-header-container {
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

.blank-table-width {
  margin-left: 20%;
  width: 60%;
}

.no-offers {
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
.green {
  color: #13c206 !important;
}
.blue {
  color: #27aae1 !important;
}
.red {
  color: firebrick !important;
}
.grey {
  color: #646b70 !important;
}





</style>