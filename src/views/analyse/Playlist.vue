<template>
  <div>
    <PlaylistCollage :playlistId="playlistId" :tracks="tracks" :trackIcons="trackIcons" />

    <!-- amount of tracks -->
    <v-container>
      <v-row no-gutters>
        <!-- <v-col v-for="n in 3" :key="n" cols="12" sm="4">
          <v-card class="pa-2" outlined tile>One of three columns</v-card>
        </v-col>-->
        <v-col cols="12">
          <span class="display-4">
            {{this.tracks.length}}
            <br />
          </span>
          the amount of tracks in this playlist
        </v-col>

        <v-col cols="12">
          <span class="display-4">{{mostPopularArtist.name}}</span>
          <br />appears the most in this playlist
        </v-col>a
        <v-col cols="12">
          <span class="display-4">{{((totalPlaylistDurationSeconds/60).toFixed(1)).toLocaleString()}}</span>
          <br />minutes worth of "bangers"
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import PlaylistCollage from "@/components/PlaylistCollage.vue";
export default {
  name: "analysePlaylist",
  components: {
    PlaylistCollage
  },
  data() {
    return {
      tracks: [],
      mostPopularArtist: {}
    };
  },
  async mounted() {
    const tracks = await this.spotify.playlists.getTracks(this.playlistId);
    this.tracks = tracks;
  },
  computed: {
    playlistId() {
      return this.$route.params.playlistId;
    },
    trackIcons() {
      const icons = this.tracks.map(track => {
        return this.getThumbnail(track);
      });
      return icons;
    },
    totalPlaylistDurationSeconds() {
      let duration = 0;

      if (this.tracks.length === 0) {
        return 0;
      }

      for (let i = 0; i < this.tracks.length; i++) {
        const { track } = this.tracks[i];
        duration += track.duration_ms;
      }

      return Math.floor(duration / 1000);
    },
    mostPopularArtistId() {
      var artists = {};

      this.tracks.forEach(trackInPlaylist => {
        const { track } = trackInPlaylist;

        const artistsInTrack = track.artists;

        artistsInTrack.forEach(artist => {
          const artistId = artist.id;

          if (typeof artists[artistId] === "undefined") {
            artists[artistId] = 1;
          } else {
            artists[artistId] = artists[artistId] + 1;
          }
        });
      });

      // sort
      const sortedArtists = Object.keys(artists).sort((a, b) => {
        return artists[b] - artists[a];
      });

      return sortedArtists[0];
    }
  },
  watch: {
    async mostPopularArtistId(newValue) {
      const artistDetails = await this.spotify.artist.get(newValue);
      this.mostPopularArtist = artistDetails;
    }
  },
  methods: {
    getThumbnail(track) {
      try {
        const images = track.track.album.images;
        return {
          trackId: track.id,
          icon: images[images.length - 1].url
        };
      } catch (err) {
        return false;
      }
    }
  }
};
</script>
<style scoped>
</style>