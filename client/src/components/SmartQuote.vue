<template>
<div id="smartWrap">
  <textarea></textarea>
  <button>{{msg}}</button>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      msg: "SmartQuote"
    };
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
#smartWrap>textarea {
  width: 90%;
  height: 140px;
}

</style>