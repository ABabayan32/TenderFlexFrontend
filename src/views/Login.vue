
<script>
export default {
  data(){
    return {
      login: '',
      password: ''
    }
  }
}

</script>

<template>

  <div>
    <p>Log in to proceed</p>
    <input v-model="login" placeholder="login" />
    <input type="password" v-model="password" placeholder="password" />
    <button @click="">Login</button>
  </div>
</template>
