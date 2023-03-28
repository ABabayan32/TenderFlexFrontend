

<script>
import {getAuthenticatedHeaders,logout} from "@/utils";
import {API_BASE_URL} from "@/const_config.js";

export default {
  emits: ['tendersOpen', 'offersOpen', 'newTenderOpen'],
  props: {
    class: null,
    urlForTendersCount: null,
    urlForOffersCount: null,
  },
  data()  {

    return {
      page: 0,
      tenderCount: 0,
      offerCount: 0,
    }
  },
  async beforeMount() {
    try { this.tenderCount = await fetch(API_BASE_URL + this.urlForTendersCount,{
      method: 'GET',
      node: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: getAuthenticatedHeaders(),
    })
        .then((response) => {
              if (response.ok) {
                return response.json()
              } else if(response.status === 401 || response.status === 403){
                logout()
                return null;
              }
            })
        .then(response=>
    {
      return response;
    });
    this.offerCount = await fetch(API_BASE_URL + this.urlForOffersCount,{
      method: 'GET',
          node: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: getAuthenticatedHeaders(),
    })

        .then((response) => {
          if (response.ok) {
            return response.json()
          } else if(response.status === 401 || response.status === 403){
            logout();
          }
        }
        )
        .then(response=>
        {
          return response;
        });} catch (error) {
      console.error(error);
    }
  },
  methods: {

    onLogout () {
      logout();
    } ,

    notifyTendersOpen() {
      this.$emit("tendersOpen", true);
    },
    notifyOffersOpen() {
      this.$emit("offersOpen", true);
    },
    onCreateNewTender() {

      this.$emit("newTenderOpen", true);
    }
  }
}
 </script>

<template >
  <header>
  </header>
  <div class="header">
    <div class="icon-container">
      <div class='tender-flex-icon header-icon'></div>
    </div>

    <div class="view-change-button-container">
      <button @click="notifyTendersOpen" class="view-change-button">
        <v-icon class="button-icon" icon="fa fa-heartbeat"></v-icon>
        Tenders <span class="available-count">{{tenderCount}}</span></button> </div>

    <div class="view-change-button-container">
      <button @click="notifyOffersOpen" class="view-change-button">
        <v-icon class="button-icon" icon="fa fa-message" ></v-icon>
        Offers<span class="available-count">{{offerCount}}</span> </button></div>

    <div class="exit-button-container">
      <button @click="onLogout" class="exit-button">
        <v-icon class="button-icon" icon="fa fa-sign-out" /></button>
    </div>

    <div  @click="onCreateNewTender" class="view-change-button-container" v-if="this.$cookies.get('role')==='CONTRACTOR'">
      <button class="view-change-button create-button"><v-icon class="create-button-icon"  icon="fa fa-plus" />CREATE NEW TENDER</button>
    </div>
  </div>




</template>

<style>

.button-icon{
  margin-left: 1rem;
  margin-right: 1rem;
}

.tender-flex-icon {
  background: url('@/assets/icons/logo.png');
  display: flex;
  background-size: 18.75rem;
  width: 18.75rem;
  height: 3.6875rem;
  border:  #ffffff;
}
.header {
  padding: 0.625rem 1rem;
  background-color: #27aae1;
  color: #f1f1f1;
  position: fixed;
  top: 0;
  min-width: 100%;
  left: 0;
}

.header-icon {
  display: flex;
  border-radius: 0.9375rem;
  border: 0.0625rem solid;
  background-color: #ffffff;
}

.icon-container {
  display: flex;
  float: left;
}

.view-change-button {
  display: flex;
  background-color: #0a50ad;
  font-size: 1.25rem;
  cursor: pointer;
  max-width: 15rem;
  min-width: 12rem;
  padding: 0.25rem;
  margin-top: 1.2375rem;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #0a50ad;
}

.view-change-button-container {
  background-color: #27aae1;
  display: flex;
  float: left;
  max-width: 15rem;
  min-width: 12rem;
  height: 3.99rem;
  margin-top: -0.625rem;
  margin-left: 2rem;
}

.view-change-button:hover {
  background-color: #073470;
  border-radius: 0.95rem;
  border: 0.0625rem solid #073470;
}

.create-button {
  font-size: 1rem !important;
  margin-left: 18rem;
  max-width: 20rem;
  min-width: 15rem;
  padding: .5rem;
}

.create-button-icon {
   min-width: 2rem;
  margin-right: .3rem;
}

.exit-button-container {
  background-color: #27aae1;
  display: flex;
  float: right;
  margin-right: 0.9375rem;
  max-width: 6rem;
  min-width: 5rem;
  margin-top: .3rem;
  height: 3rem;
  margin-left: 0.625rem;
}

.exit-button {
  font-size: 1.2rem;

}

.exit-button:hover {
  background-color: #068ac2;
  border-radius: 0.9375rem;
  border: 1px solid #068ac2;
}

.available-count {
  margin-left: 0.7rem;
  display: flex;
  background-color: #51da47;
  border-radius: 1rem;
  border: none;
  min-width: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

}
</style>


