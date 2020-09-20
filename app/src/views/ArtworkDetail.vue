<template>
  <div v-if="artwork" class="artwork-detail">
    <div class="carousel">
      <!-- vue-carousel from https://github.com/ssense/vue-carousel -->
      <carousel :perPage="1">
        <slide v-for="image in artworkImages" :key="image">
          <img :src="image" class="carousel__image">
        </slide>
      </carousel>
    </div>
    <div class="artwork-detail__title">
      <div class="artwork-detail__author">{{ artwork.author }}:</div>
      {{ artwork.title }}
    </div>
    <div class="artwork-detail__description" v-html="artwork.description"></div>
    <div ref="checkout" class="artwork-detail__checkout">
      <div class="artwork-detail__payment">
        <div class="artwork-detail__price">{{ artwork.price }}€</div>
        <button v-if="!showCheckout" class="artwork-detail__payment-button" @click="openCheckout()">kaufen</button>
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
      showCheckout: false,
    }
  },
  created () {
    if (!this.artwork) {
      this.$store.dispatch('getArtworkById', this.$route.params.id)
    }
  },
  computed: {
    artwork () {
      return this.$store.getters.getArtworkById(this.$route.params.id)
    },
    artworkImages () {
      return this.artwork.images.map(image => process.env.VUE_APP_API_BASEURL + image.url) || []
    }
  },
  methods: {
    openCheckout () {
      this.showCheckout = true
      this.$nextTick(() => {
        this.$refs.checkout.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }
}
</script>