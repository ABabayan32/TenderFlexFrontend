<template>
  <div class="header-container">

  </div>
  <div v-if="tenderValue" style="margin-top: -155px;width: 60%;
    margin-left: 20%;">
    <a class="description-back" target="_blank" type="button" @click="back()">{{"< back"}}</a>
    <div class="description-main-title">
      <h1>{{!!tenderValue.cpv ? tenderValue.cpv.field : ""}} ({{!!tenderValue.cpv ? tenderValue.cpv.name : ""}}) </h1>
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
    <div v-if="!isTender && !isBidder && !tenderId">
      <OfferTable @offerDescriptionOpen="openOfferDescription" :baseUrl="'/tenders/me/offers'" :tender="tenderValue"></OfferTable>
    </div>
    <div v-if="!isTender && isBidder">
      <OfferDescription @offerStatusChanged="back" @createOfferOpen="createOffer" :tender="tenderValue"></OfferDescription>
    </div>
    <div v-if="isTender" class="description-form">
      <div class="description-main-row">
        <div class="description-title">
          <h2 class="description-h2">Contractor</h2>
        </div>
          <div class="description-row">
            <div class="description-container">
              <label class="description-label">  Official Name: </label>
              <div class="description-value"> {{tenderValue.name}} </div>
            </div>
            <div class="description-container">
              <label class="description-label"> Country: </label>
              <div class="description-value"> {{getCountryById(tenderValue.countryId)}} </div>
            </div>
          </div>
        <div class="description-row">
          <div class="description-container">
            <label class="description-label">National Registration Number: </label>
            <div class="description-value" > {{tenderValue.nationalRegNumber}} </div>
          </div>
          <div class="description-container">
            <label class="description-label">City/Town: </label>
            <div class="description-value" > {{tenderValue.townCity}} </div>
          </div>
        </div>
      </div>
      <div class="description-title">
        <h2 class="description-h2">Contact person</h2>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Name: </label>
          <div class="description-value"> {{tenderValue.contactPersonName}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Surname: </label>
          <div class="description-value"> {{tenderValue.contactPersonSurname}} </div>
        </div>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Phone Number:</label>
          <div class="description-value"> {{tenderValue.phoneNumber}} </div>
        </div>
      </div>

      <div class="description-title">
        <h2 class="description-h2">Procedure</h2>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Procedure: </label>
          <div class="description-value"> {{tenderValue.name}} </div>
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
          <div class="description-value"> {{!!tenderValue.cpv ? tenderValue.cpv.name : ""}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Type of tender:</label>
          <div class="description-value"> {{getTenderTypeById(tenderValue.tenderTypeId)}} </div>
        </div>
      </div>
      <div class="description-row">
          <div class="description-container">
            <label class="description-label">Min Tender Value: </label>
          <div class="description-value"> {{tenderValue.minValue}} </div>
        </div>
        <div class="description-container">
          <label class="description-label">Max Tender Value: </label>
          <div class="description-value"> {{tenderValue.maxValue}} </div>
        </div>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Currency: </label>
          <div class="description-value"> {{getCurrencyById(tenderValue.currencyId)}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Description: </label>
          <div class="description-value"> {{tenderValue.tenderDescription}} </div>
        </div>
      </div>

      <div class="description-title">
        <h2 class="description-h2"> Date</h2>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Publication Date: </label>
          <div class="description-value"> {{formatTenderDate(tenderValue['publicDate'])}} </div>
        </div>
        <div class="description-container">
          <label class="description-label"> Deadline for Offer Submission: </label>
          <div class="description-value"> {{formatTenderDate(tenderValue['deadLineOfSub'])}} </div>
        </div>
      </div>
      <div class="description-row">
        <div class="description-container">
          <label class="description-label"> Deadline for Signed Contract Submission: </label>
          <div class="description-value"> {{formatTenderDate(tenderValue['deadForSinging'])}} </div>
        </div>
      </div>
      <div class="description-title">
        <h2 class="description-h2">Documents</h2>
      </div>
      <div class="description-row">
        <div class="description-download-value">
          <v-icon class="file-icon"  icon="fa fa-file-contract" />
          <a class="description-file-link" target="_blank" type="button"  @click="downloadFile(tenderValue['contractFileKey'])">contract document.pdf</a>
        </div>
        <div v-if="!isBidder" class="description-download-value">
          <v-icon class="file-icon"  icon="fa fa-file-contract" />
          <a class="description-file-link" target="_blank" type="button"  @click="downloadFile(tenderValue['awardFileKey'])">award document.pdf</a>
        </div>
        <div v-if="!isBidder" class="description-download-value">
          <v-icon class="file-icon"  icon="fa fa-file-contract" />
          <a class="description-file-link" target="_blank" type="button" @click="downloadFile(tenderValue['declineFileKey'])">decline document.pdf</a>
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
  name: "tender-description",
  props:['tender', 'isTender', 'isBidder', 'tenderId'],
  data() {
      return {
        countries: [],
        currencies: [],
        tenderTypes: [],
        tenderValue: null

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
    if(!this.tender && this.tenderId){
      this.tenderValue = await fetch(API_BASE_URL+'/tenders/' + this.tenderId,{
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
    } else {
      this.tenderValue = this.tender;
    }
  },
  methods:{
    back() {
      this.$emit("backAction", true);
    },
    openOfferDescription(offer) {
      this.$emit("offerDescriptionOpen", {tender:this.tenderValue, offer: offer});
    },
    createOffer() {
      this.$emit("createOfferOpen", this.tenderValue);
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
    formatTenderDate(miliseconds) {
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