<template>
  <div class="content">
    <div class="purchase text">
      <div class="purchase__sucess">Herzlichen Glückwunsch, Ihr Kauf war erfolgreich!</div>
      <div class="purchase__instructions">
        <div class="purchase__img-container">
          <responsive-image v-if="artwork" class="purchase__img" :src="artworkImage.url" :aspectRatio="artworkImage.aspectRatio"></responsive-image>
        </div>
        <div class="purchase__message">
          <p>1 Sie erhalten eine Bestätigungsmail von Paypal.</p>
          <p>2 Die Anbieter*in nimmt Kontakt zu Ihnnen auf zur Vereeinbarung der Lieferung.</p>
          <p>3 Das Kunstwerk kommt zu Ihnen.</p>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '../components/Footer'
import ResponsiveImage from '../components/ResponsiveImage'

export default {
  name: 'PurchaseConfirmation',
  components: {
    MyFooter,
    ResponsiveImage
  },
  data () {
    return {
      artwork: null
    }
  },
  created () {
    if (this.$route.params.artwork) {
      this.artwork = this.$route.params.artwork
    } else { // load dummy artwork for debug mode /vielen-dank?debug=true
      this.$store.commit('SET_LOADING_STATE', true)
      this.$store.dispatch('getArtworkBySlug', 'irische-landschaft')
        .then((response) => {
          this.$store.commit('SET_LOADING_STATE', false)
          this.artwork = response.data
        })
    }
  },
  computed: {
    artworkImage () {
      // Get 'large' variant of first image, if it exists
      // Otherwise, take the unresized one
      const image = this.artwork.images[0]
      const url = process.env.VUE_APP_API_BASEURL + (image.formats['large'] ? image.formats['large'].url : image.url)
      const aspectRatio = (image.height / image.width) * 100;
      return { url, aspectRatio }
    },
  }
}
</script>