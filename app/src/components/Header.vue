<template>
  <div ref="header" class="header">
    <template v-for="(menuItem, index) in menuItems">
      <menu-item :item="menuItem" :key="'menu-item-' + index" :class="{ 'sticky': isSticky }"></menu-item>
    </template>
    <payment-feedback-banner v-if="paymentFeedback.show" :state="paymentFeedback.state"></payment-feedback-banner>          
  </div>
</template>

<script>
import MenuItem from '../components/MenuItem'
import PaymentFeedbackBanner from '../components/PaymentFeedbackBanner'

export default {
  name: 'Header',
  components: { MenuItem, PaymentFeedbackBanner },
  data() {
    return {
      isSticky: false,
      scrollPosition: 0,
      headerPosition: 0
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.isArtworkList) {
        return;
      }
      this.headerPosition = this.$refs.header.offsetTop
      this.scrollPosition = window.scrollY

      if (this.scrollPosition > this.headerPosition){
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    }
  },
  computed: {
    menuItems () {
      return this.$store.state.menuItems
    },
    paymentFeedback () {
      return this.$store.state.paymentFeedback
    },
    isArtworkList() {
      return (this.$route.name === 'artworkList') || false
    }
  }
}
</script>