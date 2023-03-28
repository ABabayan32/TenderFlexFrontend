
<template>
  <div>
    <Header
        urlForTendersCount="/tenders/me/count"
        urlForOffersCount="/tenders/me/offers/count"
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
      offerDesShown:false
    }
  },
  methods: {
    offersByTender(tender) {
      this.tender = tender;
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = true;
      this.tenderDesShown = true;
      this.newTenderShow = false;
      this.offerDesShown=false;
    },
    tenders(){
      this.tendersShown = true;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    tenderDescriptionOpen(tender) {
      this.tender = tender;
      this.tendersShown = false;
      this.tenderDesShown = true;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.offerDesShown=false;
    },
    offers(){
      this.tendersShown = false;
      this.offersShown = true;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    offerStatusChanged(){
      this.tendersShown = false;
      this.offersShown = true;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    newTender(){
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = true;
      this.tenderDesShown=false;
      this.offerDesShown=false;
    },
    openOfferDescription(data){
      this.tender=data.tender;
      this.offer=data.offer;
      this.offerDesShown=true;
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
      this.tenderDesShown=false;
    }
  }
}
</script>


<style>
.background-gray{
  background-color: #e5e0e0;
}
</style>