'use strict';

import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

console.log(process.env.NODE_ENV);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
