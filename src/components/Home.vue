<template>
<div id="homeContainer" v-if="!loading">
  <div id="introWrap">
    <p>GoodQuotes is RESTful API constructed from GoodReads search engine. This API is open to the public and free to use (no API key required). For documentation on how to use the api, please visit the <a href="/#/developer">Developer</a> page.</p> 
    <p id="p__align" v-if="!isLoggedIn">For access to searching and saving your favorite quotes,<br>please <a href="#/login">log in</a> or <a href="#/register">register</a></p>
  </div>
<div>
  <transition name="fade" mode="out-in">
  <Quote id="homeQuote" :quote="quote.quote" :author="quote.author" :title="quote.title"/>
  </transition>
</div>
</div>
</template>

<script>
import axios from 'axios';
import randNum from '../services/randomNum';
import Quote from './partials/Quote';
import Vuex from 'vuex'

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
      axios.get(`https://goodquotesapi.herokuapp.com/tag/${this.tags[randNum(this.tags.length)]}`)
        .then((res) => {
          this.quote = res.data.quotes[randNum(res.data.quotes.length)];
          this.loading = false;
        })
        .catch(e => this.errors.push(e));
    },
  },
  computed: {
    ...Vuex.mapGetters(["isLoggedIn"])
  },
};
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#introWrap{
  width: 40%;
  margin: 5em auto;
  font-size: 1.2em;
  line-height: 1.8em;
}

#homeQuote {
  font-size: 1.3em;
}

#p__align {
  text-align: center;
}

</style>
