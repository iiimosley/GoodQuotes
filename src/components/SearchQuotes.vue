<template>
<div>
  <div id="searchContainer">
    <div id="searchSelect">
      <span v-for="(btn,i) in searchBtn" :key="`radio${i}`">
        <input type="radio" :value="btn" v-model="checked" @click="toggleSearch()"/>
        <label for="btn">{{btn}}</label>
      </span>
    </div>
    <input id="searchbar" type="text" :placeholder="searchMsg" v-model="searchContent" @keyup.enter="searchQuote()"/>
    <p v-if="!radioSelected">Please select a search category</p>
  </div>
  <div v-if="searchReturn">
    <Quote v-for="(qu, i) in quotes" :key="i" :quote="qu.quote" :author="qu.author" :title="qu.publication" >
    </Quote>
  </div>
  <div id="errMsg" v-if="errMsg">Could not retreive any {{checked}} results for "{{searchContent}}"</div>
</div>
</template>

<script>
import axios from 'axios';
import Quote from './partials/Quote';

export default {
  name: 'SearchQuotes',
  data() {
    return {
      searchContent: '',
      searchMsg: 'Search for a quote',
      searchBtn: ['tag','author','title'],
      checked: '',
      radioSelected: true,
      searchReturn: false,
      errMsg: false,
      quotes: [],
      quoteData: ''
    }
  },
  components: {Quote},
  methods: {
    toggleSearch() {
      this.radioSelected = true;
    },
    searchQuote() {
      if (this.checked) {
        let searchField = this.searchContent.toLowerCase().replace(/\s/g, '+');
        axios.get(`${this.$store.state.devEnv}/${this.checked}/${searchField}`)
        .then((res) => {
          this.errMsg = false;
          this.quotes = res.data.quotes;
          this.quoteData = res.data;
          this.searchReturn = true;
          if (this.checked === 'tag'){
            console.log(this.$store.state);
            axios.post(`${this.$store.state.devEnv}/user-tag`, {
              uid: +this.$store.state.currentUser,
              tag: this.searchContent
            })
          }
        })
        .catch(e => {
          this.searchReturn = false;
          this.errMsg = true;
        });
       } else { 
         this.radioSelected = false;
       }
    }
  },
  watch: {
    searchContent() {
      if (!this.searchContent) {
          this.searchReturn = false;
          this.errMsg = false;
        };
    },
    checked(){
      this.errMsg = false;
    }
  }
};

</script>

<style scoped>

#searchContainer {
  display: block;
  margin: 2em auto;
  max-width: 400px;
}

#searchbar {
  display: inline-block;
  width: 100%;
  margin: 1em auto;
  font-size: 1em;
  padding: .1em;
  text-align: center;
  outline: none;
  transition: all .1s; 
}

#searchbar:focus{
  box-shadow: 0 0 1em dodgerblue;
}

#searchSelect{
  display: flex;
  justify-content: space-between;
  max-width: 70%;
  margin: auto
}

#searchContainer>p{
  color: red;
  text-align: center
}

#errMsg {
  text-align: center;
}

</style>
