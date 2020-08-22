import Vue from 'vue'
import VueRouter from 'vue-router'
import Restaurants from '../views/Restaurants.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'restaurants',
    component: Restaurants
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
