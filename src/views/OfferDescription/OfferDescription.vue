<template>
  <div v-if="!!offerExternal" class="header-container">

  </div>
  <div :class="{ 'offer-desc-form': !!offerExternal }">
    <div v-if="!!offerExternal" style="margin-bottom: 3rem;" class="description-main-title">
      <h1>{{!!this.tender.cpv ? this.tender.cpv.field : ""}} ({{!!this.tender.cpv ? this.tender.cpv.name : ""}}) </h1>
    </div >
    <div class="blank-table" v-if="!offer && tender && tender['tenderStatus'].id === 1">
      <div class="no-offers"> <button class="rcorners1 create-offer" @click="createOffer">Create Offer</button></div>
    </div>
    <div class="blank-table" v-if="!offer && tender && tender['tenderStatus'].id !== 1">
      <div class="no-offers"> Tender is Closed</div>
    </div>
    <div v-if="!!offer" class="description-form">
      <div class="description-main-row">
        <div class="description-title">
          <h2 class="description-h2">Bidder</h2>
        </div>
        <div class="description-row">
          <div class="description-container">
            <label class="description-label">  Official Name: </label>
            <div class="description-value"> {{offer.name}} </div>
          </div>
          <div class="description-container">
            <label class="description-label"> Country: </label>
            <div class="description-value"> {{getCountryById(offer.countryId)}} </div>
          </div>
        </div>
        <div class="description-row">
          <div class="description-container">
            <label class="description-label">National Registration Number: </label>
            <div class="description-value" > {{offer.natRegNumber}} </div>
          </div>
          <div class="description-container">
            <label class="description-label">City/Town: </label>
            <div class="description-value" > {{offer.townCity}} </div>
          </div>
        </div>
      </div>
        <div class="description-title">
          <h2 class="description-h2">Contact person</h2>
        </div>
        <div class="description-row">
          <div class="description-container">
            <label class="description-label"> Name: </label>
            <div class="description-value"> {{offer.contPersonName}} </div>
          </div>
          <div class="description-container">
            <label class="description-label"> Surname: </label>
            <div class="description-value"> {{this.offer.contPersonSurname}} </div>
          </div>
        </div>
        <div class="description-row">
          <div class="description-container">
            <label class="description-label"> Phone Number:</label>
            <div class="description-value"> {{offer.phoneNumber}} </div>
          </div>
        </div>
        <div class="description-title">
          <h2 class="description-h2">Price</h2>
        </div>
        <div class="description-row">
          <div class="description-container">
            <label class="description-label"> Bid Price: </label>
            <div class="description-value"> {{offer.bidPrice}} </div>
          </div>
          <div class="description-row">
            <div class="description-container">
              <label class="description-label"> Currency: </label>
              <div class="description-value"> {{getCurrencyById(offer.currencyId)}} </div>
            </div>
        </div>
        </div>
        <div class="description-title">
          <h2 class="description-h2">Documents</h2>
        </div>
        <div class="description-row">
          <div class="description-download-value">
            <v-icon class="file-icon"  icon="fa fa-file-contract" />
            <a class="description-file-link" target="_blank" type="button"  @click="downloadFile(offer.offerFileKey)">offer document.pdf</a>
          </div>
        </div>
        <div v-if="isOfferDeclined()" class="description-row">
          <div class="description-download-value">
            <v-icon class="file-decline-icon file-icon"  icon="fa fa-file-contract" />
            <a class="description-file-link file-decline-icon" target="_blank" type="button"  @click="getKeyAndDownload">reject_decision.pdf</a>
          </div>
        </div>
        <div v-if="isOfferChosen()" class="description-row">
          <div class="description-download-value">
            <v-icon class="file-award-icon file-icon"  icon="fa fa-file-contract" />
            <a class="description-file-link file-award-icon" target="_blank" type="button"  @click="getKeyAndDownload">award_decision.pdf</a>
          </div>
        </div>
        <button v-if="!!offer && (!offer.offerStatus || offer.offerStatus.id === 1) && offerExternal"
                class="rcorners1 publish-button" @click="sendDecision(2)">Send Award Decision</button>
        <button v-if="!!offer && (!offer.offerStatus || offer.offerStatus.id === 1) && offerExternal"
                class="rcorners1 cancel-button" @click="sendDecision(5)">Send Rejection Decision</button>
        <button v-if="!!offer && (offer.offerStatus && offer.offerStatus.id === 2) && !offerExternal"
                class="rcorners1 publish-button" @click="sendDecision(3)">Approve Contract</button>
        <button v-if="!!offer && (offer.offerStatus && offer.offerStatus.id === 2) && !offerExternal"
                class="rcorners1 cancel-button" @click="sendDecision(4)">Decline Contract</button>
    </div>
  </div>
</template>

<script>
import {API_BASE_URL} from "@/const_config";
import {formatDate, getAuthenticatedHeaders, logout} from "@/utils";
import {el} from "vuetify/locale";

export default {
  emits: ['createOfferOpen', 'offerStatusChanged'],
  name: "OfferDescription",
  props:['tender', 'offerExternal'],
  data() {
    return {
      offer: null,
      countries: [],
      currencies: [],
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
    if(!this.offerExternal){
      this.offer = await fetch(API_BASE_URL+'/tenders/'+ this.tender.id + '/offers/me', {
        headers: getAuthenticatedHeaders()
      }).then((response) => {
            if (response.ok) {
              return !!response ? response.json() : response;
            } else if (response.status === 401 || response.status === 403) {
              logout();
            } else if(response.status === 404) {
              return null;
            }
          }
      ).then(response => {
        return response;
      });
    } else {
      this.offer = this.offerExternal;
    }
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
  },
  methods:{
    isOfferChosen(){
      return !!this.offer && !this.offerExternal && this.offer.offerStatus && (this.offer.offerStatus.id === 2 || this.offer.offerStatus.id === 3)
    },
    isOfferDeclined(){
      return !!this.offer && !this.offerExternal && (((!this.offer.offerStatus || this.offer.offerStatus.id === 1) && this.tender.tenderStatus.id !==1)
          || (this.offer.offerStatus && this.offer.offerStatus.id === 5))
    },
    createOffer() {
      this.$emit("createOfferOpen", true);
    },
    getKeyAndDownload(){
      fetch(API_BASE_URL+'/offers/'+this.offer.id+'/decisionFileKey', {
        headers: getAuthenticatedHeaders()
      })
          .then( response => {
            if (response.ok) {
              return response.text()
            } else if (response.status === 401 || response.status === 403) {
              logout();
            }
          }).then(resp=>{
            this.downloadFile(resp)
      });
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

    sendDecision(id){
      fetch(API_BASE_URL+'/offers/'+this.offer.id, {
        method: 'PATCH',
        body: JSON.stringify({
              "statusId": +id,
              "tenderId": +this.offer.tenderId,
            }
        ),
        headers: {
          ...getAuthenticatedHeaders(),
          "Content-Type": "application/json",
        },
      })
          .then(response => {
            this.$emit('offerStatusChanged', true)
          })
    },
  }
}
</script>

<style scoped>
@import "@/styles/main.css";
.blank-table {
  max-width: 100%;
  background-color: #ffffff;
  height: 15rem;
}

.create-offer {
  background-color: #27aae1;
  color: #ffffff;
  padding: 0.5rem;
  cursor: pointer;
}

.offer-desc-form {
  margin-top: -155px;
  width: 60%;
  margin-left: 20%;
}

.no-offers {
  text-align: center;
  font-size: 1.875rem;
  padding: 6.25rem;
}
</style>