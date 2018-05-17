<template>
<div id="registerForm">
  <div>
  <label for="regEmail">Email</label>
  <input type="text" v-model="account.email" id="regEmail"/>
  </div>
  <div>
  <label for="regPassword">Password</label>
  <input type="text" v-model="account.password" id="regPassword"/>
  </div>
  <div>
  <label for="regPasswordConfirm">Confirm</label>
  <input type="text" v-model="account.confirm" id="regPasswordConfirm"/>
  </div>
  <button @click="submitUser()">Register</button>
  <p id="regErr" v-if="error">{{errMsg}}</p>
</div>
</template>

<script> 

import axios from 'axios';
import router from '../router';

export default {
  name: 'Register',
  props: ['user', 'auth'],
  data() {
    return {
      account: {
        email: '',
        password: '',
        confirm: ''
      },
      error: false,
      errMsg: ''
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
  margin: 3em auto;
}

button {
  display: block;  
  margin: 1em auto; 
}

#regErr {
  color: red;
}


</style>