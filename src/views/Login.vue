
<script>
import router from "@/router";
import {getHeaders} from "@/static_functions";

export default {
  data() {
    return {
      login: '',
      password: ''
    }
  },

  methods: {

    Login() {
      let details = {
        'username': this.login,
        'password': this.password,
      };

      let formBody = [];
      for (let property in details) {
        let encodedKey = property;
        let encodedValue = details[property];
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('http://localhost:8080/login?'+formBody, {
            method: 'POST',
            node: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: getHeaders(),
          })
          .then((response) => {
            if (response.ok) {
             return response.json()}}
          ).then(resp=>{
              this.$cookies.set('access_token', resp['access_token']);
              if (resp['role'] != null) {
                this.$cookies.set('role', resp['role']);
                router.replace("/contractorHome");
              }
  }) } }
}
</script>



<template>

  <span class='loginIcon tenderFlexIcon'></span>
  <div class="rcorners1 loginForm" style="background-color: white">
    <p>Log in to proceed</p>
    <input class="rcorners1" v-model="login" placeholder="login" />
    <input class="rcorners1" type="password" v-model="password" placeholder="password" />
    <button class="rcorners1 loginButton" @click="Login">Login</button>
  </div>

</template>

<style scoped>
@import "@/styles/main.css";
@import "@/styles/login.css";
</style>
