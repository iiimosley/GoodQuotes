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
        axios.post(`${process.env.NODE_ENV==="development" ? 'http://localhost:8080' : ''}/register`, this.account, {
          headers: {'Content-Type': 'application/json'}})
          .then(newUser => {
            this.$store.commit('authUser', newUser.data.id)
            this.$store.dispatch("login", {
              email: this.account.email,
              password: this.account.password
            }).then(res => {
              console.log(this.$store.state.currentUser);
              this.$router.push('/');
            });
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
  margin: 1em auto; 
}


</style>