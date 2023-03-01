

<script>
import {getAuthenticatedHeaders,logout} from "@/static_functions";
export default {
  emits: ['tendersOpen', 'offersOpen', 'newTenderOpen'],
  data() {
    return {
      page: 0,
      tenderCount: 0,
      offerCount: 0,
    }
  },
  async beforeCreate() {
    this.tenderCount = await fetch('http://localhost:8080/tenders/me/count',{
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
    this.offerCount = await fetch('http://localhost:8080/tenders/me/offers/count',{
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </header>
  <div class="header">
    <div class="iconContainer">
      <div class='tenderFlexIcon headerIcon'></div>
    </div>
    <div class="tendersButtonContainer">
      <button @click="onTendersClick" class="tendersButton"><i style="color:white;" class="fa fa-heartbeat"></i> Tenders <span class="tenderCount">{{tenderCount}}</span></button> </div>
    <div class="offersButtonContainer">
      <button @click="onOffersClick" class="offersButton"><i class="fa fa-commenting-o"></i> Offers<span class="offerCount">{{offerCount}}</span></button> </div>
    <div class="exitButtonContainer">
      <button @click="onLogout" class="exitButton"><i style="color:white;" class="fa fa-sign-out"></i></button>
    </div>
    <div @click="onCreateNewTender" class="createButtonContainer">
      <button class="createButton"><i style="color:white; font-size: 13px; margin-right: 3px" class="fa fa-plus"></i>Create new tender</button>
    </div>
  </div>




</template>

<style>
@import "@/styles/header.css";
@import "@/styles/main.css";
</style>


