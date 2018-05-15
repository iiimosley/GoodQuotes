<template>
  <div id="app">
    <Navbar :user="authUser"/>
    <transition name="fade" mode="out-in">
    <router-view :user="currentUser" :auth="authUser"/>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/partials/Navbar';

export default {
  name: 'App',
  data() {
  return {
      authUser: false,
      currentUser: ''
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
