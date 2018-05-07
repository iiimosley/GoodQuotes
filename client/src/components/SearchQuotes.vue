<template>
  <div>
    <input id="searchbar" type="text" :placeholder="searchMsg"/>
  </div>
</template>

<script>
export default {
  name: 'SearchQuotes',
  data() {
    return {
      searchMsg: 'Search for a quote',
    };
  },
};
</script>

<style scoped>
#searchbar {
  display: block;
  margin: 3em auto;
}
</style>
