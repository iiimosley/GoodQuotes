<template>
<div>
<form @submit.prevent="login()">
  <input type="text" placeholder="email" v-model="account.email">
  <input type="password" placeholder="password" v-model="account.password">
  <button type="submit">Login</button>
</form>
</div>
</template>

<script> 

import axios from 'axios';

export default {
  data() {
    return {
      account: {
        email: '',
        password: ''
      },
      error: false
    }
  },
  methods: {
    login() {
      axios.post(`http://localhost:8080/login`, this.account, {
      headers: {'Content-Type': 'application/json'}})
      .then(user=> console.log(user.data.id));
        // this.$store.dispatch("login", {
        //   email: this.account.email,
        //   password: this.account.password
        // }).then(res => {
        //   this.$router.push('/');
        // })
    }
  },
}

</script>

<style scoped>

form {
  max-width: 250px;
  margin: 3em auto;
}

form>*{
  display: block;
  width: 100%;
  margin: 1em auto;
}


</style>