function createStore(initialState) {
    var state = initialState;
    var callbacks = [];
    return {
        getState: function getState() {
            return state;
        },
        setState: function setState(fn, done) {
            Object.assign(state, typeof fn === 'function' ? fn(state) : fn);
            for (var i = 0, list = callbacks; i < list.length; i += 1) {
                var cb = list[i];

                cb(state);
            }
            done && setTimeout(done, 0);
            return state;
        },
        update: function update(fn) {
            callbacks.push(fn);
            return function () { return callbacks.slice(callbacks.indexOf(fn), 1); };
        },
        connect: function connect(map) {
            return function (comp) { return function (props) { return comp(Object.assign(props, map(state))); }; };
        }
    };
}

export default createStore;
//# sourceMappingURL=sill-state.es.js.map
