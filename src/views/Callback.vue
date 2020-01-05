<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'callback',
  components: {
  },
  mounted(){
    //TODO refactor this.
    // get the params
    const hash = window.location.hash.substring(1);

    let options = {};
  
    hash.split("&").forEach(part => {
      const kv = part.split("=");
      options[kv[0]] = kv[1];
    })

    this.$store.commit("updateAuth",{
      accessToken:options.access_token,
      expiresIn:options.expires_in,
      tokenType:options.token_type
    });
    this.spotify.me();

    
  },
  methods:{

  }
}
</script>
