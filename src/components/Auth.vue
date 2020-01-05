<template>
  <div>
      <div v-if="!loggedIn">
        <v-btn small v-on:click="logInButton">Log In</v-btn>
      </div>
  </div>
</template>

<script>
export default {
    data:() => {
        return {
            loggedIn:false
        }
    },
    methods:{
        logInButton(){
            const options = {
                client_id:"77dc3ff8f7a24f219e00cae295d36172",
                response_type:"token",
                redirect_uri:`${window.location.href}callback`,
                scope:"playlist-read-private"
            }

            const base = "https://accounts.spotify.com/authorize?"
            let redirectURL = base;

            Object.keys(options).forEach((key) => {
                redirectURL += `${key}=${options[key]}&`
            })

            redirectURL = redirectURL.substring(0,redirectURL.length - 1);
            //TODO use a vue router here
            window.location.replace(redirectURL);

        }
    }
}
</script>

<style>

</style>