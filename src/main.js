'use strict';

import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import router from './router';

Vue.config.productionTip = false;

console.log(process.env.NODE_ENV);

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const USER = "USER"

const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem("token"),
    currentUser: '',
    userQuotes: [],
    devEnv: process.env.NODE_ENV === "development" ? 'http://localhost:8080' : ''
  },
  mutations: {
    [LOGIN](state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS](state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
    authUser(state, id) {
      state.currentUser = +id
    },
    saveQuotes(state, qs) {
      state.userQuotes = qs
    },
    pushQuote(state, q) {
      state.userQuotes.push(q);
    },
    rmQuote(state, q) {
      state.userQuotes.splice(state.userQuotes.indexOf(q), 1);
    }
  },
  actions: {
    login({state,commit,rootState}, creds) {
      commit(LOGIN); 
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem("token", "JWT");
          commit(LOGIN_SUCCESS);
          resolve();
        }, 1000);
      });
    },
    logout({commit}) {
      localStorage.removeItem("token");
      this.state.currentUser = '';
      commit(LOGOUT);
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    },
    currentUser: state => {
      return state.currentUser;
    },
    userQuotes: state => {
      return state.userQuotes
    }
  }
});


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
