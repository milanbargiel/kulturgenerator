<template>
  <div class="menu-item" :class="{ active: isActive, link: linksTo }">
    <router-link :tag="tag" :to="linksTo">
      <marquee-text
        :repeat="20"
        :duration="speed"
        :paused="paused">
          <span class="marquee-text__item"><slot></slot></span>
        </marquee-text>
    </router-link>
</div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'

export default {
  name: 'MenuItem',
  props: ['label', 'type', 'viewName', 'bannerSpeed'],
  components: { MarqueeText },
  data () {
    return {
      hover: false,
    }
  },
  computed: {
    tag () {
      return this.viewName ? 'a' : 'div' // only render valid routes as links
    },
    paused () {
      // show shop as selected when on artwork detail page
      if (this.viewName === 'shop' && this.$route.name === 'artworkDetail') {
        return false
      }

      // back-button is never paused
      if (this.type === 'back-button') {
        return false;
      }

      return this.viewName !== this.$route.name
    },
    isActive () {
      return this.$route.name === this.viewName
    },
    linksTo () {
      // back-button links always to shop
      if (this.type === 'back-button') {
        return { name: 'shop' };
      }

      return this.viewName ? { name: this.viewName } : ''
    },
    speed () {
      return this.bannerSpeed ? 10 - this.bannerSpeed : 7
    }
  }
}
</script>