<template>
<div>
    <Header
        :tendersCount="tendersCount"
        :offersCount="offersCount"
        @tendersOpen="openTenders"
        @offersOpen="openOffers">
    </Header>
  <TenderTableBidder
      @TenderDesOpen="openTenderDescription"
      v-if="tendersShown">
  </TenderTableBidder>
  <TenderDescription
      :isBidder="true"
      @createOfferOpen="openOfferCreate"
      @backAction="openTenders"
      :isTender="!!tender"
      :tenderId="tenderId"
      :tender="tender"
      v-if="tenderDesShown">
  </TenderDescription>
  <OfferTable
      @tenderDescriptionOpen="openTenderDescriptionFromOfferTable"
      :is-bidder="true"
      :baseUrl="'/offers/me'"
      v-if="offersShown">
  </OfferTable>
  <CreateOffer v-if="offerCreateShow"
               @created="openOffers"
               :tender="tender">

  </CreateOffer>
 </div>
</template>

<script setup>

import Header from "@/views/Header/Header.vue";
import TenderTableBidder from "@/views/TenderTable/TenderTableBidder.vue";
import TenderDescription from "@/views/TenderDescription/TenderDescription.vue";
import OfferTable from "@/views/OfferTable/OfferTable.vue";
import CreateOffer from "@/views/CreateOffer/CreateOffer.vue";

</script>
<script>


import {API_BASE_URL} from "@/const_config";
import {getAuthenticatedHeaders, logout} from "@/utils";

export default {

  data() {
    return {
      tenderId: 0,
      tender:null,
      tendersShown: true,
      offersShown: false,
      tenderDesShown: false,
      offerCreateShow: false,
      tendersCount: 0,
      offersCount: 0
    }
  },
  async beforeMount() {
    await this.fetchTenderCount();
    await this.fetchOfferCount();
  },
  methods: {
    openTenders(){
      this.tendersShown = true;
      this.tenderDesShown=false;
      this.offersShown=false;
      this.offerCreateShow=false;
    },
    openOffers(){
      this.tendersShown = false;
      this.tenderDesShown=false;
      this.offersShown=true;
      this.offerCreateShow=false;
    },
    openTenderDescription(tender){
      this.tender=tender;
      this.tendersShown=false;
      this.tenderDesShown=true;
      this.offersShown=false;
      this.offerCreateShow=false;
    },
    openTenderDescriptionFromOfferTable(offer){
      this.tender=null;
      this.tenderId = offer.tenderId;
      this.tendersShown=false;
      this.tenderDesShown=true;
      this.offersShown=false;
      this.offerCreateShow=false;
    },
    openOfferCreate(tender){
      this.tender=tender;
      this.tendersShown=false;
      this.tenderDesShown=false;
      this.offersShown=false;
      this.offerCreateShow=true;
    },
    async fetchOfferCount(){
      this.offersCount = await fetch(API_BASE_URL + '/offers/me/count',{
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
    async fetchTenderCount() {
      this.tendersCount = await fetch(API_BASE_URL + '/tenders/count',{
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
    }
  }
}
</script>

<style scoped>

</style>