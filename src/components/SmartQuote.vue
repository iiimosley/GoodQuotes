<template>
<div id="smartContainer">
  <div id="smartSearch">
    <p>powered by:</p>
    <img src="../assets/watson.png" />
    <button @click="watsonPost()">{{msg}}</button>
  </div>
  <div class="output" v-if="smartRtn">
    <Quote id="smartQ" :quote="output.quote" :author="output.author" :title="output.publication" ></Quote>
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
        axios.get(`${this.$store.state.devEnv}/tag/${res.data.keywords[randInt(res.data.keywords.length)].text.split(' ')[0]}`)
        .then(smartQs => {
            this.smartRtn = true
            this.output = smartQs.data.quotes[randInt(smartQs.data.quotes.length)];
        })
      }).catch(err=>console.log(err.response.data.msg));
    }
  }
};
</script>

<style scoped>
#smartContainer {
  max-width: 700px;
  margin: 1em auto;
}

#smartSearch{
  width: 95%;
  margin: auto;
  border: 1px solid black;
}
#smartSearch>button{
  display: block;
  margin: 1em auto;
}

#smartSearch>img {
  display: block;
  margin: auto;
  width: 80%;
  height: auto;
}

#smartSearch>p {
  margin: .2em 0 0 1.3em;
}

.output {
  margin: 2em auto;
  text-align: center;
}

#smartQ {
  width: 80%;
}

</style>