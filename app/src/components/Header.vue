<template>
  <div ref="header" :class="{'header': true, 'header--sticky': showMoneypool }" v-if="!isLoading">
    <div v-if="hasStandardHeader">
      <menu-item viewName="info">INFO
      </menu-item>
      <menu-item viewName="submit">EINREICHEN
      </menu-item>
      <menu-item v-if="showMoneypool" :class="{ 'sticky': isSticky }" viewName="shop"><moneypool-balance></moneypool-balance>
      </menu-item>
      <menu-item v-else viewName="shop">SHOP</menu-item>
    </div>
    <div v-if="hasThankYouHeader">
      <menu-item>Vielen Dank!
      </menu-item>
      <menu-item type="back-button">←
      </menu-item>
    </div>
  </div>
</template>

<script>
import MenuItem from '../components/MenuItem'
import MoneypoolBalance from '../components/MoneypoolBalance.vue'

export default {
  name: 'Header',
  props: ['isLoading'],
  components: { MenuItem, MoneypoolBalance },
  data() {
    return {
      isSticky: false,
      scrollPosition: 0,
      headerHeight: 0
    }
  },
  created () {
    // Listen to scroll event to attach sticky header
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.headerHeight = this.$refs.header.offsetHeight
      this.scrollPosition = window.scrollY

      if (this.showMoneypool && (this.scrollPosition > this.headerHeight)) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    }
  },
  computed: {
    hasStandardHeader() {
      return this.$route.meta.hasStandardHeader ? true : false
    },
    hasThankYouHeader() {
      return this.$route.meta.hasThankYouHeader ? true : false
    },
    showMoneypool () {
      // Only show moneypool on shop page
      return this.$route.name === 'shop';
    },
  }
}
</script>