<template>
  <div class="offer-header-container"></div>
  <div class="offer-table">
    <div class="table-title">
      <h1> My Offers</h1>
    </div>
    <table style="width: 100%;" v-if="offers.length !==0 ">
      <thead>
      <tr>
        <th>
          Official Name <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Field <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Price <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Sent Date <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
        <th>
          Status <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="offer in offers" :key='offer'>
        <td style="width: 30%;text-align: center; color: black">{{offer['officialName']}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">Field</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{offer['bidPrice']}}</td>
        <td style="width: 20%;text-align: center; color: #42474d">{{offer['offerDate'] ? formatDate(offer['offerDate']) : ''}}</td>
        <td style="width: 10%;text-align: center; color: #42474d">{{offer['offerStatus'] ? offer['offerStatus'].nameCt : ''}}</td>
      </tr>
      </tbody>
    </table>
    <v-pagination
        :disabled = "offers.length === 0"
        v-model="page"
        :length="pageCount"
        :showFirstLastPage="true"
        :size="countPerPage"
        @update:modelValue="pageChange()"
    ></v-pagination>


    <div class="blank-table" v-if="offers.length === 0">
      <div class="no-offers">There are no sent offers</div>
    </div>
  </div>

</template>

<script>
import {getAuthenticatedHeaders,logout} from "@/common_functions";
import {API_BASE_URL} from "@/const_config.js";
export default {
    props: ['tender'],
    data() {
      return {
        countPerPage: 5,
        offersCount: 0,
        offers: [],
        page: 1
      }
    },
     computed: {
        pageCount () {
          return (this.offersCount%this.countPerPage !== 0) ? this.offersCount/this.countPerPage+1 : this.offersCount/this.countPerPage}
      },
    async beforeMount() {
      if(this.tender){
        this.offers = await fetch (API_BASE_URL+ '/tenders/'+this.tender.id+'/offers', {
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
      } else {
        this.offers = await fetch(API_BASE_URL +'/tenders/me/offers?page='+(this.page-1)+'&count='+this.countPerPage,
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
      }
      this.offersCount = await fetch (API_BASE_URL +'/tenders/me/offers/count', {
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
        this.offers = await fetch(API_BASE_URL+'/tenders/offers/me?page=' + (this.page-1)+'&count='+this.countPerPage, {
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
        return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

      }
    }

  }
</script>


<style >
.offer-table{
  margin-top: -9.6rem;
  padding-left: 20%;
  width: 60%;
}

.offer-header-container {
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





</style>