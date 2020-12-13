import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.config.productionTip = false

export const globalEventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
