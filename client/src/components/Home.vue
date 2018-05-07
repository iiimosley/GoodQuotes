<template>
<div  v-if="!loading">
  <h3>{{msg}}</h3>
  <div id='quote'>
    <p>{{quote.quote}}</p>
    <p> -- {{quote.author}} <span>{{quote.title}}</span></p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import randNum from '../services/randomNum';

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
  created() {
    this.getQuote();
  },
  methods: {
    getQuote: function() {
      axios.get(`http://localhost:8081/tag/${this.tags[randNum(this.tags.length)]}`)
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
