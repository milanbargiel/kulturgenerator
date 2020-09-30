import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Use lazyload plugin globally
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
