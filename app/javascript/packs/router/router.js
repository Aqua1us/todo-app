import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Calendar from '../components/calendar.vue'
import About from '../components/about.vue'
import Contact from '../components/contact.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/calendar', component: Calendar },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
  ]
})
