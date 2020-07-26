<template>
  <div>
    <PlaylistCollage :playlistId="playlistId" :tracks="tracks" :trackIcons="trackIcons" />

    <!-- amount of tracks -->
    <v-container v-if="loadedTracks">
      <v-row no-gutters>
        <AttributeChart :features="features" :attribute="'danceability'"/>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AttributeChart from "@/components/chart/AttributeChart.vue"
import lodash from "lodash";
import PlaylistCollage from "@/components/PlaylistCollage.vue";
// import FeatureCard from "@/components/cards/track/FeatureCard.vue"
export default {
  name: "analysePlaylist",
  components: {
    PlaylistCollage,
    // FeatureCard,
    AttributeChart
  },
  data() {
    return {
      features: [],
      tracks:[],
      mostPopularArtist: {},
      featureAttributes: [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        // "loudness",
        "speechiness",
        "valence",
        "tempo"
      ]
    };
  },
  async mounted() {
    const tracks = await this.spotify.playlists.getTracks(this.playlistId);
    this.$store.commit("setPlaylistTracks",{
      id:this.playlistId,
      tracks:tracks
    })
    this.$store.commit("playlistsLastUpdated",new Date().getTime())
  },
  computed: {
    playlistsLastUpdated(){
      return this.$store.state.playlistsLastUpdated
    },
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
      return this.spotify.playlists.getTotalDurationsSeconds(this.tracks);
    },
    mostPopularArtistId() {
      return this.spotify.playlists.getMostPopularArtist(this.tracks);
    },
    loadedTracks() {
      return this.tracks.length > 0;
    },
    loadedFeatures() {
      return (
        this.tracks.length == this.features.length && this.tracks.length > 0
      );
    },
    polarEnds() {
      // traverse to find, prototypes may mutate

      let high = {};
      let low = {};

      this.featureAttributes.forEach(attributte => {
        low[attributte] = {
          trackId: "",
          value: Infinity
        };

        high[attributte] = {
          trackId: "",
          value: 0
        };
      });

      this.features.forEach(feature => {
        this.featureAttributes.forEach(attribute => {
          const value = feature[attribute];

          if (value < low[attribute].value) {
            low[attribute].value = value;
            low[attribute].trackId = feature.id;
          }

          if (value > high[attribute].value) {
            high[attribute].value = value;
            high[attribute].trackId = feature.id;
          }
        });
      });

      return {
        low,
        high
      };
    }
  },
  watch: {
    async mostPopularArtistId(newValue) {
      const artistDetails = await this.spotify.artist.get(newValue);
      this.mostPopularArtist = artistDetails;
    },
    async loadedTracks(newValue) {
      if (newValue) {
        const features = await this.getFeatures();
        this.features = features;
      }
    },
    playlistsLastUpdated(){
      this.tracks = this.$store.state.playlistContent[this.playlistId] || [];
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
    },
    findTrackInPlaylist(trackId) {
      const found = this.tracks.filter(track => {
        return track.track.id === trackId;
      })[0];

      return found;
    },
    async getFeatures() {
      // chunks of 100
      const trackIds = this.tracks.map(track => {
        const id = track.track.id;
        return id;
      });

      const chunks = lodash.chunk(trackIds, 95);
      let requests = [];

      chunks.forEach(chunk => {
        requests.push(this.spotify.audioFeatures.get(chunk));
      });

      const allFeatures = await Promise.all(requests);

      const features = allFeatures.reduce((acc, curr) => {
        return acc.concat(curr.audio_features);
      }, []);

      return features;
    }
  }
};
</script>
<style scoped>
</style>