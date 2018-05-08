import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import SearchQuotes from '@/components/SearchQuotes';
import SmartQuote from '@/components/SmartQuote';
import Developer from '@/components/Developer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search',
      name: 'SearchQuotes',
      component: SearchQuotes,
    },
    {
      path: '/smartquote',
      name: 'SmartQuote',
      component: SmartQuote,
    },
    {
      path: '/developer',
      name: 'Developer',
      component: Developer,
    },
  ],
});
