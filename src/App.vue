<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/partials/Navbar';

export default {
  name: 'App',
  data() {
  return {
      isAuthenticated: false
    }
  },
  components: { Navbar },
};
</script>

<style>
h3 {
  text-align: center
}
.mainWrap {
  margin: 1em auto;
}

</style>
