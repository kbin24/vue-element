import Vue from 'vue'
import ElementUI from 'element-ui'
// import '../theme/index.css'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerMap from './router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import login from './login.vue'


Vue.use(VueAxios,axios)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
const router = new VueRouter({routes: routerMap})

const app = new Vue({
  router
}).$mount('#app')
