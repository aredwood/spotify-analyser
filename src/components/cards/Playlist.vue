<template>
  <v-card class="mx-auto" max-width="400" raised id="playlistCard" v-on:click="goToAnalyse">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">By {{playlist.owner.display_name}}</div>
        <v-list-item-title class="headline mb-1" id="title">{{playlist.name}}</v-list-item-title>
        <v-list-item-subtitle v-html="safeDescription"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img v-bind:src="thumbnail" />
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: {
    playlist: Object
  },
  data() {
    return {};
  },
  computed: {
    safeDescription() {
      const providedDescription = this.playlist.description;
      if (providedDescription == "") {
        return "<i>no description</i>";
      } else {
        return providedDescription;
      }
    },
    thumbnail() {
      // return "https://pl.scdn.co/images/pl/default/f7c5994b634759243724073c31969f420783392e"
      try {
        const images = this.playlist.images;
        const lastImage = images[0];
        return lastImage.url;
      } catch (err) {
        return "https://dummyimage.com/200x200/000/ffffff.png&text=no+icon+for+playlist"
      }
    }
  },
  methods: {
    goToAnalyse() {
      this.$router.push("/analyse/playlist/" + this.playlist.id);
    }
  }
};
</script>
<style scoped>
#title {
  white-space: initial;
}
#playlistCard {
  margin-bottom: 20px;
}
</style>