<template>
  <h3>{{msg}}</h3>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      msg: 'GoodQuotes',
    };
  },
};
</script>

<style scoped>
</style>
