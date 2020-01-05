import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fresh:true,
    auth:{
      accessToken:"",
      tokenType:"",
      expiresIn:""
    },
    user:{
      displayName:""
    },
    playlists:{
      list:[],
      time:0
    }
  },
  mutations: {
    updateAuth(state,auth){
      state.auth = auth;
    },
    updateDisplayName(state,displayName){
      state.user.displayName = displayName;
    },
    addPlaylist(state,playlist){
      state.playlists.list.push(playlist)
    },
    setPlaylists(state,playlists){
      state.playlists.list = playlists;
    },
    setFresh(state,freshness){
      state.fresh = freshness;
    },
    setState(state,newState){
      state = newState;
    }

  },
  actions: {
  },
  modules: {
  }
})
