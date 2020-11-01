import Vue from 'vue'
import VueRouter from 'vue-router'
import ArtworkList from '../views/ArtworkList.vue'
import ArtworkDetail from '../views/ArtworkDetail.vue'
import About from '../views/About.vue'
import Impressum from '../views/Impressum.vue'
import Faq from '../views/Faq.vue'
import PageNotFound from '../views/PageNotFound.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'artworkList',
    component: ArtworkList,
    meta: {
      menuItemsToDisplay: ['moneypool-balance']
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      menuItemsToDisplay: ['← KULTUR', 'GENERATOR', 'IMPRESSUM']
    }
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: Impressum,
    meta: {
      menuItemsToDisplay: ['← KULTUR', 'GENERATOR', 'IMPRESSUM']
    }
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq,
    meta: {
      menuItemsToDisplay: ['← KULTUR', 'GENERATOR', 'IMPRESSUM'],
      bluePageLayout: true
    }
  },
  {
    path: '/:author/:slug',
    name: 'artworkDetail',
    component: ArtworkDetail,
    meta: {
      menuItemsToDisplay: ['moneypool-balance', 'back-button']
    }
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: PageNotFound,
    meta: {
      menuItemsToDisplay: ['← KULTUR', 'GENERATOR', 'IMPRESSUM'],
      bluePageLayout: true
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // always hide payment info banner on route change
  if (store.state.paymentFeedback.show) {
    store.commit('UPDATE_PAYMENT_FEEDBACK', { show: false, state: 'hidden' })    
  }
  next()
  window.scrollTo({ top: 0 });
})

export default router
