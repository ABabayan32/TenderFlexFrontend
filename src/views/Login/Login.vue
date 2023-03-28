
<script>
import router from "@/router";
import {getHeaders} from "@/utils";
import {API_BASE_URL} from "@/const_config.js";
export default {
  data() {
    return {
      validations:{},
      login: '',
      password: ''
    }
  },
  async beforeMount() {
    if(this.$cookies.get('access_token') && this.$cookies.get('role')){
      if (this.$cookies.get('role') === 'CONTRACTOR') {
        router.replace("/contractor-home");
      } else {
        router.replace("/bidder-home");
      }
    }
  },
  methods: {
    Login() {
      if(!this.login || !this.password){
        this.validations = {
          isNoLogin: !this.login,
          isNoPassword: !this.password
        }
      } else {
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
               return response.json()
              }
              if (response.status === 401) {
                this.validations = {
                  isNoLogin: true,
                  isNoPassword: true
                }
                return null
              }
            }).then(resp=>{
              if(resp){
                this.$cookies.set('access_token', resp['access_token']);
                this.$cookies.set('role', resp['role']);
                if (resp['role'] === 'CONTRACTOR') {
                  router.replace("/contractor-home");
                } else {
                  router.replace("/bidder-home");
                }
              }
          })
      }
    }
  }
}
</script>



<template>
  <div class="background-gray">
  <span class='login-icon tender-flex-icon'></span>
  <div class="rcorners1 login-form" style="background-color: #ffffff">
    <p>Log in to proceed</p>
    <input @change="validations.isNoLogin = (validations.isNoLogin ? !login : validations.isNoLogin)"
           :class="{ invalid: validations.isNoLogin }" class="rcorners1" v-model="login" placeholder="Username" />
    <input @change="validations.isNoPassword = (validations.isNoPassword ? !password : validations.isNoPassword)"
           :class="{ invalid: validations.isNoPassword }" class="rcorners1" type="password" v-model="password" placeholder="Password" />
    <button class="rcorners1 login-button" @click="Login" >LOG IN</button>
  </div>
  </div>
</template>

<style scoped>
@import "@/styles/main.css";
.background-gray {
  background-color: #72c5e8;
}
.login-form {
  position: fixed;
  top: 26%;
  left: 36%;
  height: 24rem;
  min-width: 24rem;
}

.login-button {
  min-width: 90%;
  background-color: rgb(67, 133, 190);
  color: #ffffff;
  padding: 0.875rem 1.25rem;
  margin: 5%;
  cursor: pointer;
  height: 3.75rem;
}

input {
  height: 60px;
  width: 90%;
  padding: 0.75rem 1.25rem;
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
  border: 0.0625rem solid #ffffff;
}

.invalid {
  border: 0.063rem solid #ea1d1d !important;
}

.invalid::placeholder {
  color: #ea1d1d;
}
</style>
