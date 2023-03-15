

<script>
import {getAuthenticatedHeaders,logout} from "@/common_functions";
import {API_BASE_URL} from "@/const_config.js";
export default {
  emits: ['tendersOpen', 'offersOpen', 'newTenderOpen'],
  data() {
    return {
      page: 0,
      tenderCount: 0,
      offerCount: 0,
    }
  },
  async beforeMount() {
    try { this.tenderCount = await fetch(API_BASE_URL + '/tenders/me/count',{
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
                logout()
                return null;
              }
            })
        .then(response=>
    {
      return response;
    });
    this.offerCount = await fetch(API_BASE_URL + '/tenders/me/offers/count',{
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
        .then(response=>
        {
          return response;
        });} catch (error) {
      console.error(error);
    }
  },
  methods: {

    onLogout () {
      logout();
    } ,

    notifyTendersOpen() {
      this.$emit("tendersOpen", true);
    },
    notifyOffersOpen() {
      this.$emit("offersOpen", true);
    },
    onCreateNewTender() {
      this.$emit("newTenderOpen", true);
    }
  }
}
 </script>

<template>
  <header>
  </header>
  <div class="header">
    <div class="icon-container">
      <div class='tender-flex-icon header-icon'></div>
    </div>

    <div class="tenders-button-container">
      <button @click="notifyTendersOpen" class="tenders-button"><button class="tenders-button"></button>
        <v-icon icon="fa fa-heartbeat" />
        Tenders <span class="tender-count">{{tenderCount}}</span></button> </div>

    <div class="offers-button-container">
      <button @click="notifyOffersOpen" class="offers-button"><button class="offers-button"></button>
        <v-icon icon="fa fa-heartbeat" />
        Offers<span class="offer-count">{{offerCount}}</span></button> </div>


    <div class="exit-button-container">
      <button @click="onLogout" class="exit-button"><button class="offers-button"></button>
        <v-icon icon="fa fa-sign-out" /></button>
    </div>
    <div @click="onCreateNewTender" class="create-button-container">
      <button class="create-button"><v-icon icon="fa fa-plus" />Create new tender</button>
    </div>
  </div>




</template>

<style>

.tender-flex-icon {
  background: url('@/assets/icons/logo.png');
  display: flex;
  background-size: 18.75rem;
  width: 18.75rem;
  height: 3.6875rem;
  border:  #ffffff;
}
.header {
  padding: 0.625rem 1rem;
  background-color: #27aae1;
  color: #f1f1f1;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
}

.header-icon {
  display: flex;
  border-radius: 0.9375rem;
  border: 0.0625rem solid;
  background-color: #ffffff;
}

.content {
  margin-top: 6.25rem;
}

.icon-container {
  display: flex;
  float: left;
}

.offers-button-container {
  background-color: #27aae1;
  display: flex;
  float: left;
  width: 12.5rem;
  height: 3.6875rem;
  margin-left: 0.625rem;
  margin-top: -0.625rem;
}

.offers-button {
  text-align: center;
  text-decoration: none;
}

.offers-button:hover {
  background-color: #068ac2;
  border-radius: 1.25rem;
  border: 0.0625rem solid #068ac2;
}

.tenders-button-container {
  background-color: #27aae1;
  display: flex;
  float: left;
  width: 15.5rem;
  height: 3.8rem;
  margin-top: -0.625rem;
  margin-left: 6.25rem;
  margin-right: 6.25rem;
}

.tenders-button {

  text-align: center;
  text-decoration: none;
}

.tenders-button:hover {
  background-color: #068ac2;
  border-radius: 1.25rem;
  border: 0.625rem solid #068ac2;
}

.create-button-container {
  background-color: #27aae1;
  display: flex;
  width: 12.5rem;
  height: 3.6875rem;
  margin-top: -0.625rem;
  float: right;
  margin-right: 6.25rem;
}

.create-button {
  display: flex;
  background-color: #0a50ad;
  font-size: 1.25rem;
  cursor: pointer;
  width: 12.5rem;
  height: 3.75rem;
  margin-top: 1rem;
  margin-left: 0.625rem;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #0a50ad;
}

.create-button:hover {
  background-color: #073470;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #073470;
}

.exit-button-container {
  background-color: #27aae1;
  display: flex;
  float: right;
  width: 3.6875rem;
  height: 3.6875rem;
  margin-right: 0.9375rem;
  margin-top: -0.625rem;
}

.exit-button {
  display: flex;
  background-color: #27aae1;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 1.25rem;
  margin-left: 0.625rem;
}

.exit-button:hover {
  background-color: #068ac2;
  border-radius: 0.9375rem;
  border: 1px solid #068ac2;
}

.tender-count {
  margin-left: 0.3125rem;
  display: flex;
  background-color: #51da47;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #13c206;
  width: 1.5rem;
}

.offer-count {
  margin-left: 0.625rem;
  display: flex;
  background-color: #51da47;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #13c206;
}
</style>


