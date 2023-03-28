
<template>
  <div>
    <Header
        :tendersCount="tendersCount"
        :offersCount="offersCount"
        @tendersOpen="tenders"
        @offersOpen="offers"
        @newTenderOpen="newTender">
    </Header>

    <TenderTable
        @offersForTender = "offersByTender"
        @desOfTender="tenderDescriptionOpen"
        v-if="tendersShown">
    </TenderTable>
    <OfferTable
        v-if="offersShown"
        :baseUrl="'/tenders/me/offers'">
    </OfferTable>
    <CreateTender @created="tenders"
                  v-if="newTenderShow">
    </CreateTender>
    <TenderDescription
        @offerDescriptionOpen="openOfferDescription"
        :isBidder="false"
        @backAction="tenders"
        :isTender="!offersForTenderShown"
        :tender="tender"
        v-if="tenderDesShown">
    </TenderDescription>
    <OfferDescription
        @offerStatusChanged="offerStatusChanged"
        v-if="offerDesShown"
        :tender="tender"
        :offerExternal="offer">
    </OfferDescription>
  </div>
</template>

<script setup>
import Header from "@/views/Header/Header.vue";
import TenderTable from "@/views/TenderTable/TenderTableContractor.vue";
import OfferTable from "@/views/OfferTable/OfferTable.vue";
import CreateTender from "@/views/CreateTender/CreateTender.vue";
import TenderDescription from "@/views/TenderDescription/TenderDescription.vue";
import OfferDescription from "@/views/OfferDescription/OfferDescription.vue";


</script>
<script>
import {API_BASE_URL} from "@/const_config";
import {getAuthenticatedHeaders, logout} from "@/utils";

export default {
  data() {
    return {
      tendersShown: true,
      offersShown: false,
      offersForTenderShown: false,
      newTenderShow: false,
      tender: null,
      offer:null,
      tenderDesShown:false,
      offerDesShown:false,
      tendersCount: 0,
      offersCount: 0
    }
  },
  async beforeMount() {
    await this.fetchTenderCount();
    await this.fetchOfferCount();
  },
  methods: {
    async offersByTender(tender) {
      await this.fetchTenderCount();
      await this.fetchOfferCount();
      this.tender = tender;
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = true;
      this.tenderDesShown = true;
      this.newTenderShow = false;
      this.offerDesShown=false;
    },
    async tenders(){
      await this.fetchTenderCount();
      await this.fetchOfferCount();
      this.tendersShown = true;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    async tenderDescriptionOpen(tender) {
      await this.fetchTenderCount();
      await this.fetchOfferCount();
      this.tender = tender;
      this.tendersShown = false;
      this.tenderDesShown = true;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.offerDesShown=false;
    },
    async offers(){
      await this.fetchTenderCount();
      await this.fetchOfferCount();
      this.tendersShown = false;
      this.offersShown = true;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    async offerStatusChanged(){
      await this.fetchTenderCount();
      await this.fetchOfferCount();
      this.tendersShown = false;
      this.offersShown = true;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    async newTender(){
      await this.fetchTenderCount();
      await this.fetchOfferCount();
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = true;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    async openOfferDescription(data){
      await this.fetchTenderCount();
      await this.fetchOfferCount();
      this.tender=data.tender;
      this.offer=data.offer;
      this.offerDesShown=true;
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
    },
    async fetchOfferCount(){
      this.offersCount = await fetch(API_BASE_URL + '/tenders/me/offers/count',{
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
      this.tendersCount = await fetch(API_BASE_URL + '/tenders/me/count',{
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


<style>
.background-gray{
  background-color: #e5e0e0;
}
</style>