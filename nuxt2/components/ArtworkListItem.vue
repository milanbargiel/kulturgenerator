<template>
  <router-link
    :class="[
      'artwork-list-item link',
      { 'artwork-list-item--sold': isSoldOut },
    ]"
    :style="styles"
    :to="{
      name: 'artworkDetail',
      params: { author: authorSlug, slug: item.slug },
    }"
  >
    <ResponsiveImage
      class="artwork-list-item__image"
      :lazy-src="imgUrl"
      :lazy-srcset="srcSet"
      :aspectRatio="aspectRatio"
    />
    <span class="artwork-list-item__author">{{ item.author }}<br /></span>
    <span class="artwork-list-item__title">{{ item.title }}<br /></span>
    <!-- Only show price, if the artwork is from an active round -->
    <span v-if="isFromActiveRound" class="artwork-list-item__price"
      >{{ item.price }}€</span
    >
  </router-link>
</template>

<script>
import urlSlug from 'url-slug'

export default {
  name: 'ArtworkListItem',
  props: ['item'],
  computed: {
    imgUrl() {
      // Get 'large' variant of image, if existent
      // If not, take the unresized one
      return process.env.baseUrl + this.imgVariant('large')
    },
    srcSet() {
      // Create srcset attribute for responsive images
      const regularImg = `${
        process.env.baseUrl + this.imgVariant('large')
      } 1x, `
      const retinaImg = `${process.env.baseUrl + this.imgVariant('x2')} 2x`

      return regularImg + retinaImg
    },
    aspectRatio() {
      // Calculate the aspect ratio of the image
      return (this.item.images[0].height / this.item.images[0].width) * 100
    },
    isFromActiveRound() {
      // Items from an active round
      return this.item.status === 'ZweiteRunde'
    },
    isSoldOut() {
      // Only items from active round are highlighted as 'sold'
      return this.isFromActiveRound && this.item.quantity < 1
    },
    authorSlug() {
      return urlSlug(this.item.author)
    },
    styles() {
      return {
        width: this.item.images[0].width + 'px', // give element full width of image to reserve vertical space for lazy loading
        maxWidth: this.itemWidth + '%',
      }
    },
    viewportWidth() {
      return Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
    },
    minWidth() {
      if (this.viewportWidth < 680) {
        return 35 // width for small screens [%]
      }
      if (this.viewportWidth < 1500) {
        return 22 // width for medium screens [%]
      }
      return 18 // width for large screens [%]
    },
    randomizedWidth() {
      // only for active rounds
      if (this.item.type === 'Erlebnis') {
        return this.minWidth // do not randomize width of artworks of type "Erlebnis"
      }

      const extremeFactor = this.viewportWidth > 680 ? 5 : 10
      return Math.floor(
        this.minWidth + this.item.randomWidthBase * extremeFactor
      )
    },
    archiveWidth() {
      // used for elements in the archive
      if (this.viewportWidth < 680) {
        return 45 // width for small screens [%]
      }

      return 12 // width for large screens [%]
    },
    itemWidth() {
      if (this.isFromActiveRound) {
        return this.randomizedWidth
      }

      return this.archiveWidth
    },
  },
  methods: {
    imgVariant(breakpoint) {
      const img = this.item.images[0]
      let url = img.url // unresized image url

      // return resized url for breakpoint if present
      for (const format in img.formats) {
        if (format === breakpoint && img.formats[breakpoint]) {
          url = img.formats[breakpoint].url
        }
      }

      return url
    },
  },
}
</script>
