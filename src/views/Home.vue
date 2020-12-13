<template>
  <div>
    <div class="main" v-if="isDataLoaded">
      <Search :selected-city="selectedCity" />
      <daily-forcast
        :data="dailyData"
        :selected-date="selectedDate.dt"
        @dayChange="onDayChange"
      />
      <WeatherDetails
        :selected-date="selectedDate"
        :hourly="hourlyData.slice(indices.startIndex, indices.endIndex + 1)"
      />
    </div>
    <div class="loader-container" v-if="!isDataLoaded || isDataLoading">
      <pulse-loader :color="'#F97979'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Search from '@/components/Shared/Search/Search.vue' // @ is an alias to /src
import DailyForcast from '@/components/Shared/DailyForcast/DailyForcast.vue'
import WeatherDetails from '@/components/Shared/WeatherDetails.vue'
import locationUtility from '@/utility/location.ts'
import getWeatherInfo from '@/services/weather.ts'
import { getIndices } from '@/utility/time'
import { getExtendedHourlyData } from '@/utility/common'
import { globalEventBus } from '@/main'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

@Component({
  components: {
    Search,
    DailyForcast,
    WeatherDetails,
    PulseLoader
  }
})
export default class Home extends Vue {
  private dailyData: Array<any> = []
  private selectedDate = []
  private hourlyData: Array<any> = []
  private isDataLoaded = false
  private isDataLoading = false
  private indices = getIndices(new Date(), 0)
  private selectedCity = ''
  async mounted () {
    const location: any = await locationUtility.get()
    this.setWeatherData({
      lat: location.coords.latitude,
      lon: location.coords.longitude
    })
  }

  async setWeatherData (coords: any) {
    this.isDataLoading = true
    const weatherInfo = await getWeatherInfo(coords)
    this.dailyData = weatherInfo.data.daily
    this.hourlyData = getExtendedHourlyData(weatherInfo.data.hourly)
    this.selectedDate = this.dailyData[0]
    this.isDataLoaded = true
    this.isDataLoading = false
  }

  onDayChange (event: any) {
    this.selectedDate = event.day
    this.indices = getIndices(new Date(event.day.dt * 1000), event.index)
  }

  created () {
    globalEventBus.$on('onCitySelect', (data: any) => {
      this.setWeatherData(data.coord)
      this.selectedCity = `${data.city.name}, ${data.city.state}`
    })
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 50vw;
  margin: auto;
}

.loader-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  left: 0;
  backdrop-filter: brightness(0.3);
}

@media screen and (min-width: 850px) and (max-width: 1280px) {
  .main {
    width: 75vw;
    margin: auto;
  }
}

@media screen and (max-width: 850px) {
  .main {
    width: 90vw;
    margin: auto;
  }
}
</style>
