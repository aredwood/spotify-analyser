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
  mounted(){
    if(this.fresh){

      try{
        let cache = JSON.parse(localStorage.getItem("stateCache"));
        cache.fresh = false;
        this.$store.commit("setState",cache);
      }
      catch(err){
        // failed
      }

      this.$store.commit("setFresh",false);
    }

  },
  watch:{
    // this is used to cache the state to localstorage
    stateHash(){
      console.log("state change!")
      if(!this.$store.state.fresh){
        localStorage.setItem("stateCache",JSON.stringify(this.$store.state))
      }
    }
  }
};
</script>
