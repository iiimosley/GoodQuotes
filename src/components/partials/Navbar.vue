<template>
<div>
  <h1>{{header}}</h1>
  <ul>
    <li v-for="(link, i) in links" :key="`link${i}`">
      <a :href="link.url">{{link.text}}</a>
    </li>
    <li v-if="!currentUser" v-for="(link, i) in publicLinks" :key="`public${i}`">
      <a :href="link.url">{{link.text}}</a>
    </li>
    <li v-if="currentUser" v-for="(link, i) in authLinks" :key="`auth${i}`">
      <a :href="link.url">{{link.text}}</a>
    </li>
    <li v-if="currentUser">
      <a href="#/" @click="logout">Logout</a>
    </li>
  </ul>
</div>
</template>

<script>
import App from '../../App';
import Vuex from 'vuex'


export default {
  name: 'Navbar',
  data() {
    return {
      header: 'GoodQuotes',
      links: [{
          url: '#/',
          text: 'Home',
        },
        {
          url: '#/developer',
          text: 'Developer',
        }],
      authLinks: [
        {
          url: '#/search',
          text: 'SearchQuote',
        },
        {
          url: '#/smartquote',
          text: 'SmartQuote',
        }],
      publicLinks: [
        {
          url: '#/login',
          text: 'Login',
        },
        {
          url: '#/register',
          text: 'Register',
        }],
    };
  },
  methods: {
    ...Vuex.mapActions(["logout"])
  },
  computed: {
    ...Vuex.mapGetters(["isLoggedIn", "currentUser"])
  }
};

</script>

<style scoped>
div {
  background: rgb(0, 13, 51);
  color: whitesmoke;
}

h1 {
  text-align: center;
  letter-spacing: .1em;
  margin: 0;
  padding: .8em;
}

a {
  text-decoration: none;
  color: inherit;
  transition: all .18s;
}

ul {
  display: flex;
  margin: 1em auto;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 1em;
}

li {
  display: inline-block;
  width: 20%;
  text-align: center
}

a:hover {
  color: bisque;
  letter-spacing: .1em;
  text-shadow: 0 0 .1em whitesmoke;
}


</style>
