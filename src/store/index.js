import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import premio from './premio'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    premio
  }
})

export default store
