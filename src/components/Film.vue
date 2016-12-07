//@TODO: segment desktop and mobile to separate view files
<template>
  <transition name="fade" appear>
    <div class="container film" v-if="private.loaded">
      <div class="movie--back_button">
        <router-link to="/" class="button button-outline">go back</router-link>
      </div>
      <div v-if="shared.mobile">
        <div class="row">
          <div class="column">
            <h1 v-if="movie.title != 'N/A'">{{movie.title}}</h1>
            <h1 v-if="movie.title == 'N/A'">{{movie.title_dk}}</h1>
          </div>
          <div class="column" v-if="private.posterURL">
            <img class="poster" :src="private.posterURL">
          </div>
          <div class="column">
            <h2 class="movie--director">
              <span v-for="director in movie.credits.direction">
                {{director.type}}: {{director.first_name.String}} {{director.last_name}}
              </span>
            </h2>
          </div>
          <p>{{movie.summary.String}}</p>
        </div>
      </div>
      <div v-if="!shared.mobile">
        <div class="row">
          <div class="column">
            <img class="poster" :src="private.posterURL">
          </div>
          <div class="column">
            <h1 v-if="movie.title != 'N/A'">{{movie.title}}</h1>
            <h1 v-if="movie.title == 'N/A'">{{movie.title_dk}}</h1>
            <h2 class="movie--director">
              <span v-for="director in movie.credits.direction">
                {{director.type}}: {{director.first_name.String}} {{director.last_name}}
              </span>
            </h2>
            <p>{{movie.summary.String}}</p>
          </div>
        </div>
      </div>
      <pre>{{movie}}</pre>
    </div>
  </transition>
</template>

<script>
import store from '../store.js';

export default {
  name: 'film',
  data() {
    return {
      shared: store.state,
      private: {
        loaded: false,
        posterURL: ''
      }
    }
  },
  computed: {
    movie: function(){
      console.log('computing property');
      return this.pluckMovie(this.shared.movies, this.$route.params.id);
    },
    poster: function(){
      // always pass parameter to avoid impure functions
      return this.getPoster(this.movie());
    }
  },
  created: function(){
    var self = this;
    if(self.shared.movies.length === 0){
      this.$http.get('/static/movies.json').then((response) => {
        store.set('movies',response.body);
        self.private.loaded = true;
      }, (response) => {
        // @TODO: handle http response error
      });
    } else {
        self.private.loaded = true;
    }
  },
  methods: {
    pluckMovie: function(movies, id){
      var self = this;
      var current_movie = movies.filter(function(movie) {
        return id == movie.id;
      });
      if( current_movie.length != 0 ){
        self.private.loaded = true;
        // return first match
        self.getPoster(current_movie[0]);
        return current_movie[0];
      }
      return {};
    },
    getPoster: function(movie){
      var self = this;
      this.$http.get(movie.photos).then((response) => {
        self.private.posterURL = response.body.posters[0].url;
        }, (response) => {
          // @TODO: handle http response error
        });
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  opacity: 1;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
