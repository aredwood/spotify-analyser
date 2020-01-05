<template>
  <div class="home">
    Welcome {{displayName}}


    <div id="playlistCards" v-for="playlist in playlists" v-bind:key="playlist.id">
      <PlaylistCard v-bind:playlist="playlist"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import PlaylistCard from "@/components/cards/Playlist.vue"
export default {
  name: 'dashboard',
  components: {
    PlaylistCard
  },
  async mounted(){
    //TODO refactor this.
    await this.spotify.playlists.list();
    
  },
  computed:{
    displayName(){
      return this.$store.state.user.displayName
    },
    playlistCount(){
      return this.$store.state.playlists.list.length;
    },
    playlists(){
      return this.$store.state.playlists.list;
    }
  },
  methods:{

  }
}
</script>
