<template>
  <div class="main">
    <SearchListItem v-for="(data, index) in cityStateData" :key="index" :data="data" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import SearchListItem from '@/components/Shared/Search/SearchListItem.vue'

library.add(faMapMarkerAlt, faSearch)
@Component({
  components: { SearchListItem }
})
export default class SearchList extends Vue {
  @Prop({ required: true }) cityStateData: any
}
</script>
<style lang="scss" scoped>
.main {
  background: #fff;
  border-radius: 8px;
  box-shadow: var(--shadow);
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
