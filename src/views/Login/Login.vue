
<script>
import router from "@/router";
import {getHeaders} from "@/common_functions";
import {API_BASE_URL} from "@/const_config.js";
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
      fetch(API_BASE_URL+'/login?'+formBody, {
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

  <span class='login-icon tender-flex-icon'></span>
  <div class="rcorners1 login-form" style="background-color: white">
    <p>Log in to proceed</p>
    <input class="rcorners1" v-model="login" placeholder="login" />
    <input class="rcorners1" type="password" v-model="password" placeholder="password" />
    <button class="rcorners1 login-button" @click="Login">Login</button>
  </div>

</template>

<style scoped>
@import "@/styles/main.css";
.login-form {
  position: fixed;
  top: 26%;
  left: 36%;
  height: 400px;
  width: 400px;
}

.login-button {
  width: 90%;
  background-color: #27aae1;
  color: #ffffff;
  padding: 14px 20px;
  margin: 5%;
  cursor: pointer;
  height: 60px;
}

input {
  height: 60px;
  width: 90%;
  padding: 12px 20px;
  margin: 5%;
  display: flex;
  box-sizing: border-box;
}

p {
  text-align: center;
  margin-top: 10%;
}

.login-icon {
  position: fixed;
  top: 15%;
  left: 38%;
}

.tender-flex-icon {
  background: url('@/assets/icons/logo.png');
  display: block;
  background-size: 18.75rem;
  width: 18.75rem;
  height: 3.6875rem;
  border: 0.0625rem solid white;
}
</style>
