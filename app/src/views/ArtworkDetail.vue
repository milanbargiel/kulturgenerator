<template>
  <div v-if="artwork" class="artwork-detail">
    <div class="carousel">
      <!-- vue-carousel from https://github.com/ssense/vue-carousel -->
      <carousel 
        :perPage="1" 
        :centerMode=true
        :navigationEnabled=true
        navigationPrevLabel="←"
        navigationNextLabel="→">
        <slide v-for="image in artworkImages" :key="image">
          <img :src="image" class="carousel__image">
        </slide>
      </carousel>
    </div>
    <div class="artwork-detail__title">
      <div class="artwork-detail__author">{{ artwork.author }}:</div>
      {{ artwork.title }}
    </div>
    <div class="artwork-detail__description" v-html="artwork.description">
    </div>
    <div ref="checkout" class="artwork-detail__checkout">
      <div class="artwork-detail__payment">
        <div class="artwork-detail__price">{{ artwork.price }}€</div>
        <div v-if="isSoldOut" class="artwork-detail__sold">VERKAUFT</div>
        <div v-else class="artwork-detail__quantity">{{ artworkQuantity }}</div>        
        <button v-if="!showCheckout && !isSoldOut" class="artwork-detail__payment-button" @click="openCheckout()">kaufen</button>
      </div>
      <div class="artwork-detail__generator-share">
        <div class="artwork-detail__share-percentage">{{ artwork.generatorShare }}%</div>
        des Preises werden auf ein solidarisches Konto eingezahlt, dessen Erlös am Ende unter allen Teilnehmenden verteilt wird. Der aktuelle Kontostand ist in der Laufleiste ↑
      </div>
    </div>
    <checkout v-if="showCheckout" :artwork="artwork"></checkout>
  </div>
</template>

<script>
import { Carousel, Slide} from 'vue-carousel'
import Checkout from '../components/Checkout'

export default {
  name: 'artworkDetail',
  components: { Carousel, Slide, Checkout },
  data () {
    return {
      checkoutIsOpen: false
    }
  },
  mounted () {
    if (!this.artwork) {
      this.$store.commit('SET_LOADING_STATE', true)
      this.$store.dispatch('getArtworkById', this.$route.params.id)
        .then(() => {
          this.$store.commit('SET_LOADING_STATE', false)
        })
    }
  },
  computed: {
    artwork () {
      return this.$store.getters.getArtworkBySlug(this.$route.params.slug)
    },
    artworkImages () {
      return this.artwork.images.map(image => process.env.VUE_APP_API_BASEURL + image.url) || []
    },
    isSoldOut () {
      return this.artwork.quantity < 1
    },
    artworkQuantity () {
      if (this.artwork.quantity === 1) {
        return
      }
      if (!this.artwork.quantity) {
        return
      }
      return 'noch ' + this.artwork.quantity + ' verfügbar'
    },
    showCheckout () {
      return this.checkoutIsOpen && !this.showPaymentInfo
    },
    showPaymentInfo () {
      return this.$store.state.paymentInfo.show
    }
  },
  watch : {
    showCheckout (newVal) {
      if (newVal === false) {
        window.scrollTo({ top: 0 });
      }
    } 
  },
  methods: {
    openCheckout () {
      this.$store.commit('SET_PAYMENT_INFO', { show: false, state: 'hidden' })
      this.checkoutIsOpen = true
      this.$nextTick(() => {
        this.$refs.checkout.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }
}
</script>