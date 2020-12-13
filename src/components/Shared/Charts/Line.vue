<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    graphData: {
      type: Object
    }
  },
  data: () => ({
    chartdata: null,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    }
  }),
  watch: {
    graphData: {
      handler (val) {
        this.chartdata = {
          labels: val.labels,
          datasets: [
            {
              label: 'Temprature',
              backgroundColor: '#f87979',
              data: val.values
            }
          ]
        }
        this.renderChart(this.chartdata, this.options)
      },
      deep: true
    }
  },
  mounted () {
    this.chartdata = {
      labels: this.graphData.labels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: this.graphData.values
        }
      ]
    }
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
