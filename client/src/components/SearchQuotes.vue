<template>
<div>
  <div id="searchContainer">
    <input id="searchbar" type="text" :placeholder="searchMsg" v-model="searchContent" @keyup.enter="searchQuote()"/>
  <div id="searchSelect">
    <span v-for="(btn,i) in searchBtn" :key="`radio${i}`">
      <input type="radio" :value="btn" v-model="checked" @click="toggleSearch()"/>
      <label for="btn">{{btn}}</label>
    </span>
    <p v-if="!radioSelected">Please select a search category</p>
  </div>
  </div>
  <div v-if="searchReturn">
    <Quote v-for="(qu, i) in quotes" :key="i" :quote="qu.quote" :author="qu.author" :title="qu.publication" ></Quote>
  </div>
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
      quotes: []
    }
  },
  components: {Quote},
  methods: {
    toggleSearch() {
      this.radioSelected = true;
    },
    searchQuote() {
      if (this.checked) {
        axios.get(`http://localhost:8081/${this.checked}/${this.searchContent}}`)
        .then((res) => {
          this.quotes = res.data.quotes;
          console.log(this.quotes);
          // this.radioSelected = true;
          this.searchReturn = true;
        })
        .catch(e => this.errors.push(e));
       } else { 
         this.radioSelected = false;
       }
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

#searchSelect>p{
  color: red;
}

</style>
