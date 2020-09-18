<template>
  <div v-if="!isLoading" class="artwork-detail">
    <div class="carousel">
      <!-- vue-carousel from https://github.com/ssense/vue-carousel -->
      <carousel 
        :perPage="1" 
        navigationEnabled="true"
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
    <div class="artwork-detail__description" v-html="artwork.description"></div>
    <div class="artwork-detail__checkout">
      <div class="artwork-detail__payment">
        <div class="artwork-detail__price">{{ artwork.price }}€</div>
        <button class="artwork-detail__payment-button">kaufen</button>
      </div>
      <div class="artwork-detail__generator-share">
        <div class="artwork-detail__share-percentage">{{ artwork.generatorShare }}%</div>
        des Preises werden auf ein solidarisches Konto eingezahlt, dessen Erlös am Ende unter allen Teilnehmenden verteilt wird. Der aktuelle Kontostand ist in der Laufleiste ↑
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