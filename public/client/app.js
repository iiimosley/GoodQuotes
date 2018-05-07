'use strict';

// const axios = require('axios');

let resQuotes = [];

// const resQuotes = () => axios.get(`/tag/wisdom`);

fetch(`/tag/wisdom`)
.then(res => res.ok ? res.json() : Promise.reject(Error('error')))
.then(data => data.quotes.forEach(quote => resQuotes.push(quote)));

// Vue.config.devtools = true
// console.log(getQuotes().then(allQuotes => allQuotes.quotes));


Vue.component('pizza', {
  props: ['stuff'],
  template: `<p>{{ stuff }}</p>`,
});

Vue.component('quoteTemplate', {
  template: '#quoteLine',
  props: ['statement']
})

new Vue({
  el: '#app',
  data() {
    return {
      isShown: true,
      message: 'i looooove peppy zaaaas',
      quotes: resQuotes,
    };
  },
  methods: {
    toggle() {
      this.isShown = !this.isShown;
    },
  },
});
