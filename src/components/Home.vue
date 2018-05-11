<template>
<div  v-if="!loading">
  <h3>{{msg}}</h3>
  <Quote :quote="quote.quote" :author="quote.author" :title="quote.title"/>
</div>
</template>

<script>
import axios from 'axios';
import randNum from '../services/randomNum';
import Quote from './partials/Quote';


export default {
  name: 'Home',
  data() {
    return {
      msg: 'GoodQuotes',
      tags: ['wisdom', 'creativity', 'ingenuity', 'aspiration'],
      loading: true,
      quote: null,
    };
  },
  components: {Quote},
  created() {
    this.getQuote();
  },
  methods: {
    getQuote: function() {
      axios.get(`${location.origin}/tag/${this.tags[randNum(this.tags.length)]}`)
        .then((res) => {
          this.quote = res.data.quotes[randNum(res.data.quotes.length)];
          this.loading = false;
        })
        .catch(e => this.errors.push(e));
    },
  },
};
</script>

<style scoped>
#quote{
  width: 50%;
  margin: 2em auto;
}
p:nth-child(2) {
  text-align: right;
}
</style>
