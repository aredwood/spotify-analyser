import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth:{
      accessToken:"",
      tokenType:"",
      expiresIn:""
    }
  },
  mutations: {
    updateAuth(state,auth){
      state.auth = auth;
    }
  },
  actions: {
  },
  modules: {
  }
})
