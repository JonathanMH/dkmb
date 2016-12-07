<template>
  <div class="hello container">
    <h1>DFI film database</h1>
    <div v-for="movie in shared.movies">
      <router-link :to="'/film/' + movie.id">{{movie.id}} {{ movie.title }} : {{ movie.title_dk }}</router-link>
    </div>
  </div>
</template>

<script>
import store from '../store.js';

export default {
  name: 'hello',
  data() {
    return {
      shared: store.state
    }
  },
  created: function(){
    var self = this;
    if(this.shared.movies.length === 0){
      // @TODO: add timeout to http request
      // @TODO: wrap JSON parsing in try/catch
      this.$http.get('/static/movies.json').then((response) => {
        store.set('movies', response.body);
      }, (response) => {
        // @TODO: handle http response error
      });
    }
  }
}
</script>

<style scoped>

</style>
