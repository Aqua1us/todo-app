import Vue from 'vue/dist/vue.esm.js'
import Router from './router/router'
import Header from './components/header.vue'
import FullCalendar from 'vue-full-calendar';

Vue.use(FullCalendar);
Vue.config.productionTip = false;

var app = new Vue({
    router: Router,
    el: '#app',
    components: {
        'navbar': Header
    }
});