<template>
  <div class="header-container">

  </div>
  <div  style="margin-top: -155px;width: 60%;
    margin-left: 20%;">
    <div class="form-title">
      <h1> Create New Tender </h1>
    </div>

    <div class="tender-form">
      <div class="create-tender-title"><h2>Contractor</h2></div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoName }" for="nameId">
            <span :class="{ 'invalid-label': validations.isNoName }" class="asterix">*</span>Official name  </label>
          <input :class="{ invalid: validations.isNoName }" maxlength="50" id="nameId" class="tender-input" v-model="name" placeholder="Official name" />
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoNationalRegNumber }">
            <span :class="{ 'invalid-label': validations.isNoNationalRegNumber }" class="asterix">*</span>National registration number</label>
          <input :class="{ invalid: validations.isNoNationalRegNumber }" class="tender-input" v-model="nationalRegNumber" placeholder="National registration number" />
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoCountryId }">
            <span :class="{ 'invalid-label': validations.isNoCountryId }" class="asterix">*</span>Country</label>
          <select :class="{ invalid: validations.isNoCountryId }" v-model="countryId">
            <option :value="null">Select</option>
            <option v-for="countryToSelect in countries" :key="countryToSelect" :value="countryToSelect.countryId">{{countryToSelect.name}}</option>
          </select>
        </div>
      </div>
      <div class="create-tender-row">
        <div class="input-container">
          <label>City/Town</label>
          <input class="tender-input" v-model="townCity" maxlength="50" placeholder="City/Town" />
        </div>
      </div>
      <div class="create-tender-title"><h2>Contract person</h2></div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoContactPersonName }">
            <span :class="{ 'invalid-label': validations.isNoContactPersonName }" class="asterix">*</span>Name</label>
          <input :class="{ invalid: validations.isNoContactPersonName }" class="tender-input" maxlength="50" v-model="contactPersonName" placeholder="Name" />
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoContactPersonSurname }">
            <span :class="{ 'invalid-label': validations.isNoContactPersonSurname }" class="asterix">*</span>Surname</label>
          <input :class="{ invalid: validations.isNoContactPersonSurname }" class="tender-input" maxlength="50" v-model="contactPersonSurname" placeholder="Surname" />
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoPhoneNumber }">
            <span :class="{ 'invalid-label': validations.isNoPhoneNumber }" class="asterix">*</span>Phone number</label>
          <input :class="{ invalid: validations.isNoPhoneNumber }" class="tender-input" v-model="phoneNumber" placeholder="Phone number" />
        </div>
      </div>
      <div class="create-tender-title"><h2>Subject matter of procurement</h2></div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoCvpCodeId }">
            <span :class="{ 'invalid-label': validations.isNoCvpCodeId }" class="asterix">*</span>CVP code</label>
          <select :class="{ invalid: validations.isNoCvpCodeId }" v-model="cvpCodeId">
            <option :value="null">Select</option>
            <option v-for="cvpCodeSelect in cvpCodes" :key="cvpCodeSelect" :value="cvpCodeSelect.id">{{cvpCodeSelect.name}}</option>
          </select>
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoTenderTypeId }">
            <span :class="{ 'invalid-label': validations.isNoTenderTypeId }" class="asterix">*</span>Type of tender</label>
          <select :class="{ invalid: validations.isNoTenderTypeId }" v-model="tenderTypeId">
            <option :value="null">Select</option>
            <option v-for="tenderType in tenderTypes" :key="tenderType" :value="tenderType.id">{{tenderType.name}}</option>
          </select>
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoTenderDescription }">
            <span :class="{ 'invalid-label': validations.isNoTenderDescription }" class="asterix">*</span>Description</label>
          <input :class="{ invalid: validations.isNoTenderDescription }" class="tender-input" maxlength="250"  v-model="tenderDescription" placeholder="Description" />
        </div>
      </div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoMaxValue }">
            <span :class="{ 'invalid-label': validations.isNoMaxValue }" class="asterix">*</span>Maximum tender value</label>
          <input :class="{ invalid: validations.isNoMaxValue }" class="tender-input" min="0" type="number" v-model="maxValue" placeholder="Maximum tender value" />
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoMinValue }">
            <span :class="{ 'invalid-label': validations.isNoMinValue }" class="asterix">*</span>Minimum tender value</label>
          <input :class="{ invalid: validations.isNoMinValue }" class="tender-input" min="0" type="number" v-model="minValue" placeholder="Minimum tender value" />
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoCurrencyId }">
            <span :class="{ 'invalid-label': validations.isNoCurrencyId }" class="asterix">*</span>Currency</label>
          <select :class="{ invalid: validations.isNoCurrencyId }" v-model="currencyId">
            <option :value="null">Select</option>
            <option v-for="currency in currencies" :key="currency" :value="currency.currencyId">{{currency.name}}</option>
          </select>
        </div>
      </div>
      <div class="create-tender-title"><h2>Date</h2></div>
      <div class="create-tender-row">
        <div class="input-container">
          <label>
            <span class="asterix">*</span>Publication date</label>
          <div class="tender-input publication-date"> {{formatTenderDate(publicDate)}} </div>
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoDeadLineOfSub }">
            <span :class="{ 'invalid-label': validations.isNoDeadLineOfSub }" class="asterix">*</span>Deadline for offer submissin</label>
          <input :class="{ invalid: validations.isNoDeadLineOfSub }" class="tender-input" type="date" v-model="deadLineOfSub" />
        </div>
        <div class="input-container">
          <label :class="{ 'invalid-label': validations.isNoDeadForSinging }">
            <span :class="{ 'invalid-label': validations.isNoDeadForSinging }" class="asterix">*</span>Deadline for signed contract submission</label>
          <input :disabled="!deadLineOfSub" :class="{ invalid: validations.isNoDeadForSinging }" class="tender-input" type="date" v-model="deadForSinging"/>
        </div>
      </div>
      <div class="create-tender-title"><h2>Documents</h2></div>

      <div class="file-upload-container">
        <label :class="{ 'invalid-label': validations.isNoContractFileKey }" class="file-upload-label">
          <span :class="{ 'invalid-label': validations.isNoContractFileKey }" class="asterix">*</span>Contract</label>
        <input :class="{ invalid: validations.isNoContractFileKey }" class="upload-input" type="file" @change="uploadContractFile" ref="contractFile" placeholder="Contract" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.contractFile, 'contractFileKey')" value="Submit">
        <v-icon class="button-icon" v-if="isContractFileSubmitted" icon="fa fa-check"></v-icon>
      </div>
      <div class="file-upload-container">
        <label :class="{ 'invalid-label': validations.isNoAwardFileKey }" class="file-upload-label">
          <span :class="{ 'invalid-label': validations.isNoAwardFileKey }" class="asterix">*</span>Award decision</label>
        <input :class="{ invalid: validations.isNoAwardFileKey }" class="upload-input" type="file" @change="uploadAwardFile" ref="awardFile" accept=".pdf">
        <input  type="button" class="upload-button rcorners1" @click="submitFile(this.awardFile, 'awardFileKey')" value="Submit">
        <v-icon class="button-icon" v-if="isAwardFileSubmitted" icon="fa fa-check"></v-icon>
      </div>
      <div class="file-upload-container">
        <label :class="{ 'invalid-label': validations.isNoDeclineFileKey }" class="file-upload-label">
          <span :class="{ 'invalid-label': validations.isNoDeclineFileKey }" class="asterix">*</span>Decline decision</label>
        <input :class="{ invalid: validations.isNoDeclineFileKey }" class="upload-input" type="file" @change="uploadDeclineFile" ref="declineFile" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(declineFile, 'declineFileKey')" value="Submit">
        <v-icon class="button-icon" v-if="isDeclineFileSubmitted" icon="fa fa-check"></v-icon>
      </div>
    </div>
    <button class="rcorners1 button" style="background-color: #ffffff;color: #27aae1; border-color: #27aae1; "
            @click="cancelTender">Cancel</button>
    <button class="rcorners1 button" @click="publishTender">Publish</button>

  </div>

</template>

<script>

import {formatDate, getAuthenticatedHeaders, getHeaders, logout} from "@/utils";
  import {API_BASE_URL} from "@/const_config";
import router from "@/router";

  export default {
    name: "Create-tender",
    emits: ["created"],
    data() {
      return {
        validations:{},
        countries: [],
        cvpCodes: [],
        currencies: [],
        tenderTypes: [],
        name: null,
        nationalRegNumber: null,
        countryId: null,
        townCity: null,
        contactPersonName: null,
        contactPersonSurname: null,
        phoneNumber: null,
        cvpCodeId: null,
        tenderTypeId: null,
        tenderDescription: null,
        minValue: null,
        maxValue: null,
        currencyId: 3,
        publicDate: new Date(),
        deadLineOfSub: null,
        deadForSinging: null,

        contractFile: null,
        isContractFileSubmitted: false,
        contractFileSubmitted: null,
        fileKeys: new Map(),
        declineFile: null,
        isDeclineFileSubmitted: false,
        declineFileKey: null,
        awardFile: null,
        isAwardFileSubmitted: false,
        awardFileKey: null,
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
      this.cvpCodes = await fetch(API_BASE_URL+'/cpvs', {
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
      let currentDate = new Date();
      this.deadLineOfSub = new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"})
          .format(currentDate.setDate(currentDate.getDate() + 1));
    },
    methods: {
      formatTenderDate(miliseconds) {
        if(!!miliseconds){
          let d = new Date(miliseconds);
          return formatDate(d);
        }
      },
      uploadContractFile() {
        this.contractFile = this.$refs.contractFile.files[0];

      },
      uploadDeclineFile() {
        this.declineFile = this.$refs.declineFile.files[0];
        this.isDeclineFileSubmitted = false;
      },
      uploadAwardFile() {
        this.awardFile = this.$refs.awardFile.files[0];
      },
      submitFile(file, fileKeyKey) {
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
            this.fileKeys.set(fileKeyKey, response);
            this.isDeclineFileSubmitted = !!this.fileKeys.get('declineFileKey');
            this.isAwardFileSubmitted = !!this.fileKeys.get('awardFileKey');
            this.isContractFileSubmitted = !!this.fileKeys.get('contractFileKey');

          })
        }
      },
      publishTender() {
        if(!this.nationalRegNumber
            || !this.name
            || !this.countryId
            || !this.contactPersonName
            || !this.contactPersonSurname
            || Number.isNaN(+this.phoneNumber)
            || !this.phoneNumber
            || !this.cvpCodeId
            || !this.tenderTypeId
            || !this.tenderDescription
            || !this.minValue
            || !this.maxValue
            || !this.currencyId
            || !this.publicDate
            || !this.deadLineOfSub
            || !this.deadForSinging
            || !this.fileKeys.get('contractFileKey')
            || !this.fileKeys.get('awardFileKey')
            || !this.fileKeys.get('declineFileKey')){
          this.validations = {
            isNoName: !this.name,
            isNoNationalRegNumber: !this.nationalRegNumber,
            isNoCountryId: !this.countryId,
            isNoContactPersonName: !this.contactPersonName,
            isNoContactPersonSurname: !this.contactPersonSurname,
            isNoPhoneNumber: (!this.phoneNumber || Number.isNaN(+this.phoneNumber)),
            isNoCvpCodeId:!this.cvpCodeId,
            isNoTenderTypeId: !this.tenderTypeId,
            isNoTenderDescription: !this.tenderDescription,
            isNoMinValue: !this.minValue,
            isNoMaxValue: !this.maxValue,
            isNoCurrencyId: !this.currencyId,
            isNoPublicDate: !this.publicDate,
            isNoDeadLineOfSub: !this.deadLineOfSub,
            isNoDeadForSinging: !this.deadForSinging,
            isNoContractFileKey: !this.fileKeys.get('contractFileKey'),
            isNoAwardFileKey: !this.fileKeys.get('awardFileKey'),
            isNoDeclineFileKey: !this.fileKeys.get('declineFileKey')
          }
        } else {
        fetch(API_BASE_URL+'/tenders', {
          method: 'POST',
          body: JSON.stringify({"name": this.name,
            "nationalRegNumber": this.nationalRegNumber,
            "countryId": this.countryId,
            "townCity": this.townCity,
            "contactPersonName": this.contactPersonName,
            "contactPersonSurname": this.contactPersonSurname,
            "phoneNumber": this.phoneNumber ? ""+this.phoneNumber : null,
            "cpv": {id:this.cvpCodeId},
            "tenderTypeId": this.tenderTypeId,
            "tenderDescription": this.tenderDescription,
            "minValue": this.minValue,
            "maxValue": this.maxValue,
            "currencyId": this.currencyId,
            "contractFileKey": this.fileKeys.get('contractFileKey'),
            "awardFileKey": this.fileKeys.get('awardFileKey'),
            "declineFileKey": this.fileKeys.get('declineFileKey'),
            "publicDate": this.publicDate ? this.publicDate.getTime() : null,
            "deadLineOfSub": this.deadLineOfSub ? new Date(this.deadLineOfSub).getTime() : null,
            "deadForSinging": this.deadLineOfSub && this.deadForSinging ? new Date(this.deadForSinging).getTime() : null}),
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
      cancelTender(){
        this.$emit('created', false)
      },
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

.publication-date {
  padding: 0.5rem;
}

input {
  display:flex;
}
h2 {
  overflow: hidden;
  position: relative;
  color: #444a4f;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
h2::after {
  content: '';
  width: 100%;
  height: .1rem;
  background: #f5f5f5;
  position: absolute;
  top: 50%;
  margin-left: 1rem;
}

.create-tender-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.create-tender-row {
  width: 100%;
  height: 9rem;
}

.tender-form {
  border-radius: 0.838rem;
  padding-left: 5%;
  padding-right: 1%;
  background-color: #ffffff;
  border: 0.063rem solid #ffffff;
}

.tender-input{
  margin-top: 1rem;
  border-radius: 0.438rem;
  border: 0.0625rem solid #ccc;
  float: left;
  height: 2.5rem;
  width: 100%;
  min-width: 90%;
  box-sizing: border-box;
}

.asterix {
  font-size: 0.625rem;
  padding: 0.125rem;
}


</style>

