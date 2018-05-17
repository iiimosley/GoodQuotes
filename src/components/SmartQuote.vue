<template>
<div id="smartContainer">
  <div id="smartSearch">
    <textarea v-model="content"></textarea>
    <button @click="watsonPost()">{{msg}}</button>
  </div>
  <div class="output" v-if="smartRtn">
    <Quote :quote="output.quote" :author="output.author" :title="output.publication" ></Quote>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import randInt from '../services/randomNum';
import Quote from './partials/Quote';

export default {
  name: 'Home',
  data() {
    return {
      msg: "SmartQuote",
      content: '',
      smartRtn: false,
      output: {},
    };
  },
  components: {Quote},
  methods: {
    watsonPost() {
      axios.post(`${this.$store.state.devEnv}/smart`, { uid: this.$store.state.currentUser })
      .then(res=>{
        // console.log(res.data.keywords[randInt(res.data.keywords.length)].text.split(' ')[0]);
        axios.get(`${this.$store.state.devEnv}/tag/${res.data.keywords[randInt(res.data.keywords.length)].text.split(' ')[0]}`)
        .then(smartQs => {
            this.smartRtn = true
            this.output = smartQs.data.quotes[randInt(smartQs.data.quotes.length)];
        })
      }).catch(err=>console.log(err.response.data.msg));
      // .then(res => axios.get(`${this.$store.state.devEnv}/tag/${res.data.keywords[randInt(res.data.keywords.length)].text}`))
      // .then(smartQs => {
      //     this.smartRtn = true
      //     this.output = smartQs.data.quotes[randInt(smartQs.data.quotes.length)];
      //   })
      // .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
#smartContainer {
  max-width: 420px;
  margin: 1em auto;
}

#smartSearch{
  width: 95%;
  margin: auto;
  border: 1px solid black;
}
#smartSearch>*{
  display: block;
  margin: 1em auto;
}
#smartSearch>textarea {
  width: 90%;
  height: 140px;
}

.output {
  width: 70%;
  margin: 2em auto;
  text-align: center;
}

</style>