<template>
  <div id="myQuotes">
    <Quote v-for="(qu, i) in quotes" :key="`userQuote${i}`" :qid="qu.id" :quote="qu[`Quote.content`]" :author="qu[`Quote.author`]" >
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
      // console.log('quote-id', +e.path[2].attributes.qid.value, 'user', this.$store.state.currentUser);
      // console.log('quote', e.path[2].firstChild.innerText);
        axios.post(`${this.$store.state.devEnv}/user-quote/${+e.path[2].attributes.qid.value}?_method=DELETE`, {
          uid: +this.$store.state.currentUser
        }).then(rmQ=> {
          this.$store.commit('rmQuote', e.path[3].children[0].innerText);
          e.path[0].src = 'dist/star.png';
        })
    }
  },
}
</script>

<style scoped>

  #myQuotes {
    margin: 2em auto;
  }

</style>
