<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    features: {
      type: Array
    },
    attribute: {
      type: String
    },
    playlistId:{
      type: String
    }
  },
  computed: {
    kvPair() {
      return this.features.map(feature => {
        return {
          value: feature[this.attribute],
          key: feature.id
        };
      });
    },
    playlistContent(){
      const playlist = this.$store.state.playlistContent[this.playlistId].map(track_added => {
        return track_added.track;
      })

      let tracks = {};

      for(let i = 0; i < playlist.length;i++){
        const item = playlist[i];

        tracks[item.id] = item;
      }

      return tracks;
    },
    keys() {
      return this.kvPair.map(kv => {
        // return kv.key;
        return this.playlistContent[kv.key].name;
      });
    },
    values() {
      return this.kvPair.map(kv => {
        return kv.value;
      });
    },
    chartData() {
      return {
        chartdata: {
          labels: this.keys,
          datasets: [
            {
              label: this.attribute,
              backgroundColor: "#f87979",
              data: this.values
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };
    }
  },
  data() {
    return {};
  },
	watch:{
		chartData(){
			this.renderChart(this.chartData.chartdata,this.chartData.options)
		}
	}
  // mounted() {
  //   this.renderChart(this.chartData, this.options);
	// },
};
</script>
<style scoped>
</style>