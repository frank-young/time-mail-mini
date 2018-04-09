import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    set: (state) => {
      const obj = state
      obj.count += 1
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

export default store
