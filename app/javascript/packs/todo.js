import Vue from 'vue'
import Router from './router/router'
import Store from './store'
import Header from './components/header.vue'
import FullCalendar from 'vue-full-calendar'

Vue.use(FullCalendar)
Vue.config.productionTip = false

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router: Router,
  store: Store,
  components: {
    'navbar': Header
  }
})
