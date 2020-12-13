<template v-if="ifFound">
  <div class="listItem" @click="onItemSelect">
    <span>
      {{ data.name }}
      <span class="lightText">{{ data.state }}</span>
    </span>
    <div class="weather" v-if="temp">
      <div class="temp">
        <span>{{ Math.round(temp) }}°C</span>
        <span class="lightText">{{ weather }}</span>
      </div>
      <div class="icon"><img :src="getIconUrl()" /></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { getCityWeather } from '@/services/weather'
import { globalEventBus } from '@/main'
import { AxiosResponse } from 'axios'

library.add(faMapMarkerAlt, faSearch)
@Component
export default class SearchListItem extends Vue {
  @Prop({ required: true }) data: any
  private coord: any = null
  private weather: any = null
  private temp: any = null
  private ifFound = true
  private weatherPromise: Promise<AxiosResponse<any>> | null = null
  async mounted () {
    try {
      this.weatherPromise = getCityWeather(this.data.name)
      const weatherInfo = await this.weatherPromise
      this.coord = weatherInfo.data.coord
      this.weather = weatherInfo.data.weather[0].main
      this.temp = weatherInfo.data.main.temp
    } catch (err) {
      this.ifFound = false
    }
  }

  getIconUrl () {
    return require(`../../../assets/svg/${this.weather.toLowerCase()}.svg`)
  }

  onItemSelect () {
    globalEventBus.$emit('onCitySelect', { city: this.data, coord: this.coord })
  }
}
</script>
<style lang="scss" scoped>
.listItem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  -webkit-animation: SlideIn 0.5s;
  animation: SlideIn 0.5s;
  min-height: 72px;
  font-weight: 500;
}

@keyframes SlideIn {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.lightText {
  color: var(--light);
}

.weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.temp {
  display: flex;
  flex-direction: column;
}

.icon {
  height: 30px;
  width: 30px;
  margin-left: 1rem;
}
</style>
