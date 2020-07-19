<template>
  <transition name="icon">
    <img v-bind:src="currentIcon" :height="height" :width="width" v-bind:style="iconStyle"/>
  </transition>
</template>
<script>

import lodash from "lodash";
import gsap from "gsap";
export default {
  name: "Icon",
  props: {
    height: {
      type: String
    },
    width: {
      type: String
    },
    initial: {
      type: String
    },
    playlistId: {
      type: String
    }
  },
  data() {
    return {
      currentIcon: this.initial,
      opacity:1
    };
  },
  created() {
    window.instance.$on("tick", () => {
      if (this.changeOver()) {
        const randomTrack = lodash.sample(
          this.$store.state.playlistContent[this.playlistId]
        );
        const image = this.getThumbnail(randomTrack);
        this.transition(image,3)
      }
    });
  },
  computed:{
      iconStyle(){
          return {
              opacity:this.opacity
          }
      }
  },
  methods: {
    getThumbnail(track) {
      try {
        const images = track.track.album.images;
        return images[images.length - 1].url;
      } catch (err) {
        return false;
      }
    },
    async transition(newImage){

        await gsap.to(this.$data,{
            duration:lodash.random(0.5,3,true),
            opacity:0
        })

        this.currentIcon = newImage

        await gsap.to(this.$data,{
            duration:lodash.random(0.5,3,true),
            opacity:1
        })
    },
    changeOver() {
      const rand = lodash.random(1,true);
      return rand < 0.2
    }
  }
};
</script>
<style scoped>

</style>