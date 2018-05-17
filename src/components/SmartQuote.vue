<template>
<div id="smartContainer">
  <div id="smartSearch">
    <div id="ibmAd">
      <p>Powered by:</p>
      <img src="../assets/watson.png" />
    </div>
    <button id="smartBtn" @click="watsonPost()">{{msg}}</button>
  </div>
  <div class="output" v-if="smartRtn">
    <Quote id="smartQ" :quote="output.quote" :author="output.author" :title="output.publication" ></Quote>
  </div>
  <p id="smartErr" if="error">{{errorMsg}}</p>
</div>
</template>

<script>
import axios from 'axios';
import randInt from '../services/randomNum';
import Quote from './partials/Quote';
import Btn from './partials/Btn';

export default {
  name: 'Home',
  data() {
    return {
      msg: "SmartQuote",
      content: '',
      smartRtn: false,
      output: {},
      error: false,
      errorMsg: ''
    };
  },
  components: {Quote, Btn},
  methods: {
    watsonPost() {
      console.log('hittinhg it');
      axios.post(`${this.$store.state.devEnv}/smart`, { uid: this.$store.state.currentUser })
      .then(res=>{
        this.error = false;
        axios.get(`${this.$store.state.devEnv}/tag/${res.data.keywords[randInt(res.data.keywords.length)].text.split(' ')[0]}`)
        .then(smartQs => {
            this.smartRtn = true
            this.output = smartQs.data.quotes[randInt(smartQs.data.quotes.length)];
        })
      }).catch(err=> {
        this.error = true;
        this.errorMsg = err.response.data.msg;
      });
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
  margin: 2em auto;
  /* border: 1px solid black; */
}

#ibmAd {
  margin: .5em auto;
  width: 70%;
}

#ibmAd>img {
  display: block;
  margin: auto;
  width: 80%;
  height: auto;
}

#ibmAd>p {
  margin: .2em 0 .4em 1.3em;
}

.output {
  margin: 2em auto;
  text-align: center;
}

#smartQ {
  width: 85%;
  padding-top: 2.1em;
  font-size: 1.2em;
}

#smartErr {
  color: red;
  text-align: center;
}

#smartBtn {
    display: block;
    border: none;
    margin: 2em auto;
    padding: .3em 1.2em;
    font: inherit;
    font-size: 1.2em;
    text-align: center;
    letter-spacing: .2em;
    cursor: pointer;
    outline: none;
    border: 1px solid black;
    border-radius: .3em;
    box-shadow: 0 0.3em;
    transform: translateY(-0.3em);
    transition: all .2s;
}
#smartBtn:hover {
    box-shadow: 0 0.2em black;
    transform: translateY(-0.2em);
}
#smartBtn:active{
    box-shadow: 0 .1em .2em black;
    transform: translateY(-0.03em);
}



</style>