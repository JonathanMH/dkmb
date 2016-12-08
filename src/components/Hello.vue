<template>
  <div class="hello container">
    <h1>Movie Database</h1>
    <div class="searchField">
      <label>Search by title or description:
        <input type="text" id="search" v-model="private.searchString">
      </label>
    </div>
    <div v-for="movie in searchResults">
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
      shared: store.state,
      private: {
        searchString: ''
      }
    }
  },
  computed: {
    searchResults: function(){
      console.log('computing results');
      var movies = store.state.movies;
      var searchString = this.private.searchString;
      console.log(this.private.searchString);

      if(searchString.length == 0){
        return [];
      }

      // clean up searchString
      searchString = searchString.trim().toLowerCase();

      var movieResults = movies.filter(function(item){
        // @TODO: refactor, repetitive
        if( item.hasOwnProperty('title_dk') ){
          if(item.title_dk.toLowerCase().indexOf(searchString) !== -1){
            return item;
          }
        }
        if( item.hasOwnProperty('title') ){
          if(item.title.toLowerCase().indexOf(searchString) !== -1){
            return item;
          }
        }
        if( item.hasOwnProperty('summary') && item.summary.hasOwnProperty('String') ){
          if(item.summary.String.toLowerCase().indexOf(searchString) !== -1){
            return item;
          }
        }
      });

      // Return an array with the filtered data.
      return movieResults;
    }
  },
  created: function(){
    var self = this;
    if(this.shared.movies.length === 0){
      // @TODO: add timeout to http request
      // @TODO: wrap JSON parsing in try/catch
      this.$http.get('/static/movies.json').then((response) => {
      this.$http.get('static/movies.json').then((response) => {
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
