<template>
  <router-link :class="['artwork-list-item link', { 'artwork-list-item--sold': isSoldOut }]" :style="styles" :to="{ name: 'artworkDetail', params: { author: this.authorSlug, slug: item.slug }}">
    <div v-if="isExperience" v-observe-visibility="{ callback: isViewable, once: true }" class="hover-slideshow artwork-list-item__image" @mouseover="triggerAnimation = true" @mouseleave="triggerAnimation = false">
      <responsive-image class="hover-slideshow-placeholder" :image="img"></responsive-image>
      <responsive-image v-for="image in images" :class="{ 'hover-slideshow-img': true, 'hover-slideshow-img--animate': triggerAnimation}" :key="image.id" :image="image"></responsive-image>
    </div>
    <responsive-image v-else class="artwork-list-item__image" :image="img"></responsive-image>
    <span class="artwork-list-item__author">{{ item.author }}<br></span>
    <span class="artwork-list-item__title">{{ item.title }}<br></span>
    <!-- Only show price, if the artwork is from an active round -->
    <span v-if="isFromActiveRound" class="artwork-list-item__price">{{ item.price }}€</span>
  </router-link>
</template>

<script>
import ResponsiveImage from '../components/ResponsiveImage'
import urlSlug from 'url-slug'

export default {
    name: 'ArtworkListItem',
    components: { ResponsiveImage },
    props: ['item'],
    data() {
      return {
        triggerAnimation: false,
      }
    },
    methods: {
      isViewable(isVisible) {
        if (this.viewportWidth < 680) { // for mobile trigger animation when object comes into viewport
          this.triggerAnimation = isVisible
        }
      }
    },
    computed: {
        img () {
          return this.item.images[0]
        },
        images () {
          return this.item.images
        },
        isExperience() {
          return this.item.type === 'Erlebnis'
        },
        isFromActiveRound() { // Items from an active round
          return this.item.status === 'ZweiteRunde'
        },
        isSoldOut () {
          // Only items from active round are highlighted as 'sold'
          return this.isFromActiveRound && this.item.quantity < 1
        },
        authorSlug () {
          return urlSlug(this.item.author)
        },
        styles () {
          return {
            width: this.item.images[0].width + 'px', // give element full width of image to reserve vertical space for lazy loading
            maxWidth: this.itemWidth + '%'
          }
        },
        viewportWidth () {
          return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        },
        minWidth () {            
          if (this.viewportWidth < 680) {
            return 35 // width for small screens [%]
          }
          if (this.viewportWidth < 1500) {
            return 22 // width for medium screens [%]
          }
          return 18 // width for large screens [%]
        },
        randomizedWidth () { // only for active rounds
          if (this.isExperience) {
            return this.minWidth // do not randomize width of artworks of type "Erlebnis"
          }

          const extremeFactor = this.viewportWidth > 680 ? 5 : 10; 
          return Math.floor(this.minWidth + this.item.randomWidthBase * extremeFactor)
        },
        archiveWidth () { // used for elements in the archive
          if (this.viewportWidth < 680) {
            return 45 // width for small screens [%]
          }

          return 12 // width for large screens [%]
        },
        itemWidth () {
          if (this.isFromActiveRound) {
            return this.randomizedWidth
          }

          return this.archiveWidth
        }
    }
}
</script>