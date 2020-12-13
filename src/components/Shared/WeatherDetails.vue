<template>
  <div class="mainContainer">
    <div class="tempContainer">
      <p class="temp">{{ Math.round(selectedDate.temp.max) }}°C</p>
      <div class="icon">
        <img :src="getIconUrl(selectedDate.weather[0].main)" />
      </div>
    </div>
    <line-chart :graph-data="chartData" />
    <div class="secondaryStats">
      <div class="pressure">
        <span>Pressure</span>
        <p>{{ selectedDate.pressure }} hpa</p>
      </div>
      <div class="humidity">
        <span>Humidity</span>
        <p>{{ selectedDate.humidity }} %</p>
      </div>
    </div>
    <div class="sunStats">
      <div class="sunRise">
        <span>Sunrise</span>
        <p class="lightText">
          {{ localTime(new Date(selectedDate.sunrise * 1000)) }} AM
        </p>
      </div>
      <div class="sunSet">
        <span>Sunset</span>
        <p class="lightText">
          {{ localTime(new Date(selectedDate.sunset * 1000)) }} PM
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { localTime } from '@/utility/time'
import LineChart from '@/components/Shared/Charts/Line.vue'

library.add(faMapMarkerAlt, faSearch)
@Component({
  components: {
    LineChart
  }
})
export default class WeatherDetails extends Vue {
  localTime = localTime
  @Prop({ required: true }) selectedDate: any
  @Prop({ required: true }) hourly: any
  private chartLabels: Array<any> = [];
  private chartValues: Array<any> = [];
  getIconUrl (weatherType: string) {
    return require(`../../assets/svg/${weatherType.toLowerCase()}.svg`)
  }

  get chartData () {
    return {
      labels: this.chartLabels,
      values: this.chartValues
    }
  }

  mounted () {
    this.setChartValues(this.hourly)
  }

  setChartValues (hourly: any) {
    this.chartValues = []
    this.chartLabels = []
    hourly.forEach((hour: any) => {
      this.chartLabels.push(localTime(new Date(hour.dt * 1000)))
      this.chartValues.push(hour.temp)
    })
  }

  @Watch('hourly')
  onHourlyChange (newVal: any) {
    this.setChartValues(newVal)
  }
}
</script>
<style lang="scss" scoped>
.mainContainer {
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 1.5rem 1rem 0;
  margin-bottom: 1.5rem;
  width: 100%;
  height: auto;
  line-height: 1.2;
}

.tempContainer {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.temp {
  font-size: 3rem;
  font-weight: 900;
  margin: 0 1rem 0 0;
}

.icon {
  height: 48px;
  width: 48px;
}

.secondaryStats {
  display: flex;
  margin-bottom: 3rem;
}

.pressure,
.humidity {
  background: var(--primary-light);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
}

.pressure {
  margin-right: 0.5rem;
}

.pressure > span,
.humidity > span,
.sunRise > span,
.sunSet > span {
  font-weight: 700;
}

.sunStats {
  display: flex;
  justify-content: space-between;
}

.sunRise,
.sunSet {
  display: flex;
  flex-direction: column;
}

.lightText {
  color: var(--light);
}
</style>
