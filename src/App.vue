<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
    <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from './components/partials/Navbar';

export default {
  name: 'App',
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
