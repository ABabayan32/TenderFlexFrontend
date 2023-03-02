

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
    this.tenderCount = await fetch(API_BASE_URL + '/tenders/me/count',{
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
        });
  },
  methods: {

    onLogout () {
      logout();
    } ,

    onTendersClick() {
      this.$emit("tendersOpen", true);
    },
    onOffersClick() {
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
    <div class="iconContainer">
      <div class='tenderFlexIcon headerIcon'></div>
    </div>

    <div class="tendersButtonContainer">
      <button @click="onTendersClick" class="tendersButton"><button class="tendersButton"></button>
        <v-icon icon="fa fa-heartbeat" />
        Tenders <span class="tenderCount">{{tenderCount}}</span></button> </div>

    <div class="offersButtonContainer">
      <button @click="onOffersClick" class="offersButton"><button class="offersButton"></button>
        <v-icon icon="fa fa-heartbeat" />
        Offers<span class="offerCount">{{offerCount}}</span></button> </div>


    <div class="exitButtonContainer">
      <button @click="onLogout" class="exitButton"><button class="offersButton"></button>
        <v-icon icon="fa fa-sign-out" /></button>
    </div>
    <div @click="onCreateNewTender" class="createButtonContainer">
      <button class="createButton"><v-icon icon="fa fa-plus" />Create new tender</button>
    </div>
  </div>




</template>

<style>
@import "@/views/Header/header.css";
@import "@/styles/main.css";
</style>


