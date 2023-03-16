<template>
  <div class="tender-form-header-container">

  </div>
  <div  style="margin-top: -155px;width: 60%;
    margin-left: 20%;">
    <div class="tender-form-title">
      <h1> Create New Tender </h1>
    </div>

    <div class="tender-form">
      <h2>Contractor</h2>
      <div class="input-container">
        <label for="nameId"><span class="asterix">*</span>Official name  </label>
        <input id="nameId" class="tender-input" v-model="name" placeholder="Official name" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>National registration number</label>
        <input class="tender-input" v-model="nationalRegNumber" placeholder="National registration number" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Country</label>
        <select v-model="countryId">
          <option :value="null">Select</option>
          <option v-for="countryToSelect in countries" :key="countryToSelect" :value="countryToSelect.countryId">{{countryToSelect.name}}</option>
        </select>
      </div>
      <div class="input-container">
        <label>City/Town</label>
        <input class="tender-input" v-model="townCity" placeholder="City/Town" />
      </div>

      <h2>Contract person</h2>
      <div class="input-container">
        <label><span class="asterix">*</span>Name</label>
        <input class="tender-input" v-model="contactPersonName" placeholder="Name" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Surname</label>
        <input class="tender-input" v-model="contactPersonSurname" placeholder="Surname" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Phone number</label>
        <input class="tender-input" v-model="phoneNumber" placeholder="Phone number" />
      </div>
      <h2>Subject matter of procurement</h2>
      <div class="input-container">
        <label><span class="asterix">*</span>CVP code</label>
        <select v-model="cvpCodeId">
          <option :value="null">Select</option>
          <option v-for="cvpCodeSelect in cvpCodes" :key="cvpCodeSelect" :value="cvpCodeSelect.id">{{cvpCodeSelect.name}}</option>
        </select>
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Type of tender</label>
        <select v-model="tenderTypeId">
          <option :value="null">Select</option>
          <option v-for="tenderType in tenderTypes" :key="tenderType" :value="tenderType.id">{{tenderType.name}}</option>
        </select>
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Description</label>
        <input class="tender-input" v-model="description" placeholder="Description" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Maximum tender value</label>
        <input class="tender-input" type="number" v-model="maxValue" placeholder="Maximum tender value" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Minimum tender value</label>
        <input class="tender-input" type="number" v-model="minValue" placeholder="Minimum tender value" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Currency</label>
        <select v-model="currencyId">
          <option :value="null">Select</option>
          <option v-for="currency in currencies" :key="currency" :value="currency.currencyId">{{currency.name}}</option>
        </select>
      </div>
      <h2>Date</h2>
      <div class="input-container">
        <label><span class="asterix">*</span>Publication date</label>
        <input class="tender-input" v-model="publicDate"  />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Deadline for offer submissin</label>
        <input class="tender-input" type="date" v-model="deadLineOfSub" />
      </div>
      <div class="input-container">
        <label><span class="asterix">*</span>Deadline for signed contract submission</label>
        <input class="tender-input" type="date" v-model="deadForSinging"/>
      </div>
      <div class="input-container">
        <label>Deadline for signed contract submission</label>
        <input class="tender-input" type="date" v-model="deadForSinging"/>
      </div>
      <h2>Documents</h2>
      <div class="file-upload-container">
        <label><span class="asterix">*</span>Contract</label>
        <input class="upload-input" type="file" @change="uploadContractFile" ref="contractFile" placeholder="Contract" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.contractFile, 'contractFileKey')" value="Submit">
      </div>
      <div class="file-upload-container">
        <label><span class="asterix">*</span>Award decision</label>
        <input class="upload-input" type="file" @change="uploadAwardFile" ref="awardFile" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.awardFile, 'awardFileKey')" value="Submit">
      </div>
      <div class="file-upload-container">
        <label><span class="asterix">*</span>`Decline decision</label>
        <input class="upload-input" type="file" @change="uploadDeclineFile" ref="declineFile" accept=".pdf">
        <input type="button" class="upload-button rcorners1" @click="submitFile(this.declineFile, 'declineFileKey')" value="Submit">
      </div>
    </div>
    <button class="rcorners1 cancel-button" @click="cancelTender">Cancel</button>
    <button class="rcorners1 publish-button" @click="publishTender">Publish</button>

  </div>

</template>

<script>

  import {getHeaders,logout} from "@/common_functions";
  import {API_BASE_URL} from "@/const_config";

  export default {
    name: "CreateTender",
    emits: ["created"],
    data() {
      return {
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
        const formData = new FormData();
        formData.append('file', file);
        const headers = {'Content-Type': 'multipart/form-data'};
        fetch('http://localhost:8080/uploadFile', {
          method: 'POST',
          headers: {}
              .then((res) => {
                if (res.status === 200) {
                  this.fileKeys.set(fileKeyKey, res.data)
                }
                this.contractFileKey = res.data;
              })
        })
      },
      publishTender() {
        fetch(API_BASE_URL+'/tenders', {
          method: 'POST',
          "name": this.name,
          "nationalRegNumber": this.nationalRegNumber,
          "countryId": this.countryId,
          "townCity": this.townCity,
          "contactPersonName": this.contactPersonName,
          "contactPersonSurname": this.contactPersonSurname,
          "phoneNumber": this.phoneNumber,
          "cvpCodeId": this.cvpCodeId,
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
          "deadForSinging": this.deadForSinging ? new Date(this.deadForSinging).getTime() : null,

          headers: getHeaders(),
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

</script>

<style scoped>
@import "@/styles/main.css";
.publish-button {
  max-width: 20%;
  float: right;
  background-color: #27aae1;
  color: #ffffff;
  padding: 0.875rem 1.25rem;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  cursor: pointer;
  height: 2.5rem;
}

.cancel-button {
  max-width: 20%;
  float: right;
  background-color: #ffffff;
  color: #27aae1;
  padding: 0.875rem 1.25rem;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  cursor: pointer;
  height: 2.5rem;
  border-color: #27aae1;
}

.tender-form {
  border-radius: 0.838rem;
  padding-left: 5%;
  padding-right: 1%;
  background-color: #ffffff;
  border: 0.063rem solid #ffffff;
}

.tender-form-title {
  font-size: 1.363rem;
  color: #ffffff;
}

.tender-form-header-container {
  height: 10.68rem;
  max-width: 101.2%;
  margin-left: -0.5rem;
  margin-top: 5.125rem;
  border-color: #ffffff;
  background-color: #27aae1;
}

.input-container{
  margin: 1%;
  max-width: 50%;
  min-width:30%;
  height: 8rem;
  float: left;
  width: 33%;
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

select{
  margin-top: 1rem;
  border-radius: 7px;
  border: 0.063rem solid #ccc;
  background-color: white;
  float: left;
  height: 2.5rem;
  width: 100%;
  display: flex;
  box-sizing: border-box;
}

.upload-input{
  margin: 0;
  border-radius: 0.438rem;
  border: 1px solid #ccc;
  float: left;
  height: 2.5rem;
  display: flex;
  box-sizing: border-box;
  width: 70%;
}

::file-selector-button {
  display: none;
}

input, label {
  display:flex;
}

.upload-button {
  float: left;
  margin: 0;
  width: 20%;
  height: 2.5rem;
  margin-left: 4%;
  background-color: #ffffff;
  color: #27aae1;
  cursor: pointer;
  border-color: #27aae1;
}

label {
  color: #646b70;
  margin-bottom: 0.25rem;
}

.asterix {
  font-size: 0.625rem;
  padding: 0.125rem;
}

h2{
  color: #444a4f;
}

.file-upload-container{
  margin: 1%;
  width: 100%;
  display: flex;
  height: 5rem;
}

</style>

