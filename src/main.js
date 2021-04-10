import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router'
/* import store from './store' */
import store from './store/index'
import {routerMode} from './config/env'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.config.productionTip = false

Vue.use(VueRouter).use(VueAwesomeSwiper)
const router = new VueRouter({
  routes,
  mode:routerMode,
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app') /* 挂载 */
