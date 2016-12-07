<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello';
import Film from './components/Film';
import store from './store.js';

export default {
  name: 'app',
  components: {
    Hello
  },
  data() {
    return store.state
  },
  created: function(){
    console.log(this.movies.length)
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
