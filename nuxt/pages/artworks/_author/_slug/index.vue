/* eslint-disable prettier/prettier */
<template>
  <div>
    <div v-if="artwork" class="artwork-detail content">
      <ClientOnly>
        <div class="carousel">
          <!-- vue-carousel from https://github.com/ssense/vue-carousel -->
          <carousel :per-page="1" :center-mode="true">
            <slide v-for="{ url, aspectRatio } in artworkImages" :key="url">
              <!-- v-img from https://github.com/crowdbotics/v-img -->
              <ResponsiveImage
                v-img:artworkGallery
                :src="url"
                class="carousel__image"
                :aspect-ratio="aspectRatio"
              />
            </slide>
          </carousel>
        </div>
      </ClientOnly>
      <div class="artwork-detail__title">
        <a
          v-if="artwork.website"
          class="artwork-detail__author link"
          :href="artwork.website"
          target="_blank"
          rel="noopener"
          >{{ artwork.author }}</a
        >
        <div v-else class="artwork-detail__author">{{ artwork.author }}</div>
        <br />
        {{ artwork.title }}
      </div>
      <ClientOnly>
        <vue-markdown class="artwork-detail__description">{{
          artworkDescription
        }}</vue-markdown>
      </ClientOnly>
      <div v-if="showPurchaseInformation">
        <div ref="checkout" class="artwork-detail__checkout">
          <div>
            <div class="artwork-detail__price">{{ artwork.price }}€</div>
            <div v-if="isSoldOut" class="artwork-detail__sold">VERKAUFT</div>
            <div
              v-if="!showCheckout && !isSoldOut"
              class="artwork-detail__quantity"
            >
              {{ artworkQuantity }}
            </div>
          </div>
          <div
            v-if="!showCheckout && !isSoldOut"
            class="artwork-detail__generator-share explain-text"
          >
            <span class="artwork-detail__share-percentage"
              >{{ artworkGeneratorShare }}%</span
            >
            des Preises werden auf ein solidarisches Konto eingezahlt, dessen
            Erlös am Ende unter den Teilnehmenden verteilt wird. Der aktuelle
            Kontostand wird in der Laufleiste angezeigt ↑
          </div>
        </div>
        <div
          v-if="!showCheckout && !isSoldOut"
          class="artwork-detail__payment-button"
        >
          <button class="button" @click="openCheckout()">zur kasse</button>
          <div class="explain-text">
            Die Kaufabwicklung wird mit
            <a
              href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full?locale.x=de_DE"
              target="_blank"
              rel="noopener"
              class="underlined-link"
              >PayPal</a
            >
            durchgeführt. Durch Anklicken von "ZUR KASSE" stimmen Sie der
            Verwendung von Cookies durch PayPal zu.
          </div>
        </div>
        <Checkout v-if="showCheckout" :artwork="artwork" />
      </div>
    </div>
    <AppFooter class="footer-detail" />
  </div>
</template>

<script>
export default {
  name: 'ArtworkDetail',
  async asyncData({ params, $axios, redirect, store }) {
    const artwork = await $axios.$get('/artworks/' + params.slug)
    //   .catch(() => {
    //     redirect('/404') // redirect to 404 page if artwork is not found
    //   })
    // store.commit('SET_LOADING_STATE', false)
    return { artwork }
  },
  data() {
    return {
      checkoutIsOpen: false,
    }
  },
  head() {
    return {
      title: `${this.artwork.title} - ${this.artwork.author}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.artwork.description}`,
        },
      ],
    }
  },
  computed: {
    artworkDescription() {
      const markdownLink = /\[(.*?)\]\((.*?)\)/g // that's regex syntax, dev tip: regexr.com
      const htmlLink =
        '<a class="link" href="$2" target="_blank" rel="noopener">$1</a>'
      return this.artwork.description.replace(markdownLink, htmlLink)
    },
    artworkImages() {
      const images = this.artwork.images.map(image => {
        // Get 'large' variant of image, if it exists
        // Otherwise, take the unresized one
        const url =
          process.env.baseUrl +
          (image.formats.large ? image.formats.large.url : image.url)
        const aspectRatio = (image.height / image.width) * 100
        return { url, aspectRatio }
      })

      return images
    },
    showPurchaseInformation() {
      // Only show purchase information if artwork is from active round
      // and all for payment process required fields are filled out
      const elementsToCheck = [
        this.artwork.price,
        this.artwork.shippingCosts,
        this.artwork.tax,
        this.artwork.quantity,
        this.artwork.paypal,
      ]
      const purchaseInformationComplete = elementsToCheck.reduce(
        (sum, next) =>
          sum &&
          typeof next !== 'undefined' &&
          next !== null &&
          next.toString().length !== 0,
        true
      )
      return (
        this.artwork.status === 'ZweiteRunde' && purchaseInformationComplete
      )
    },
    isSoldOut() {
      return this.artwork.quantity < 1
    },
    artworkQuantity() {
      if (this.artwork.quantity === 1) {
        return
      }
      if (!this.artwork.quantity) {
        return
      }
      return 'noch ' + this.artwork.quantity + ' verfügbar'
    },
    artworkGeneratorShare() {
      return this.artwork.generatorShare?.substring(1) // remove dummy underscore from generatorShare String
    },
    showCheckout() {
      return this.checkoutIsOpen
    },
  },
  mounted() {
    if (!this.artwork) {
      // this.$store.commit('SET_LOADING_STATE', true)
    }
  },
  methods: {
    openCheckout() {
      this.checkoutIsOpen = true
      this.$nextTick(() => {
        this.$refs.checkout.scrollIntoView({ behavior: 'smooth' })
      })
    },
  },
}
</script>
