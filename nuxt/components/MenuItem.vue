<template>
  <div class="menu-item" :class="{ active: isActive, link: linksTo }">
    <a
      v-if="type === 'moneypool-balance'"
      href="https://www.paypal.com/paypalme/kulturgenerator"
      rel="noopener"
      target="_blank"
    >
      <marquee-text :repeat="20" :duration="speed" :paused="paused">
        <span class="marquee-text__item"><slot></slot></span>
      </marquee-text>
    </a>
    <nuxt-link :tag="tag" :to="linksTo">
      <marquee-text :repeat="20" :duration="speed" :paused="paused">
        <span class="marquee-text__item"><slot></slot></span>
      </marquee-text>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['label', 'type', 'viewName', 'bannerSpeed'],
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    tag() {
      return this.viewName ? 'a' : 'div' // only render valid routes as links
    },
    paused() {
      // show shop as selected when on artwork detail page
      if (
        this.viewName === 'shop' &&
        (this.$route.name === 'index' ||
          this.$route.name === 'artworks-author-slug')
      ) {
        return false
      }

      // back-button is never paused
      if (this.type === 'back-button') {
        return false
      }

      // archive-header is never paused
      if (this.type === 'archive-header') {
        return false
      }

      return this.viewName !== this.$route.name
    },
    isActive() {
      return this.$route.name === this.viewName
    },
    linksTo() {
      // back-button links always to shop
      if (this.type === 'back-button') {
        return '/'
      }

      if (this.viewName === 'shop') {
        return '/'
      }

      return this.viewName ? { name: this.viewName } : ''
    },
    speed() {
      return this.bannerSpeed ? 10 - this.bannerSpeed : 7
    },
  },
}
</script>
