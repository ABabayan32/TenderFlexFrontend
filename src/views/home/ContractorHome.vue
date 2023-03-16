
<template >
  <div>
    <Header urlForTendersCount="/tenders/me/count" urlForOffersCount="/tenders/me/offers/count"
        @tendersOpen="tendersShown = true; offersShown = false;offersForTenderShown = false;newTenderShow = false; "
            @offersOpen="tendersShown = false; offersShown = true; this.offersForTenderShown = false;this.newTenderShow = false;this.tenderDesShown=false;"
            @newTenderOpen=" this.tendersShown = false; this.offersShown = false; this.offersForTenderShown = false; this.newTenderShow = true;this.tenderDesShown=false;"></Header>

    <TenderTable @offersForTender = "offersByTender" @desOfTender="tenderDescriptionOpen" v-if="tendersShown"></TenderTable>
    <OfferTable v-if="offersShown"></OfferTable>
    <CreateTender @created=" this.tendersShown = true; this.offersShown = false; this.offersForTenderShown = false; this.newTenderShow = false;this.tenderDesShown=false;"
                  v-if="newTenderShow"></CreateTender>
    <TenderDescription :tender="tender" v-if="tenderDesShown">
    </TenderDescription>

  </div>
</template>

<script setup>
import Header from "@/views/Header/Header.vue";
import TenderTable from "@/views/TenderTable/TenderTableContractor.vue";
import OfferTable from "@/views/OfferTable/OfferTable.vue";
import CreateTender from "@/views/CreateTender/CreateTender.vue";
import TenderDescription from "@/views/TenderDescription.vue";


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
      tenderDesShown:false,
    }
  },
  methods: {
    offersByTender(tender) {
      this.tender = tender;
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = true;
      this.newTenderShow = false;
    },
    tenderDescriptionOpen(tender) {
      this.tender = tender;
      this.tendersShown = false;
      this.tenderDesShown = true;
      this.tendersShown = false;
      this.offersShown = false;
      this.offersForTenderShown = false;
      this.newTenderShow = false;
    },
  }
}
</script>


<style>
.background-gray{
  background-color: #e5e0e0;
}
</style>