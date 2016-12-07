<template>
  <div class="hello">
    <h1>DFI film database</h1>
    <div v-for="movie in movies">
      {{ movie.title }} : {{ movie.title_dk }}
    </div>
  </div>
</template>

<script>
import store from '../store.js';

export default {
  name: 'hello',
  data() {
    return store.state

  },
  created: function(){
    console.log(this.movies.length)
  }
}
</script>

<style scoped>

</style>
