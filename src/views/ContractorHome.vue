

<template>
  <div>
    <Header @tendersOpen="tendersShown = true;"
            @offersOpen="tendersShown = false;"
            @newTenderOpen=" this.tendersShown = false;"></Header>


  </div>
</template>
<script setup>
import Header from "@/views/Header.vue";

</script>

<script>
export default {
  data() {
    return {
      tendersShown: true,
    }
  },
  methods: {

  }
}
</script>
 <style>
 @import "@/styles/contractor.css";
 </style>

