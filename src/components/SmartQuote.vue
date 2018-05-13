<template>
<div id="smartContainer">
  <div id="smartSearch">
    <textarea v-model="content"></textarea>
    <button @click="watsonPost()">{{msg}}</button>
  </div>
  <div class="output">{{output}}</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      msg: "SmartQuote",
      content: '',
      output: '',
    };
  },
  methods: {
    watsonPost() {
      axios.post('http://localhost:8080/smart', { search: this.content })
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
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