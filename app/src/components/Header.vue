<template>
  <div ref="header" class="header" v-if="!isLoading">
    <div v-if="hasStandardHeader">
      <menu-item label="INFO" viewName="info">
      </menu-item>
      <menu-item label="EINREICHEN" viewName="submit">
      </menu-item>
      <menu-item v-if="isShopView" type="moneypool-balance" viewName="shop">
      </menu-item>
      <menu-item v-else label="SHOP" viewName="shop">
      </menu-item>
    </div>
    <div v-if="hasThankYouHeader">
      <menu-item label="Vielen Dank!">
      </menu-item>
      <menu-item label="←" linksTo="shop">
      </menu-item>
    </div>
  </div>
</template>

<script>
import MenuItem from '../components/MenuItem'

export default {
  name: 'Header',
  props: ['isLoading'],
  components: { MenuItem },
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
    hasStandardHeader() {
      return this.$route.meta.hasStandardHeader ? true : false
    },
    hasThankYouHeader() {
      return this.$route.meta.hasThankYouHeader ? true : false
    },
    isShopView() {
      return this.$route.name === 'shop';
    }
  }
}
</script>