<template>
<div id="loginContainer">
<h2>Login to your Account</h2>
<form @submit.prevent="login()">
  <input type="text" placeholder="email" v-model="account.email">
  <input type="password" placeholder="password" v-model="account.password">
  <button type="submit">Login</button>
  <p id="loginErr" if="error">{{errorMsg}}</p>
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
      error: false,
      errorMsg: ''
    }
  },
  methods: {
    login() {
      axios.post(`${this.$store.state.devEnv}/login`, this.account, {
      headers: {'Content-Type': 'application/json'}})
      .then(user=> {
        this.$store.commit('authUser', user.data.id)
        this.$store.dispatch("login", {
          email: this.account.email,
          password: this.account.password
        }).then(res => {
          console.log(this.$store.state.currentUser);
          this.$router.push('/');
        });
      })
      .catch(err=> {
        this.error = true;
        this.errorMsg = err.response.data.msg;
      });
    },
  }
}

</script>

<style scoped>

#loginContainer {
  margin: 5em auto;
}

h2 {
  font-family: 'Merriweather', Helvetica, sans-serif;
  font-weight: 200;
  text-align: center;
}

form {
  max-width: 250px;
  margin: 2em auto;
}

form>*{
  display: block;
  text-align: center;
  width: 100%;
  margin: 1em auto;
}

#loginErr {
  color: red;
}

input {
  font-size: 1.05em;
  width: 100%;
  padding: .2em;
}

</style>