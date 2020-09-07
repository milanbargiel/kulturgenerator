import Vue from 'vue'
import VueRouter from 'vue-router'
import ArtworkList from '../views/ArtworkList.vue'
import ArtworkDetail from '../views/ArtworkDetail.vue'

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

export default router
