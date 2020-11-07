import Vue from 'vue'
import VueRouter from 'vue-router'
import ArtworkList from '../views/ArtworkList.vue'
import ArtworkDetail from '../views/ArtworkDetail.vue'
import About from '../views/About.vue'
import Impressum from '../views/Impressum.vue'
import PurchaseConfirmation from '../views/PurchaseConfirmation.vue'
import PageNotFound from '../views/PageNotFound.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'artworkList',
    component: ArtworkList,
    meta: {
      menuItemTypesToDisplay: ['moneypool-balance'],
      stickyHeader: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      menuItemTypesToDisplay: ['custom-menu-item']
    }
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: Impressum,
    meta: {
      menuItemTypesToDisplay: ['custom-menu-item']    }
  },
  {
    path: '/:author/:slug',
    name: 'artworkDetail',
    component: ArtworkDetail,
    meta: {
      menuItemTypesToDisplay: ['moneypool-balance', 'back-button']
    }
  },
  {
    path: '/vielen-dank',
    name: 'purchaseConfirmation',
    component: PurchaseConfirmation,
    meta: {
      menuItemTypesToDisplay: ['thank-you-message', 'back-button']
    },
    beforeEnter: (to, from, next) => {
      if (from.name === 'artworkDetail') {
        next()
      } else {
        next({ name: 'artworkList' })
      }
    }
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: PageNotFound,
    meta: {
      menuItemTypesToDisplay: ['custom-menu-item'],
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
