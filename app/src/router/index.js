import Vue from 'vue'
import VueRouter from 'vue-router'
import ArtworkList from '../views/ArtworkList.vue'
import ArtworkDetail from '../views/ArtworkDetail.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'artworkList',
    component: ArtworkList
  },
  {
    path: '/:author/:id/:title',
    name: 'artworkDetail',
    component: ArtworkDetail,
    meta: {
      showBackButton: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // always hide payment info banner on route change
  if (store.state.paymentInfo.show) {
    store.commit('SET_PAYMENT_INFO', { show: false, state: 'hidden' })    
  }
  next()
})

export default router
