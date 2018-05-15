<template>
<div id="registerForm">
  <div>
  <label for="regUsername">Username</label>
  <input type="text" v-model="account.username" id="regUsername"/>
  </div>
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
  <p v-if="error">password does not match confirmation</p>
</div>
</template>

<script> 

import axios from 'axios';

export default {
  name: 'Register',
  props: ['user', 'auth'],
  data() {
    return {
      account: {
        username: '',
        email: '',
        password: '',
        confirm: ''
      },
      error: false
    };
  },
  methods: {
    submitUser: function() {
      if (this.account.password !== this.account.confirm){
        this.error = true;
      } else {
        this.error = false;
        // console.log(this.account);
        axios.post(`http://localhost:8080/register`, JSON.stringify(this.account), {
          headers: {'Content-Type': 'application/json'}})
          .then(thisUser => {
            console.log(this.user);
            this.user = thisUser.id;
            this.auth = true;
            router.push('Home');
        })
        .catch(e => this.errors.push(e));
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
}

</style>