
export default {
  debug: false, // @TODO: make this environemnt aware
  state: {
    movies: [],
    mobile: true
  },
  set (key, newValue) {
    this.debug && console.log('set triggered with', newValue)
    this.state[key] = newValue
  }
}
