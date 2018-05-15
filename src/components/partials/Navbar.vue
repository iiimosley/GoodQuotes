<template>
<div>
  <h1>{{header}}</h1>
  <ul>
    <li v-for="(link, index) in links" :key="index">
      <a :href="link.url">{{link.text}}</a>
    </li>
    <li v-if="!user">
      <a href="#/login">Login</a>
    </li>
    <li v-if="!user">
      <a href="#/register">Register</a>
    </li>
    <li v-if="user">
      <a href="#/logout">Logout</a>
    </li>
  </ul>
</div>
</template>

<script>
import App from '../../App';

export default {
  name: 'Navbar',
  props: ['user'],
  data() {
    return {
      header: 'GoodQuotes',
      links: [{
        url: '#/',
        text: 'Home',
      },
      {
        url: '#/search',
        text: 'SearchQuote',
      },
      // {
      //   url: '#/smartquote',
      //   text: 'SmartQuote',
      // },
      {
        url: '#/developer',
        text: 'Developer',
      },
      ],
    };
  },
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
  /* max-width: 80%; */
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
