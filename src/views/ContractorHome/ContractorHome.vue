

<template >
  <div>
    <Header @tendersOpen="tendersShown = true;"
            @offersOpen="tendersShown = false;"
            @newTenderOpen=" this.tendersShown = false;"></Header>

    <TenderTable v-if="tendersShown"></TenderTable>

  </div>
</template>

<script setup>
import Header from "@/views/Header/Header.vue";
import TenderTable from "@/views/TenderTable/TenderTable.vue";
</script>
<script>
export default {
  data() {
    return {
      tendersShown: true
    }
  },
  methods: {
  }
}
</script>