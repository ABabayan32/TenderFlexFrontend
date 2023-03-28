<template>
  <div class="offer-form-header-container">

  </div>
  <div  style="margin-top: -155px;width: 60%;
      margin-left: 20%;">
    <div class="offer-form-title">
      <h1> Create New Offer </h1>
    </div>

    <div class="offer-form">
      <div class="create-offer-title">
        <h2>Bidder</h2>
      </div>
      <div class="create-offer-row">
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoName }" for="nameId">
            <span :class="{ invalidLabel: validations.isNoName }" class="asterix">*</span>Official name  </label>
          <input :class="{ invalid: validations.isNoName }" id="nameId" class="create-offer-input" v-model="name" placeholder="Official name" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoNatRegNumber }">
            <span :class="{ invalidLabel: validations.isNoNatRegNumber }" class="asterix">*</span>National registration number</label>
          <input :class="{ invalid: validations.isNoNatRegNumber }" class="create-offer-input" v-model="natRegNumber" placeholder="National registration number" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoCountryId }">
            <span :class="{ invalidLabel: validations.isNoCountryId }" class="asterix">*</span>Country</label>
          <select :class="{ invalid: validations.isNoCountryId }" v-model="countryId">
            <option :value="null">Select</option>
            <option v-for="countryToSelect in countries" :key="countryToSelect" :value="countryToSelect.countryId">{{countryToSelect.name}}</option>
          </select>
        </div>
      </div>
      <div class="create-offer-row">
        <div class="input-container">
          <label>City/Town</label>
          <input class="create-offer-input" v-model="townCity" placeholder="City/Town" />
        </div>
      </div>
      <div class="create-offer-title">
        <h2>Contact person</h2>
      </div>
      <div class="create-offer-row">
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoContPersonName }">
            <span :class="{ invalidLabel: validations.isNoContPersonName }" class="asterix">*</span>Name</label>
          <input :class="{ invalid: validations.isNoContPersonName }" class="create-offer-input" v-model="contPersonName" placeholder="Name" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoContPersonSurname }">
            <span :class="{ invalidLabel: validations.isNoContPersonSurname }" class="asterix">*</span>Surname</label>
          <input :class="{ invalid: validations.isNoContPersonSurname }" class="create-offer-input" v-model="contPersonSurname" placeholder="Surname" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoPhoneNumber }">
            <span :class="{ invalidLabel: validations.isNoPhoneNumber }" class="asterix">*</span>Phone number</label>
          <input :class="{ invalid: validations.isNoPhoneNumber }" class="create-offer-input" v-model="phoneNumber" placeholder="Phone number" />
        </div>
      </div>
      <div class="create-offer-title">
        <h2> Price </h2>
      </div>
      <div class="create-offer-row">
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoBidPrice }">
            <span :class="{ invalidLabel: validations.isNoBidPrice }" class="asterix">*</span>Bid price</label>
          <input :class="{ invalid: validations.isNoBidPrice }" class="create-offer-input" type="number" v-model="bidPrice" placeholder="Bid Price" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoCurrencyId }">
            <span :class="{ invalidLabel: validations.isNoCurrencyId }" class="asterix">*</span>Currency</label>
          <select :class="{ invalid: validations.isNoCurrencyId }" v-model="currencyId">
            <option :value="null">Select</option>
            <option v-for="currency in currencies" :key="currency" :value="currency.currencyId">{{currency.name}}</option>
          </select>
        </div>
      </div>
      <div class="create-tender-title"><h2>Documents</h2></div>

      <div class="file-upload-container">
        <label :class="{ invalidLabel: validations.isNoOfferFileKey }" class="file-upload-label">
          <span :class="{ invalidLabel: validations.isNoOfferFileKey }" class="asterix">*</span>Contract</label>
        <input :class="{ invalid: validations.isNoOfferFileKey }" class="upload-input" type="file" @change="uploadOfferFile" ref="offerFile" placeholder="Contract" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.offerFile)" value="Submit">
      </div>
    </div>
    <button class="rcorners1 cancel-button" @click="cancelOffer">Cancel</button>
    <button class="rcorners1 publish-button" @click="publishOffer">Publish</button>
  </div>
</template>

<script>
import {API_BASE_URL} from "@/const_config";
import {getAuthenticatedHeaders, logout} from "@/utils";

export default {
  name: "CreateOffer",
  props: ['tender'],
  emits: ["created"],
  data() {
    return {
      validations:{},
      countries: [],
      currencies: [],
      name: null,
      natRegNumber: null,
      countryId: null,
      townCity: null,
      contPersonName: null,
      contPersonSurname: null,
      phoneNumber: null,
      bidPrice: null,
      currencyId: null,
      offerFileKey: null,
      offerFile: null
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
  },
  methods: {
    uploadOfferFile() {
      this.offerFile = this.$refs.offerFile.files[0];
    },
    publishOffer() {
      if(!this.natRegNumber
          || !this.name
          || !this.countryId
          || !this.contPersonName
          || !this.contPersonSurname
          || !this.phoneNumber
          || !this.bidPrice
          || !this.currencyId
          || !this.offerFileKey){
        this.validations = {
          isNoName: !this.name,
          isNoNatRegNumber: !this.natRegNumber,
          isNoCountryId: !this.countryId,
          isNoContPersonName: !this.contPersonName,
          isNoContPersonSurname: !this.contPersonSurname,
          isNoPhoneNumber:!this.phoneNumber,
          isNoBidPrice:!this.bidPrice,
          isNoCurrencyId: !this.currencyId,
          isNoOfferFileKey: !this.offerFileKey
        }
      } else {
        fetch(API_BASE_URL+'/offers', {
          method: 'POST',
          body: JSON.stringify({
                "name": this.name,
                "natRegNumber": this.natRegNumber,
                "countryId": this.countryId,
                "townCity": this.townCity,
                "contPersonName": this.contPersonName,
                "contPersonSurname": this.contPersonSurname,
                "phoneNumber": this.phoneNumber,
                "bidPrice": this.bidPrice,
                "currencyId": this.currencyId,
                "tenderId": this.tender.id,
                "offerFileKey" : this.offerFileKey
              }
          ),
          headers: {
            ...getAuthenticatedHeaders(),
            "Content-Type": "application/json",
          },
        })
            .then(response => {
              this.$emit('created', true)
            })
      }

    },
    submitFile(file) {
      if(file){
        const formData = new FormData();
        formData.append('file', file);
        const headers = {'Content-Type': 'multipart/form-data'};
        fetch(API_BASE_URL+'/uploadFile', {
          method: 'POST',
          body: formData,
          headers: {
            ...getAuthenticatedHeaders(),

          },
        })
            .then((response) => {
                  if (response.ok) {
                    return response.text();
                  } else if (response.status === 401 || response.status === 403) {
                    logout();
                  }
                }
            ).then((response)=>{
          this.offerFileKey = response;
        })
      }
    },
    cancelOffer(){
      this.$emit('created', false)
    }
  }

}
</script>


<style scoped>
@import "@/styles/main.css";

label {
  margin-bottom: .3rem !important;
  height: 1.7rem;
  color: #646b70;
  display:flex;
}

::file-selector-button {
  display: none;
}

input {
  display:flex;
}
h2{
  color: #444a4f;
}

.offer-form-header-container {
  height: 10.68rem;
  max-width: 101.2%;
  margin-left: -0.5rem;
  margin-top: 5.125rem;
  border-color: #ffffff;
  background-color: #27aae1;
}
.offer-form-title {
  font-size: 1.363rem;
  color: #ffffff;
}

.offer-form {
  border-radius: 0.838rem;
  padding-left: 5%;
  padding-right: 1%;
  background-color: #ffffff;
  border: 0.063rem solid #ffffff;
}

.asterix {
  font-size: 0.625rem;
  padding: 0.125rem;
}


.create-offer-input {
  margin-top: 1rem;
  border-radius: 0.438rem;
  border: 0.0625rem solid #ccc;
  float: left;
  height: 2.5rem;
  width: 100%;
  min-width: 90%;
  box-sizing: border-box;
}

.create-offer-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.create-offer-row {
  width: 100%;
  height: 9rem;
}

</style>