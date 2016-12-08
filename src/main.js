// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

import App from './App';
import Hello from './components/Hello'
import Film from './components/Film'
import store from './store.js';

const routes = [
  { path: '/', component: Hello },
  { path: '/film/:id', component: Film }
];

const router = new VueRouter({
  routes: routes
});

router.beforeEach(function (from, to, next) {
  window.scrollTo(0, 0);
  next();
});

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  data: store.state,
  components: { App },
  created: function() {
    if (window.innerWidth > 600){
      this.mobile = false;
    }
  }
})
