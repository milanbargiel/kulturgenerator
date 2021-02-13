<template>
  <div class="menu-item" :class="classes">
    <router-link :to="linksTo">
      <marquee-text
        :repeat="20"
        :duration="10"
        :paused="paused">
          <moneypool-balance v-if="type === 'moneypool-balance'" class="marquee-text__item marquee-text__item--euro"></moneypool-balance>
          <span v-else class="marquee-text__item">{{ label }}</span>
        </marquee-text>
    </router-link>
</div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import MoneypoolBalance from '../components/MoneypoolBalance.vue'

export default {
  name: 'MenuItem',
  props: ['label', 'type', 'viewName'],
  components: { MarqueeText, MoneypoolBalance },
  data () {
    return {
      hover: false,
    }
  },
  computed: {
    paused () {
      // show archive as selected when on artwork detail page
      if (this.viewName === 'shop' && this.$route.name === 'artworkDetail') {
        return false
      }

      return this.viewName !== this.$route.name
    },
    active () {
      return this.$route.name === this.viewName
    },
    classes () {
      if (this.active) {
        return 'active';
      }

      return this.viewName ? 'link' : '' // apply hover effect only to valid routes
    },
    linksTo () {
      return this.viewName ? { name: this.viewName } : { name: 'shop' } // link to shop when nothing else is specified
    }      
  }
}
</script>