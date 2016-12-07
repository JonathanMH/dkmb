// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

import App from './App';
import store from './store.js';

Vue.use(VueResource);

new Vue({
  el: '#app',
  template: '<App/>',
  data: store.state,
  components: { App },
  methods: {
    getMovies: function(){
      // GET /someUrl
      var self = this;
      this.$http.get('/static/movies.json').then((response) => {
        store.set('movies',response.body);
        //self.$root.$data.movies = response.body
        console.log(self.movies.length)
      }, (response) => {
        console.log(response);
      });
    }
  },
  created: function() {
    this.getMovies();
  }
})
