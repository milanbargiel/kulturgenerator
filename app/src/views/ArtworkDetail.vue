<template>
  <div v-if="!isLoading" class="artwork-detail">
    <div class="carousel">
      <!-- vue-carousel from https://github.com/ssense/vue-carousel -->
      <carousel :perPage="1">
        <slide v-for="image in artworkImages" :key="image">
          <div class="carousel__image-container">
            <img :src="image" class="carousel__image">
          </div>
        </slide>
      </carousel>
    </div>     
    <div class="artwork-detail__author">{{ artwork.author }}:</div>
    <div class="artwork-detail__title">{{ artwork.title }}</div>
    <div class="artwork-detail__description" v-html="artwork.description"></div>
    <div class="artwork-detail__checkout">
      <div class="artwork-detail__payment">
        <div class="artwork-detail__payment-price-display">{{ artwork.price }}€</div>
        <button class="artwork-detail__payment-button">kaufen</button>
      </div>
      <div class="artwork-detail__generator-share">
        <div>{{ artwork.generatorShare }}%</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eligendi voluptatum eum, fugiat odio, nihil assumenda.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide} from 'vue-carousel'

export default {
  name: 'artworkDetail',
  components: { Carousel, Slide },
  data () {
    return {
      isLoading: true,
      artwork: {
        images: [],
        author: '',
        title: '',
        description: '',
        price: null,
        generatorShare: null,
      },
    }
  },
  mounted () {
    this.$store.dispatch('getArtworkById', this.$route.params.id)
    .then(response => {
      this.isLoading = false
      this.artwork = response
    })
  },
  computed: {
    artworkImages () {
      return this.artwork.images.map(image => process.env.VUE_APP_API_BASEURL + image.url) || []
    }
  }
}
</script>