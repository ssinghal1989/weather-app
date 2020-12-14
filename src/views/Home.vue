<template>
  <div>
    <div class="main" v-if="isDataLoaded && !apiErrorMessage">
      <div class="location-error-message" v-if="locationErrorMessage">
        {{ locationErrorMessage }}
      </div>
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
    <div
      class="loader-container"
      v-if="(!isDataLoaded || isDataLoading) && !apiErrorMessage"
    >
      <pulse-loader :color="'#F97979'" />
    </div>
    <div v-if="apiErrorMessage" class="api-error-message">
      <span>{{apiErrorMessage}}</span>
      <button class="retry-button" @click="setWeatherData()">Retry</button>
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
  private locationErrorMessage = ''
  private errorInGettingWeatherData = false
  private coords: any
  private apiErrorMessage = ''
  async mounted () {
    try {
      const location: any = await locationUtility.get()
      this.coords = {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      }
      this.setWeatherData()
    } catch (err) {
      console.log('err', err)
      // On error setting delhi as defauly city
      this.coords = {
        lat: 28.67,
        lon: 77.22
      }
      this.setWeatherData()
      this.selectedCity = 'Delhi, Delhi'
      if (err.code === 1) {
        this.locationErrorMessage =
          'Please allow location permission to view weather of current your location'
      } else {
        this.locationErrorMessage = err.message
      }
    }
  }

  async setWeatherData () {
    console.log(this.coords)
    try {
      this.apiErrorMessage = ''
      this.isDataLoading = true
      const weatherInfo = await getWeatherInfo(this.coords)
      console.log('weatherInfo', weatherInfo)
      this.dailyData = weatherInfo.data.daily
      this.hourlyData = getExtendedHourlyData(weatherInfo.data.hourly)
      this.selectedDate = this.dailyData[0]
      this.isDataLoaded = true
      this.isDataLoading = false
    } catch (err) {
      console.log('api err', err)
      this.apiErrorMessage = err.message ? err.message : 'Technical error in getting location data, Please try again'
    }
  }

  onDayChange (event: any) {
    this.selectedDate = event.day
    this.indices = getIndices(new Date(event.day.dt * 1000), event.index)
  }

  created () {
    globalEventBus.$on('onCitySelect', (data: any) => {
      console.log('data', data)
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

.location-error-message {
  padding: 1rem 1rem 0 1rem;
  color: red;
}

.api-error-message {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .retry-button {
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 0.25rem;
    background-color: cornflowerblue;
    font-size: 15px;
    color: white;
    margin-top: 1rem;
    cursor: pointer;
  }
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
