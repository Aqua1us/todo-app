import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ja'
import Router from './router/router'
import Store from './store'
import Header from './components/header.vue'
import FullCalendar from 'vue-full-calendar'
import common from './common/util'

Vue.use(FullCalendar)
Vue.use(ElementUI, { locale })
Vue.mixin(common)
Vue.config.productionTip = false

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router: Router,
  store: Store,
  components: {
    'navbar': Header
  }
})
