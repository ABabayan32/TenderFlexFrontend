<template>
  <div class="tender-form-header-container">

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
          <label :class="{ invalidLabel: validations.isNoName }" for="nameId"><span :class="{ invalidLabel: validations.isNoName }" class="asterix">*</span>Official name  </label>
          <input :class="{ invalid: validations.isNoName }" id="nameId" class="tender-input" v-model="name" placeholder="Official name" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoNationalRegNumber }"><span :class="{ invalidLabel: validations.isNoNationalRegNumber }" class="asterix">*</span>National registration number</label>
          <input :class="{ invalid: validations.isNoNationalRegNumber }" class="tender-input" v-model="nationalRegNumber" placeholder="National registration number" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoCountryId }"><span :class="{ invalidLabel: validations.isNoCountryId }" class="asterix">*</span>Country</label>
          <select :class="{ invalid: validations.isNoCountryId }" v-model="countryId">
            <option :value="null">Select</option>
            <option v-for="countryToSelect in countries" :key="countryToSelect" :value="countryToSelect.countryId">{{countryToSelect.name}}</option>
          </select>
        </div>
      </div>
      <div class="create-tender-row">
        <div class="input-container">
          <label>City/Town</label>
          <input class="tender-input" v-model="townCity" placeholder="City/Town" />
        </div>
      </div>
      <div class="create-tender-title"><h2>Contract person</h2></div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoContactPersonName }"><span :class="{ invalidLabel: validations.isNoContactPersonName }" class="asterix">*</span>Name</label>
          <input :class="{ invalid: validations.isNoContactPersonName }" class="tender-input" v-model="contactPersonName" placeholder="Name" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoContactPersonSurname }"><span :class="{ invalidLabel: validations.isNoContactPersonSurname }" class="asterix">*</span>Surname</label>
          <input :class="{ invalid: validations.isNoContactPersonSurname }" class="tender-input" v-model="contactPersonSurname" placeholder="Surname" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoPhoneNumber }"><span :class="{ invalidLabel: validations.isNoPhoneNumber }" class="asterix">*</span>Phone number</label>
          <input :class="{ invalid: validations.isNoPhoneNumber }" class="tender-input" v-model="phoneNumber" placeholder="Phone number" />
        </div>
      </div>
      <div class="create-tender-title"><h2>Subject matter of procurement</h2></div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoCvpCodeId }"><span :class="{ invalidLabel: validations.isNoCvpCodeId }" class="asterix">*</span>CVP code</label>
          <select :class="{ invalid: validations.isNoCvpCodeId }" v-model="cvpCodeId">
            <option :value="null">Select</option>
            <option v-for="cvpCodeSelect in cvpCodes" :key="cvpCodeSelect" :value="cvpCodeSelect.id">{{cvpCodeSelect.name}}</option>
          </select>
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoTenderTypeId }"><span :class="{ invalidLabel: validations.isNoTenderTypeId }" class="asterix">*</span>Type of tender</label>
          <select :class="{ invalid: validations.isNoTenderTypeId }" v-model="tenderTypeId">
            <option :value="null">Select</option>
            <option v-for="tenderType in tenderTypes" :key="tenderType" :value="tenderType.id">{{tenderType.name}}</option>
          </select>
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoDescription }"><span :class="{ invalidLabel: validations.isNoDescription }" class="asterix">*</span>Description</label>
          <input :class="{ invalid: validations.isNoDescription }" class="tender-input" v-model="description" placeholder="Description" />
        </div>
      </div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoMaxValue }"><span :class="{ invalidLabel: validations.isNoMaxValue }" class="asterix">*</span>Maximum tender value</label>
          <input :class="{ invalid: validations.isNoMaxValue }" class="tender-input" type="number" v-model="maxValue" placeholder="Maximum tender value" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoMinValue }"><span :class="{ invalidLabel: validations.isNoMinValue }" class="asterix">*</span>Minimum tender value</label>
          <input :class="{ invalid: validations.isNoMinValue }" class="tender-input" type="number" v-model="minValue" placeholder="Minimum tender value" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoCurrencyId }"><span :class="{ invalidLabel: validations.isNoCurrencyId }" class="asterix">*</span>Currency</label>
          <select :class="{ invalid: validations.isNoCurrencyId }" v-model="currencyId">
            <option :value="null">Select</option>
            <option v-for="currency in currencies" :key="currency" :value="currency.currencyId">{{currency.name}}</option>
          </select>
        </div>
      </div>
      <div class="create-tender-title"><h2>Date</h2></div>
      <div class="create-tender-row">
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoPublicDate }"><span :class="{ invalidLabel: validations.isNoPublicDate }" class="asterix">*</span>Publication date</label>
          <select :class="{ invalid: validations.isNoPublicDate }" v-model="publicDate">
            <option :value="null">Select</option>
            <option v-for="date in publicationDates" :key="date" :value="date.date">{{date.name}}</option>
          </select>
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoDeadLineOfSub }"><span :class="{ invalidLabel: validations.isNoDeadLineOfSub }" class="asterix">*</span>Deadline for offer submissin</label>
          <input :class="{ invalid: validations.isNoDeadLineOfSub }" class="tender-input" type="date" v-model="deadLineOfSub" />
        </div>
        <div class="input-container">
          <label :class="{ invalidLabel: validations.isNoDeadForSinging }"><span :class="{ invalidLabel: validations.isNoDeadForSinging }" class="asterix">*</span>Deadline for signed contract submission</label>
          <input :class="{ invalid: validations.isNoDeadForSinging }" class="tender-input" type="date" v-model="deadForSinging"/>
        </div>
      </div>
      <div class="create-tender-title"><h2>Documents</h2></div>

      <div class="file-upload-container">
        <label :class="{ invalidLabel: validations.isNoContractFileKey }" class="file-upload-label">
          <span :class="{ invalidLabel: validations.isNoContractFileKey }" class="asterix">*</span>Contract</label>
        <input :class="{ invalid: validations.isNoContractFileKey }" class="upload-input" type="file" @change="uploadContractFile" ref="contractFile" placeholder="Contract" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.contractFile, 'contractFileKey')" value="Submit">
      </div>
      <div class="file-upload-container">
        <label :class="{ invalidLabel: validations.isNoAwardFileKey }" class="file-upload-label">
          <span :class="{ invalidLabel: validations.isNoAwardFileKey }" class="asterix">*</span>Award decision</label>
        <input :class="{ invalid: validations.isNoAwardFileKey }" class="upload-input" type="file" @change="uploadAwardFile" ref="awardFile" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.awardFile, 'awardFileKey')" value="Submit">
      </div>
      <div class="file-upload-container">
        <label :class="{ invalidLabel: validations.isNoDeclineFileKey }" class="file-upload-label">
          <span :class="{ invalidLabel: validations.isNoDeclineFileKey }" class="asterix">*</span>Decline decision</label>
        <input :class="{ invalid: validations.isNoDeclineFileKey }" class="upload-input" type="file" @change="uploadDeclineFile" ref="declineFile" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.declineFile, 'declineFileKey')" value="Submit">
      </div>
    </div>
    <button class="rcorners1 cancel-button" @click="cancelTender">Cancel</button>
    <button class="rcorners1 publish-button" @click="publishTender">Publish</button>

  </div>

</template>

<script>

import {formatDate, getAuthenticatedHeaders, getHeaders, logout} from "@/utils";
  import {API_BASE_URL} from "@/const_config";
import router from "@/router";

  export default {
    name: "CreateTender",
    emits: ["created"],
    data() {
      return {
        validations:{},
        publicationDates: [],
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
        description: null,
        minValue: null,
        maxValue: null,
        currencyId: null,
        publicDate: null,
        deadLineOfSub: null,
        deadForSinging: null,

        contractFile: null,
        fileKeys: new Map(),
        declineFile: null,
        declineFileKey: null,
        awardFile: null,
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
      this.publicationDates.push({name: formatDate(currentDate), date: new Date(currentDate)});
      this.publicationDates.push({name: formatDate(currentDate.setDate(currentDate.getDate() + 1)),
        date: new Date(currentDate)});
      this.publicationDates.push({name: formatDate(currentDate.setDate(currentDate.getDate() + 1)),
        date: new Date(currentDate)});
    },
    methods: {
      uploadContractFile() {
        this.contractFile = this.$refs.contractFile.files[0];
      },
      uploadDeclineFile() {
        this.declineFile = this.$refs.declineFile.files[0];
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
            this.fileKeys.set(fileKeyKey, response)
          })
        }
      },
      publishTender() {
        if(!this.nationalRegNumber
            || !this.name
            || !this.countryId
            || !this.contactPersonName
            || !this.contactPersonSurname
            || !this.phoneNumber
            || !this.cvpCodeId
            || !this.tenderTypeId
            || !this.description
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
            isNoPhoneNumber:!this.phoneNumber,
            isNoCvpCodeId:!this.cvpCodeId,
            isNoTenderTypeId: !this.tenderTypeId,
            isNoDescription: !this.description,
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
            "phoneNumber": this.phoneNumber,
            "cpv": {id:this.cvpCodeId},
            "tenderTypeId": this.tenderTypeId,
            "description": this.description,
            "minValue": this.minValue,
            "maxValue": this.maxValue,
            "currencyId": this.currencyId,
            "contractFileKey": this.fileKeys.get('contractFileKey'),
            "awardFileKey": this.fileKeys.get('awardFileKey'),
            "declineFileKey": this.fileKeys.get('declineFileKey'),
            "publicDate": this.publicDate ? this.publicDate.getTime() : null,
            "deadLineOfSub": this.deadLineOfSub ? new Date(this.deadLineOfSub).getTime() : null,
            "deadForSinging": this.deadForSinging ? new Date(this.deadForSinging).getTime() : null}),
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

input {
  display:flex;
}
h2{
  color: #444a4f;
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

.tender-form-header-container {
  height: 10.68rem;
  margin-left: -0.5rem;
  margin-top: 5.125rem;
  border-color: #ffffff;
  background-color: #27aae1;
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

