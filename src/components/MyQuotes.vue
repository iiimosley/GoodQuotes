<template>
  <div id="myQuotes">
    <Quote v-for="(qu, i) in quotes" :key="`userQuote${i}`" :qid="qu.quote_id" :quote="qu[`Quote.content`]" :author="qu[`Quote.author`]" >
      <button @click="deleteQuote"><img src="dist/chip.png"></button>
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
      // console.log('quote-id', +e.path[3].attributes.qid.value, 'user', this.$store.state.currentUser);
      // console.log('quote', e.path[3].firstChild.innerText);
      axios.post(`${this.$store.state.devEnv}/user-quote/${+e.path[3].attributes.qid.value}?_method=DELETE`, {
        uid: +this.$store.state.currentUser
      }).then(rmQ=> {
        this.$store.commit('rmQuote', e.path[3].firstChild.innerText);
        e.path[3].parentNode.removeChild(e.path[3]);
      })
    }
  },
}
</script>

<style scoped>

  #myQuotes {
    margin: 2em auto;
  }

  button {
  width: 40px;
  height: auto;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

button>img{
  width: 50%;
  height: auto;
}

</style>
