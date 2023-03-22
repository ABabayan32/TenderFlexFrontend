<template>
  <div class="form-header-container">

  </div>
  <div  style="margin-top: -155px;width: 60%;
    margin-left: 20%;">
    <a class="description-back" target="_blank" type="button" @click="back()">{{"< back"}}</a>
    <div class="description-main-title">
      <h1>{{!!this.tender.cpv ? this.tender.cpv.field : ""}} ({{!!this.tender.cpv ? this.tender.cpv.name : ""}}) </h1>
    </div >
    <div class="description-tabs">
      <div v-if="!isTender">
        <a class="description-tab" type="button" @click="isTender=true">Tender Description</a>
        <div class="description-selected-tab">{{isBidder ? 'My Offer' : 'Offers'}}</div>
      </div>
      <div v-if="isTender">
        <div class="description-selected-tab">Tender Description</div>
        <a class="description-tab" type="button" @click="isTender=false">{{isBidder ? 'My Offer' : 'Offers'}}</a>
      </div>
    </div>
    <div v-if="!isTender && !isBidder">
      <OfferTable @offerDescriptionOpen="openOfferDescription" :baseUrl="'/tenders/me/offers'" :tender="tender"></OfferTable>
    </div>
    <div v-if="!isTender && isBidder">
      <OfferDescription @offerStatusChanged="back" @createOfferOpen="createOffer" :tender="tender"></OfferDescription>
    </div>
    <div v-if="isTender" class="description-form">
      <div class="description-main-row">
        <div class="description-title">
          <h2 class="description-h2">Contractor</h2>
        </div>
          <div class="description-row">
            <div class="description-container">
              <label class="description-label">  Official Name: </label>
              <div class="description-value"> {{this.tender.name}} </div>
            </div>
            <div class="description-container">
              <label class="description-label"> Country: </label>
              <div class="description-value"> {{getCountryById(this.tender.countryId)}} </div>
            </div>
          </div>
        <div class="description-row">
          <div class="description-container">
            <label class="description-label">National Registration Number: </label>
            <div class="description-value" > {{this.tender.nationalRegNumber}} </div>
          </div>
          <div class="description-container">
            <label class="description-label">City/Town: </label>
            <div class="description-value" > {{this.tender.townCity}} </div>
          </div>
        </div>
      </div>
      <div class="description-title">
        <h2 class="description-h2">Contact person</h2>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Name: </label>
          <div class="description-value"> {{this.tender.contactPersonName}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Surname: </label>
          <div class="description-value"> {{this.tender.contactPersonSurname}} </div>
        </div>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Phone Number:</label>
          <div class="description-value"> {{this.tender.phoneNumber}} </div>
        </div>
      </div>

      <div class="description-title">
        <h2 class="description-h2">Procedure</h2>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Procedure: </label>
          <div class="description-value"> {{this.tender.name}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Language: </label>
          <div class="description-value"> {{"English"}} </div>
        </div>
      </div>
      <div class="description-title">
        <h2 class="description-h2">Subject matter of the procurement</h2>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> CPV Code: </label>
          <div class="description-value"> {{!!this.tender.cpv ? this.tender.cpv.name : ""}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Type of tender:</label>
          <div class="description-value"> {{getTenderTypeById(this.tender.tenderTypeId)}} </div>
        </div>
      </div>
      <div class="description-row">
          <div class="description-container">
            <label class="description-label">Min Tender Value: </label>
          <div class="description-value"> {{this.tender.minValue}} </div>
        </div>
        <div class="description-container">
          <label class="description-label">Max Tender Value: </label>
          <div class="description-value"> {{this.tender.maxValue}} </div>
        </div>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Currency: </label>
          <div class="description-value"> {{getCurrencyById(this.tender.currencyId)}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Description: </label>
          <div class="description-value"> {{this.tender.description}} </div>
        </div>
      </div>

      <div class="description-title">
        <h2 class="description-h2"> Date</h2>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Publication Date: </label>
          <div class="description-value"> {{formatDate(tender['publicDate'])}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Deadline for Offer Submission: </label>
          <div class="description-value"> {{formatDate(tender['deadLineOfSub'])}} </div>
        </div>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Deadline for Signed Contract Submission: </label>
          <div class="description-value"> {{formatDate(tender['deadForSinging'])}} </div>
        </div>
      </div>
      <div class="description-title">
        <h2 class="description-h2">Documents</h2>
      </div>
      <div class="description-row">
        <div class="description-download-value">
          <v-icon class="file-icon"  icon="fa fa-file-contract" />
          <a class="description-file-link" target="_blank" type="button"  @click="downloadFile(tender['contractFileKey'])">contract document.pdf</a>
        </div>
        <div v-if="!isBidder" class="description-download-value">
          <v-icon class="file-icon"  icon="fa fa-file-contract" />
          <a class="description-file-link" target="_blank" type="button"  @click="downloadFile(tender['awardFileKey'])">award document.pdf</a>
        </div>
        <div v-if="!isBidder" class="description-download-value">
          <v-icon class="file-icon"  icon="fa fa-file-contract" />
          <a class="description-file-link" target="_blank" type="button" @click="downloadFile(tender['declineFileKey'])">decline document.pdf</a>
        </div>
      </div>
    </div>
  </div>
 </template>

<script>
import {API_BASE_URL} from "@/const_config";
import {formatDate, getAuthenticatedHeaders, logout} from "@/utils";
import OfferTable from "@/views/OfferTable/OfferTable.vue";
import OfferDescription from "@/views/OfferDescription/OfferDescription.vue";

export default {
  components: {OfferDescription, OfferTable},
  emits: ['backAction', 'offerDescriptionOpen'],
  name: "TenderDescription",
  props:['tender', 'isTender', 'isBidder'],
  data() {
      return {
        countries: [],
        currencies: [],
        tenderTypes: [],

      }
  },
  async beforeMount() {
    this.countries = await fetch(API_BASE_URL+'/countries', {
      headers: getAuthenticatedHeaders()
    }).then((response) => {
          if (response.ok) {
            return response.json()
          } else if (response.status === 401 || response.status === 403) {
            logout();
          }
        }
    )
        .then(response => {
          return response;
        });
    this.currencies = await fetch(API_BASE_URL+'/currencies',{
      headers: getAuthenticatedHeaders()
    }).then((response) => {
          if (response.ok) {
            return response.json()
          } else if (response.status === 401 || response.status === 403) {
            logout();
          }
        }
    )
        .then(response => {
          return response;
        });
    this.tenderTypes = await fetch(API_BASE_URL+'/types',{
      headers: getAuthenticatedHeaders()
    }).then((response) => {
          if (response.ok) {
            return response.json()
          } else if (response.status === 401 || response.status === 403) {
            logout();
          }
        }
    )
        .then(response => {
          return response;
        });
  },
  methods:{
    back() {
      this.$emit("backAction", true);
    },
    openOfferDescription(offer) {
      this.$emit("offerDescriptionOpen", {tender:this.tender, offer: offer});
    },
    createOffer() {
      this.$emit("createOfferOpen", this.tender);
    },
    downloadFile(key){
      const url =API_BASE_URL+'/download/'+key

      fetch(url, {
        headers: getAuthenticatedHeaders()
      })
          .then( res => res.blob() )
          .then( blob => {
            var file = window.URL.createObjectURL(blob);
            window.location.assign(file);
          });
    },
    getCountryById(id){
      let country;
      if(id) {
        country = this.countries.find(country => country.countryId === id);
      }
      return !!country ? country.name : "";
    },
    getCurrencyById(id){
      let currency
      if(id) {
        currency = this.currencies.find(currency => currency.currencyId === id);
      }
      return !!currency ? currency.name : "";
    },
    getTenderTypeById(id){
      let tenderType;
      if(id) {
        tenderType = this.tenderTypes.find(tenderType => tenderType.id === id);
      }
      return !!tenderType ? tenderType.name : "";
    },
    formatDate(miliseconds) {
      if(!!miliseconds){
        let d = new Date(miliseconds);
        return formatDate(d);
      }
    },
  }
}
</script>

<style scoped>
@import "@/styles/main.css";

</style>