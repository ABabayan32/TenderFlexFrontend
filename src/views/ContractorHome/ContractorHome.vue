
<template >
  <div>
    <Header @tendersOpen="tendersShown = true; offersShown = false;offersForTenderShown = false;newTenderShow = false; "
            @offersOpen="tendersShown = false; offersShown = true; this.offersForTenderShown = false;this.newTenderShow = false;"
            @newTenderOpen=" this.tendersShown = false; this.offersShown = false; this.offersForTenderShown = false; this.newTenderShow = true;"></Header>

    <TenderTable @offersForTender = "offersByTender" v-if="tendersShown"></TenderTable>
    <OfferTable v-if="offersShown"></OfferTable>

  </div>
</template>

<script setup>
import Header from "@/views/Header/Header.vue";
import TenderTable from "@/views/TenderTable/TenderTable.vue";
import OfferTable from "@/views/OfferTable/OfferTable.vue";
import CreateTender from "@/views/CreateTender/CreateTender.vue";


</script>
<script>
export default {
  data() {
    return {
      tendersShown: true,
      offersShown: false,
      offersForTenderShown: false,
      newTenderShow: false,
      tender: null
    }
  },
  methods: {
    offersByTender(tender){
      this.tender = tender;
      this.tendersShown = false; this.offersShown = false; this.offersForTenderShown = true; this.newTenderShow = false;
    }

  }
}
</script>


<style>
.background-gray{
  background-color: #e5e0e0;
}
</style>