<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import objectHash from "object-hash";
export default {
  name: 'App',
  components:{
  },

  data: () => ({
    //
  }),
  computed:{
    stateHash(){
      return objectHash(this.$store.state);
    },
    fresh(){
      return this.$store.state.fresh;
    }
  },
  // this is used to populate as much data as we can.
  async beforeCreate(){
    if(!this.$store.state.auth.accessToken){
      try{
        const cachedToken = localStorage.getItem("accessToken");
        this.$store.commit("updateAuth",{
          tokenType:"Bearer",
          expiresIn:"3600",
          accessToken:cachedToken
        });
      }
      catch(err){
        // failed
      }
    }

    // could be async, but we're not actually concerned when this is populated.
    this.spotify.playlists.list();

    

  },
  watch:{
    // this is used anytime there is a state change, at all.
    stateHash(){
      if(this.$store.state.auth.accessToken){
        localStorage.setItem("accessToken",this.$store.state.auth.accessToken)
      }
    }
  }
};
</script>
