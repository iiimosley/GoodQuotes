<template>
<div>
  <div id="searchContainer">
    <input id="searchbar" type="text" :placeholder="searchMsg" v-model="searchContent" @keyup.enter="searchQuote()"/>
  <div id="searchSelect">
    <span v-for="(btn,i) in searchBtn" :key="`radio${i}`">
      <input type="radio" :value="btn" v-model="checked" />
      <label for="btn">{{btn}}</label>
    </span>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchQuotes',
  data() {
    return {
      searchContent: '',
      searchMsg: 'Search for a quote',
      searchBtn: ['tag','author','title'],
      checked: '',
    }
  },
  methods: {
    toggleSearch() {
      console.log(this);
    },
    searchQuote() {
      if (this.checked) ? 
      axios.get(`http://localhost:8081/${this.checked}/${this.searchContent}}`)
        .then((res) => {

        })
        .catch(e => this.errors.push(e));
      : console.log('noooope')
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

</style>
