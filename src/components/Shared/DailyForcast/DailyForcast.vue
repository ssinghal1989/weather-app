<template>
  <div class="container">
    <div
      v-for="(day, index) in data" :key="day.dt" class="subContainer"
      :class="selectedDate === day.dt ? 'selected' : ''"
      @click="onDaySelect(day, index)">
      <span>{{ getDayName(new Date(day.dt * 1000).getDay()) }}</span>
      <p>
        <span>{{ Math.round(day.temp.max) }}°</span>{{ &nbsp; }}
        <span class="lightText">{{ Math.round(day.temp.min) }}°</span>
      </p>
      <div class="icon">
        <img :src="getIconUrl(day.weather[0].main)" />
      </div>
      <span class="lightText">Clear</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
const daysInAWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

library.add(faMapMarkerAlt, faSearch)
@Component
export default class DailyForcast extends Vue {
  @Prop({ required: true }) data: any
  @Prop({ required: true }) selectedDate: any
  getDayName (dayIndex: number) {
    return daysInAWeek[dayIndex]
  }

  getIconUrl (weatherType: string) {
    return require(`../../../assets/svg/${weatherType.toLowerCase()}.svg`)
  }

  onDaySelect (day: any, index: any) {
    this.$emit('dayChange', { day, index })
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  font-size: 0.95rem;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 1.5rem;
}
.subContainer {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0.25rem 0.5rem 0.25rem 0.25rem;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 89px;
  height: 124px;
  font-weight: 600;
  cursor: pointer;
}

.selected {
  background: #fffdf7;
  box-shadow: 0 0 1px 3px var(--primary);
  transition: box-shadow 0.3s ease-in;
  border-radius: 8px;
}

.lightText {
  color: var(--light);
}

.icon {
  height: 30px;
  width: 30px;
}
</style>
