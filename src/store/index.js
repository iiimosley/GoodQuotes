'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const USER = "USER"

Vue.use(Vuex);

export default new Vuex.Store({
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
    login({ state, commit, rootState }, creds) {
      commit(LOGIN);
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem("token", "JWT");
          commit(LOGIN_SUCCESS);
          resolve();
        }, 1000);
      });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      this.state.currentUser = '';
      commit(LOGOUT);
      router.push("/");
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
