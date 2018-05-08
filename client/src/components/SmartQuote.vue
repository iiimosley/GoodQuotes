<template>
<div id="smartWrap">
  <textarea></textarea>
  <button>{{msg}}</button>
</div>
</template>

<script>
import axios from 'axios';
import randNum from '../services/randomNum';

export default {
  name: 'Home',
  data() {
    return {
      msg: "SmartQuote"
    };
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
#smartWrap{
  max-width: 420px;
  margin: 1em auto;
  border: 1px solid black;
}
#smartWrap>*{
  display: block;
  margin: 1em auto;
}
textarea{
  width: 90%;
  height: 140px;
}

</style>