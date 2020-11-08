<template>
  <div class="content">
    <div class="purchase text">
      <div class="purchase__sucess">Herzlichen Glückwunsch, Ihr Kauf war erfolgreich!</div>
      <div class="purchase__instructions">
        <div class="purchase__img-container">
          <responsive-image class="purchase__img" :src="artworkImage.url" :aspectRatio="artworkImage.aspectRatio"></responsive-image>
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
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
  },
  computed: {
    artworkImage () {
      // Get 'large' variant of first image, if it exists
      // Otherwise, take the unresized one
      const image = this.$route.params.artwork.images[0]
      const url = process.env.VUE_APP_API_BASEURL + (image.formats['large'] ? image.formats['large'].url : image.url)
      const aspectRatio = (image.height / image.width) * 100;
      return { url, aspectRatio }
    },
  }
}
</script>