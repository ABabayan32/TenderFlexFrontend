<template>
<div>
    <Header urlForTendersCount="/tenders/count" urlForOffersCount="/offers/me/count"
     @tendersOpen="tendersShown = true;tenderDesShown=false" >

    </Header>
  <TenderTableBidder @TenderDesOpen="openTenderDescription" v-if="tendersShown"></TenderTableBidder>
  <TenderDescription :tender="tender" v-if="tenderDesShown">
  </TenderDescription>

 </div>
</template>

<script setup>

import Header from "@/views/Header/Header.vue";
import TenderTableBidder from "@/views/TenderTable/TenderTableBidder.vue";
import TenderDescription from "@/views/TenderDescription.vue";

</script>
<script>


export default {

  data() {
    return {
      tender:null,
      tendersShown: true,
      tenderDesShown: false,
    }
  },
  methods: {
    openTenderDescription(tender){
      this.tender=tender;
      this.tendersShown=false;this.tenderDesShown=true;
    }
  }
}
</script>

<style scoped>

</style>