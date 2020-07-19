<template>
  <v-col cols="12" id="container" md="6">
    <table>
      <tr>
        <td>
          <img :src="imageLink" :style="imageStyle" />
        </td>

        <td style="padding:15px;">
          <span class="display-1">{{track.name}}</span><br>
          <span>{{firstArtist}}</span>
          <br />
          the {{((end === "high") ? "highest" : "lowest")}} "{{attribute}}"
        </td>
      </tr>
    </table>
  </v-col>
</template>
<script>
export default {
  props: {
    track: {
      Type: Object
    },
    end: {
      Type: String
    },
    attribute: {
      Type: String
    }
  },
  data() {
    return {
      imageStyle: {
        height: "85px",
        width: "80=5px"
      }
    };
  },
  computed: {
    firstArtist() {
      return this.track.artists[0].name;
    },
    images() {
      return this.track.album.images;
    },
    imageLink() {
      // return 2nd or 1st image
      if (this.images.length > 1) {
        return this.images[0].url;
      } else {
        return this.images[1].url;
      }
    }
  }
};
</script>
<style scoped>
#image {
  margin-right: 15px;
}
#container {
  padding: 15px;
}
</style>