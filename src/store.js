const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

import Vuex from 'vuex'

module.exports.store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem("token")
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
    }
  },
  actions: {
    login({
      state,
      commit,
      rootState
    }, creds) {
      console.log("login...", creds);
      commit(LOGIN); // show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem("token", "JWT");
          commit(LOGIN_SUCCESS);
          resolve();
        }, 1000);
      });

    },
    logout({
      commit
    }) {
      localStorage.removeItem("token");
      commit(LOGOUT);
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    }
  }
});


// const mainNavTpl = `
//     <section>
//      <router-link to="/">Home</router-link>
//      <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
// 		 <a href="#" v-if="isLoggedIn" @click="logout">Logout</a> 
//     </section>`
    
// const MainNav = Vue.component('main-nav', {
//   template: mainNavTpl,

// });




// const Home = Vue.component('home', {
//   template: "<h1>Home</h1>"
// });


// const loginTpl = `
//   <form @submit.prevent="login()">
//    <input type="text" placeholder="email" v-model="email">
//    <input type="password" placeholder="password" v-model="password">
//    <button type="submit">Login</button>
//   </form>
 
// `
// const Login = Vue.component('login', {
//   template: loginTpl,
//   data() {
//     return {
//       email: "",
//       password: ""
//     }
//   },
//   methods: {
//     login() {
//       this.$store.dispatch("login", {
//         email: this.email,
//         password: this.password
//       }).then(res => {
//         this.$router.push('/');
//       })
//     }
//   },
// });


// const routes = [{
//   path: '/',
//   component: Home
// },
// {
//   path: '/login',
//   component: Login
// }
// ]


// const router = new VueRouter({
//   routes
// })


// const app = new Vue({
//   router,
//   store,
//   components: {
//     "main-nav": MainNav
//   }
// }).$mount('#app')