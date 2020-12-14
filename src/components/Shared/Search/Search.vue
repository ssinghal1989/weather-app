<template>
  <div class="search-bar">
    <font-awesome-icon
      :icon="['fas', 'map-marker-alt']"
      class="map-marker-icon"
    />
    <input
      v-model="searchText"
      class="search-input"
      type="text"
      placeholder="Search"
      @keyup="onSearchTextChange"
    />
    <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
    <SearchList :cityStateData="searchedData" v-if="searchedData.length" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import SearchList from '@/components/Shared/Search/SearchList.vue'
import cityStateData from '../../../mock/cityStateData'

library.add(faMapMarkerAlt, faSearch)
@Component({
  components: { SearchList }
})
export default class Search extends Vue {
  @Prop({ required: true }) selectedCity: any
  private searchText = ''
  private searchedData: Array<any> = []
  onSearchTextChange () {
    this.searchedData = cityStateData.filter(
      (city: any) => city.name.toLowerCase().indexOf(this.searchText) > -1
    )
  }

  @Watch('selectedCity', { immediate: true })
  onSelectedCityChange () {
    this.searchText = this.selectedCity
    this.searchedData = []
  }
}
</script>
<style lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  width: 100%;
  position: relative;
}
.search-input {
  width: 100%;
  font-weight: 600;
  height: 2.5rem;
  padding: 0.75rem 1.75rem 0.75rem 3rem;
  border: none;
  border-radius: 8px;
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s ease;
}
.map-marker-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.5rem;
}
.search-icon {
  position: absolute;
  right: 1rem;
  font-size: 1.5rem;
}
</style>
