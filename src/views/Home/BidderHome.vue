<template>
<div>
    <Header
        urlForTendersCount="/tenders/count"
        urlForOffersCount="/offers/me/count"
        @tendersOpen="tendersShown = true;tenderDesShown=false;this.offersShown=false;offerCreateShow=false;"
        @offersOpen="tendersShown = false;tenderDesShown=false;this.offersShown=true;offerCreateShow=false;">
    </Header>
  <TenderTableBidder
      @TenderDesOpen="openTenderDescription"
      v-if="tendersShown">
  </TenderTableBidder>
  <TenderDescription
      :isBidder="true"
      @createOfferOpen="openOfferCreate"
      @backAction="tendersShown = true;tenderDesShown=false;offerCreateShow=false;this.offersShown=false;"
      :isTender="true"
      :tender="tender"
      v-if="tenderDesShown">
  </TenderDescription>
  <OfferTable
      :is-bidder="true"
      :baseUrl="'/offers/me'"
      v-if="offersShown">
  </OfferTable>
  <CreateOffer v-if="offerCreateShow"
               @created="tendersShown = false;tenderDesShown=false;this.offersShown=true;offerCreateShow=false;"
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


export default {

  data() {
    return {
      tender:null,
      tendersShown: true,
      offersShown: false,
      tenderDesShown: false,
      offerCreateShow: false,
    }
  },
  methods: {
    openTenderDescription(tender){
      this.tender=tender;
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
    }
  }
}
</script>

<style scoped>

</style>