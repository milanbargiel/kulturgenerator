import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueImg from 'v-img' // full screen image slider
import VueMarkdown from 'vue-markdown-v2'
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'

Vue.use(VueImg) 
Vue.component('vue-markdown', VueMarkdown)
Vue.use(VueFormulate,  {
  plugins: [ de ]
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
