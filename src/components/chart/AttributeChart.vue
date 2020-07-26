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
    keys() {
      return this.kvPair.map(kv => {
        return kv.key;
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
              label: "Tracks",
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
  data() {},
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