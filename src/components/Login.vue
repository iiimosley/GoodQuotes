<template>
<div id="loginContainer">
<form @submit.prevent="login()">
  <h2>Login to your Account</h2>
  <input type="text" placeholder="email" v-model="account.email">
  <input type="password" placeholder="password" v-model="account.password">
  <button id="loginBtn" type="submit" @click="login()">{{btnName}}</button>
  <p id="loginErr" if="error">{{errorMsg}}</p>
</form>
</div>
</template>

<script> 

import axios from 'axios';
import Btn from './partials/Btn';

export default {
  components: {Btn},
  data() {
    return {
      account: {
        email: '',
        password: ''
      },
      error: false,
      errorMsg: '',
      btnName: 'Login'
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
  max-width: 300px;
  margin: 2em auto;
}

form>input{
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

#loginBtn {
    display: block;
    border: none;
    margin: 2.5em auto;
    padding: .3em 2.3em;
    font: inherit;
    font-size: 1.2em;
    text-align: center;
    letter-spacing: .2em;
    cursor: pointer;
    outline: none;
    border: 1px solid black;
    border-radius: .3em;
    box-shadow: 0 0.3em;
    transform: translateY(-0.3em);
    transition: all .2s;
}
#loginBtn:hover {
    box-shadow: 0 0.2em black;
    transform: translateY(-0.2em);
}
#loginBtn:active{
    box-shadow: 0 .1em .2em black;
    transform: translateY(-0.03em);
}

</style>