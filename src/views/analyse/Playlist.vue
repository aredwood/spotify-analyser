<template>
  <div>
    <div id="iconContainer">
      <img
        v-for="trackIcon in trimmedIcons"
        v-bind:key="trackIcon.trackId"
        v-bind:src="trackIcon.icon"
        :height="idealDimensions + 'px'"
        :width="idealDimensions + 'px'"
      />
    </div>
    <div id="gradient" v-bind:style="gradientStyle"></div>
		<div id="title" v-bind:style="titleStyle" class="font-weight-bold">{{playlistName}}</div>
  </div>
</template>
<script>
import lodash from "lodash";
export default {
  name: "analysePlaylist",
  computed: {
    playlistId() {
      return this.$route.params.playlistId;
    },
    playlistSummary() {
      const matchingPlaylist = this.$store.state.playlists.list.filter(
        playlist => {
          return playlist.id === this.playlistId;
        }
      );
      return matchingPlaylist[0];
		},
		playlistName(){
			try{
				return this.playlistSummary.name;
			}
			catch{
				return ""
			}
		},	
    trackIcons() {
      const icons = this.tracks.map(track => {
        return this.getThumbnail(track);
      });
      return icons;
		},
		titleStyle(){
			return {
				"z-index":2,
				"top":"0px",
				"padding-top":((this.maxRows * this.idealDimensions) / 2) + "px",
				"width":"100%",
				"text-align":"center",
				"position":"absolute",
				"color":"white",
				"font-size":"3rem"
			}
		},
    trimmedIcons() {
			const neededIcons = this.maxRows * this.rowLength;

			if(this.trackIcons.length >= neededIcons){
				return this.trackIcons.slice(0, this.maxRows * this.rowLength);
			}
			else if(this.trackIcons.length === 0){
				return this.trackIcons;
			}
			else {
				// const shortByFactor = Math.ceil((neededIcons - this.trackIcons.length) / (this.trackIcons.length));
				let icons = this.trackIcons;

				for(let i =0; i <= neededIcons;i++){
					icons.push(lodash.sample(this.trackIcons))
				}

				// return icons;
				return icons.slice(0, this.maxRows * this.rowLength);
			}

      // return this.trackIcons.slice(0, this.maxRows * this.rowLength);
		},
		gradientStyle(){
			return {
				height:(this.maxRows * this.idealDimensions) + "px"
			}
		},
    windowWidth() {
      return this.$store.state.window.width;
    },
    windowHeight() {
      return this.$store.state.window.height;
    },
    idealDimensions() {
      return this.windowWidth / Math.ceil(this.windowWidth / 64);
    },
    rowLength() {
      return (this.windowWidth / this.idealDimensions).toFixed(0);
    },
    maxRows() {
      return Math.ceil(
        this.windowHeight / this.collageRatio / this.idealDimensions
      );
    }
  },
  data() {
    return {
      tracks: [],
      collageRatio: 1
    };
  },
  async mounted() {
    const tracks = await this.spotify.playlists.getTracks(this.playlistId);
    this.tracks = tracks;
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
#iconContainer {
  line-height: 0px;
	z-index: -1;

}
#gradient {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  z-index: 1;
	position: absolute;
	width:100%;
	top:0px;
}
</style>