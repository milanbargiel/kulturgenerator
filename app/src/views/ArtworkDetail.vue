<template>
  <div v-if="artwork" class="artwork-detail">
    <div class="carousel">
      <!-- vue-carousel from https://github.com/ssense/vue-carousel -->
      <carousel 
        :perPage="1" 
        :centerMode=true>
        <slide v-for="{ url, aspectRatio } in artworkImages" :key="url">
          <!-- v-img from https://github.com/crowdbotics/v-img -->
          <responsive-image v-img:artworkGallery :src="url" class="carousel__image" :aspectRatio="aspectRatio"></responsive-image>
        </slide>
      </carousel>
    </div>
    <div class="artwork-detail__title">
      <a v-if="artwork.website" class="artwork-detail__author link" :href="artwork.website" target="_blank" rel="noopener">{{ artwork.author }}:</a>
      <div v-else class="artwork-detail__author">{{ artwork.author }}</div>
      {{ artwork.title }}
    </div>
    <div class="artwork-detail__description" v-html="artwork.description">
    </div>
    <div ref="checkout" class="artwork-detail__checkout">
      <div class="artwork-detail__payment">
        <div class="artwork-detail__price">{{ artwork.price }}€</div>
        <div v-if="isSoldOut" class="artwork-detail__sold">VERKAUFT</div>
        <div v-else class="artwork-detail__quantity">{{ artworkQuantity }}</div>        
        <div v-if="!showCheckout && !isSoldOut" class="artwork-detail__payment-button" >
          <button class="button" @click="openCheckout()">kaufen</button>
        </div>
      </div>      
      <div class="artwork-detail__generator-share">
        <div class="artwork-detail__share-percentage">{{ artworkGeneratorShare }}%</div>
        des Preises werden auf ein solidarisches Konto eingezahlt, dessen Erlös am Ende unter allen Teilnehmenden verteilt wird. Der aktuelle Kontostand ist in der Laufleiste ↑
      </div>
    </div>
    <checkout v-if="showCheckout" :artwork="artwork"></checkout>
  </div>
</template>

<script>
import { Carousel, Slide} from 'vue-carousel'
import Checkout from '../components/Checkout'
import ResponsiveImage from '../components/ResponsiveImage'

export default {
  name: 'artworkDetail',
  components: { Carousel, Slide, Checkout, ResponsiveImage },
  data () {
    return {
      checkoutIsOpen: false
    }
  },
  mounted () {
    if (!this.artwork) {
      this.$store.commit('SET_LOADING_STATE', true)
      this.$store.dispatch('getArtworkBySlug', this.$route.params.slug)
        .then(() => {
          this.$store.commit('SET_LOADING_STATE', false)
        })
        .catch(() => {
          this.$router.push('/404') } // redirect to 404 page if artwork is not found
        )
    }
  },
  computed: {
    artwork () {
      return this.$store.getters.getArtworkBySlug(this.$route.params.slug)
    },
    artworkImages () {
      const images = this.artwork.images.map(image => {
        // Get 'large' variant of image, if it exists
        // Otherwise, take the unresized one
        const url = process.env.VUE_APP_API_BASEURL + (image.formats['large'] ? image.formats['large'].url : image.url)
        const aspectRatio = (image.height / image.width) * 100;
        return { url, aspectRatio }
      }) 

      return images
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
    artworkGeneratorShare () {
      return this.artwork.generatorShare.substring(1); // remove dummy underscore from generatorShare String
    },
    showCheckout () {
      return this.checkoutIsOpen && !this.showPaymentFeedback
    },
    showPaymentFeedback () {
      return this.$store.state.paymentFeedback.show
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
      this.$store.commit('UPDATE_PAYMENT_FEEDBACK', { show: false, state: 'hidden' })
      this.checkoutIsOpen = true
      this.$nextTick(() => {
        this.$refs.checkout.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }
}
</script>