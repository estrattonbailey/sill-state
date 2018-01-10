export default function createStore (initialState) {
  let state = initialState
  let callbacks = []

  return {
    getState () {
      return state
    },
    setState (fn, done) {
      Object.assign(state, typeof fn === 'function' ? fn(state) : fn)
      for (let cb of callbacks) { cb(state) }
      done && setTimeout(done, 0)
      return state
    },
    update (fn) {
      callbacks.push(fn)
      return () => callbacks.slice(callbacks.indexOf(fn), 1)
    },
    connect (map) {
      return comp => props => {
        return comp(Object.assign(props, map(state)))
      }
    }
  }
}
