import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Calendar from '../components/calendar.vue'
import About from '../components/about.vue'
import Contact from '../components/contact.vue'
import Edit from '../components/edit.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/calendar', name: 'calendar', component: Calendar },
    { path: '/about', name: 'about', component: About },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/edit/:task_id', name: 'edit', component: Edit }
  ]
})
