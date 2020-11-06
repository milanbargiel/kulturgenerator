import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueImg from 'v-img' // full screen image slider
import VueMarkdown from 'vue-markdown-v2'

Vue.use(VueImg)
Vue.component('vue-markdown', VueMarkdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
