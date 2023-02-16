
<script>

export default {
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    onLogin() {
      fetch('http://localhost:8080/login', {
            method: 'POST',
            node: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'},
            params: { username: this.login, password: this.password
            }
          })
          .then((response) => {
              this.$cookie.set('access_token', response.data['access_token']);
              if (response.data['role'] != null) {
                this.$cookie.set('role', response.data['role']);

              }
  }) } }
}
</script>

<template>

  <div>
    <p>Log in to proceed</p>
    <input v-model="login" placeholder="login" />
    <input type="password" v-model="password" placeholder="password" />
    <button @click="onLogin">Login</button>
  </div>
</template>
