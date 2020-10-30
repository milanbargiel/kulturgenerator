import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueImg from 'v-img' // full screen image slider

Vue.use(VueImg) 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
