import Vue from 'vue'
import VueRouter from 'vue-router'
import ArtworkDetail from '../views/ArtworkDetail.vue'
import About from '../views/About.vue'
import Shop from '../views/Shop.vue'
import Impressum from '../views/Impressum.vue'
import Archive from '../views/Archive.vue'
import PurchaseConfirmation from '../views/PurchaseConfirmation.vue'
import NewsletterConfirmation from '../views/NewsletterConfirmation.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Submit from '../views/Submit.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'shop',
    component: Shop,
    meta: {
      hasStandardHeader: true,
    }
  },
  {
    path: '/info',
    name: 'info',
    component: About,
    meta: {
      hasStandardHeader: true,
      hasWhiteFooter: true
    }
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: Impressum,
    meta: {
      hasStandardHeader: true,
    }
  },
  {
    path: '/archiv',
    name: 'archive',
    component: Archive,
    meta: {
      hasArchiveHeader: true,
    }
  },
  {
    path: '/einreichen',
    name: 'submit',
    component: Submit,
    meta: {
      hasStandardHeader: true,
    }
  },
  {
    path: '/:author/:slug',
    name: 'artworkDetail',
    component: ArtworkDetail,
  },
  {
    path: '/newsletter-anmeldung',
    name: 'newsletterConfirmation',
    component: NewsletterConfirmation,
    meta: {
      hasThankYouHeader: true,
      hasNoNewsletter: true
    }
  },
  {
    path: '/vielen-dank',
    name: 'purchaseConfirmation',
    component: PurchaseConfirmation,
    meta: {
      hasThankYouHeader: true,
    },
    beforeEnter: (to, from, next) => { // prevent thank you page from being accessed directly
      if (from.name === 'artworkDetail' || to.query.debug) { // debug with /vielen-dank?debug=true
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
      hasStandardHeader: true,
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
  next()
  window.scrollTo({ top: 0 }) // always start at the top of a page when navigating
})

export default router
