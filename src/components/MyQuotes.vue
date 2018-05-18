<template>
  <div id="myQuotes">
    <Quote v-for="(qu, i) in quotes" :key="`userQuote${i}`" :quote-id="qu.id" :quote="qu[`Quote.content`]" :author="qu[`Quote.author`]" >
      <button @click="deleteQuote"></button>
    </Quote>
  </div>
</template>

<script>
import axios from 'axios';
import Quote from './partials/Quote';

export default {
  name: 'MyQuotes',
  data() {
    return {
      quotes: []
    }
  },
  components: {Quote},
  beforeCreate() {
    axios.get(`${this.$store.state.devEnv}/user-quote/${+this.$store.state.currentUser}`)
    .then(matchedQuotes => {
      this.quotes = matchedQuotes.data;
    });
  },
  methods: {
    deleteQuote: function(e) {
      console.log('chip click', e);
    }
  },
}
</script>

<style scoped>

  #myQuotes {
    margin: 2em auto;
  }

</style>
