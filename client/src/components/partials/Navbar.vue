<template>
<div>
  <h3>{{header}}</h3>
  <ul>
    <li v-for="(link, index) in links" :key="index">
      <a :href="link.url">{{link.text}}</a>
    </li>
  </ul>
</div>
</template>

<script>

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
        url: '#/search',
        text: 'SearchQuote',
      },
      {
        url: '#/smartquote',
        text: 'SmartQuote',
      },
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
ul {
  display: flex;
  width: 60%;
  margin: 1em auto;
  justify-content: space-evenly;
  align-items: center
}

li {
  display: inline-block;
  text-decoration: none;
}
</style>
