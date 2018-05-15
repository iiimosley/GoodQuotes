<template>
<div>
<form @submit.prevent="login()">
  <input type="text" placeholder="email" v-model="this.account.email">
  <input type="password" placeholder="password" v-model="this.account.password">
  <button type="submit">Login</button>
</form>
</div>
</template>

<script> 

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
      this.$store.dispatch("login", {
        email: this.account.email,
        password: this.account.password
      }).then(res => {
        this.$router.push('/');
      })
    }
  },
}

</script>

<style scoped>



</style>