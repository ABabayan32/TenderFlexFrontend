<template>
  <div class="tender-form-header-container">

  </div>
  <div  style="margin-top: -155px;width: 60%;
    margin-left: 20%;">
    <div class="tender-form-title">
      <h1> Tender description </h1>
    </div >
      <h2>Contractor</h2>
        <div class="rectangle" >
      <div  >
      <label>  Official Name: </label>
        <div> {{this.tender.name}} </div>
        <label class="form"> Country: </label>
        <div > {{this.tender.countryId}} </div>
        <label>National Registration Number: </label>
        <div > {{this.tender.nationalRegNumber}} </div>
        <label class="form">City/Town: </label>
        <div > {{this.tender.townCity}} </div>
      </div> </div>
    <h3>Contact person</h3>
        <div class="rectangle">
      <label> Name: </label>
      <div> {{this.tender.contactPersonName}} </div>
      <label> Surname: </label>
      <div> {{this.tender.contactPersonSurname}} </div>
      <label> Phone Number:</label>
      <div> {{this.tender.phoneNumber}} </div>
    </div>

    <h4>Procedure</h4>
        <div class="rectangle">
    <label> Procedure: </label>
    <div> {{this.tender.name}} </div>
    <label> Language: </label>
    <div> {{"English"}} </div>
        </div>
      <h5>Subject matter of the procurement</h5>
        <div class="bigRectangle">
      <label> CPV Code: </label>
      <div> {{this.tender.cvpCodeId}} </div>
      <label> Type of tender:</label>
      <div> {{this.tender.tenderTypeId}} </div>
      <label>Min Tender Value: </label>
      <div> {{this.tender.minValue}} </div>
      <label>Max Tender Value: </label>
      <div> {{this.tender.maxValue}} </div>
      <label> Currency: </label>
      <div> {{this.tender.currencyId}} </div>
      <label> Description: </label>
      <div> {{" "}} </div>
    </div>

      <h6> Date</h6>
        <div class="rectangle">
    <label> Publication Date: </label>
    <div> {{this. formatDate(tender['publicDate'])}} </div>
    <label> Deadline for Offer Submission: </label>
    <div> {{this.formatDate(tender['deadLineOfSub'])}} </div>
    <label> Deadline for Signed Contract Submission: </label>
    <div> {{this.formatDate(tender['DeadForSinging'])}} </div>
     </div>
      <h7>Documents</h7>
        <div>
    </div>
   </div>

 </template>

<script>
export default {
  name: "TenderDescription",
  props:['tender'],
  data() {
      return {
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

      }
      },
  methods:{
    formatDate(miliseconds) {
      let d = new Date(miliseconds);
      return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
          d.getFullYear() ;

    },
  }
}
</script>

<style scoped>
.tender-form {
  border-radius: 0.438rem;
  padding-left: 5%;
  padding-right: 1%;
  background-color: #ffffff;
  border: 0.063rem solid #ffffff;
}
.tender-form-header-container {
  height: 10.68rem;
  max-width: 100%;
  margin-left: -0.5rem;
  margin-top: 5.125rem;
  border-color: #ffffff;
  background-color: #27aae1;
}
.tender-form-title {
  font-size: 1.363rem;
  color: #ffffff;
}
.form{
  height: 1.68rem;
  min-width: 50%;
  border-color: #ffffff;
  background-color: #ffffff;
  float: right;
  margin-bottom: 0.68rem;
}
.rectangle {
  height: 6.68rem;
  max-width: 101%;
  background-color: #fcfafa;
  border-color: #ffffff;

}
.bigRectangle{
  height: 13.68rem;
  max-width: 101%;
  background-color: #fcfafa;

}
label {
  color: #646b70;
  margin-bottom: 5px;

}


</style>