<template>
<div id="registerForm">
  <h2>Create an Account</h2>
  <input placeholder="Email" type="text" v-model="account.email" id="regEmail"/>
  <input placeholder="Password" type="password" v-model="account.password" id="regPassword"/>
  <input placeholder="Confirm" type="password" v-model="account.confirm" id="regPasswordConfirm"/>
  <Btn id="regBtn" :title="btnName" @click="submitUser()"></Btn>
  <p id="regErr" v-if="error">{{errMsg}}</p>
</div>
</template>

<script> 

import axios from 'axios';
import router from '../router';
import Btn from './partials/Btn';

export default {
  name: 'Register',
  props: ['user', 'auth'],
  components: {Btn},
  data() {
    return {
      account: {
        email: '',
        password: '',
        confirm: ''
      },
      error: false,
      errMsg: '',
      btnName: 'Register'
    };
  },
  methods: {
    submitUser: function() {
      if (this.account.password !== this.account.confirm){
        this.error = true;
        this.errMsg = 'Current passwords do not match';
      } else {
        this.error = false;
        axios.post(`${this.$store.state.devEnv}/register`, this.account, {
          headers: {'Content-Type': 'application/json'}})
          .then(newUser => {
          this.$store.commit('authUser', newUser.data.id)
          this.$store.dispatch("login", {
            email: this.account.email,
            password: this.account.password
          }).then(res => {
            console.log(this.$store.state.currentUser);
            router.push('/');
          });
        }).catch(err => {
          this.error = true;
          this.errMsg = err.response.data.msg;
        });
      }
    },
  },
};

</script>

<style scoped>

#registerForm{
  max-width: 300px;
  margin: 5em auto;
}

h2 {
  font-family: 'Merriweather', Helvetica, sans-serif;
  font-weight: 200;
  text-align: center;
  margin: 1.4em auto;
}

#regBtn {
  margin: 2.5em auto; 
  width: 100%;
}

#regErr {
  color: red;
}

input {
  display: block;
  text-align: center;
  margin: 1em auto;
  font-size: 1.05em;
  width: 100%;
  padding: .2em;
}


</style>