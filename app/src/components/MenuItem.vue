<template>
  <div class="menu-item" :class="{ active: isActive }">
    <router-link :to="linksTo">
      <marquee-text
        :repeat="20"
        :duration="10"
        :paused="paused">
          <moneypool-balance v-if="showMoneypool" class="marquee-text__item marquee-text__item--euro"></moneypool-balance>
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
      return this.viewName ? { name: this.viewName } : { name: 'shop' } // link to shop when nothing else is specified
    },
    showMoneypool () {
      // Only show moneypool on shop page
      return this.type === 'moneypool-balance' && this.$route.name === 'shop';
    }
  }
}
</script>