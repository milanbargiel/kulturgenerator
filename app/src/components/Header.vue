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
    // Listen to scroll event to attach sticky header
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.headerPosition = this.$refs.header.offsetTop
      this.scrollPosition = window.scrollY
      
      if (this.$route.meta.stickyHeader && (this.scrollPosition > this.headerPosition)) {
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
    }
  }
}
</script>