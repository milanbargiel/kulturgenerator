import Vue from 'vue'
import VueRouter from 'vue-router'
import Restaurants from '../views/Restaurants.vue'
import RestaurantDetail from '../views/RestaurantDetail.vue'
import ArtworkDetail from '../views/ArtworkDetail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/:id',
    name: 'restaurantDetail',
    component: RestaurantDetail
  },
  {
    path: '/:author/:title',
    name: 'detail',
    component: ArtworkDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
