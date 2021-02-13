<template>
  <div ref="header" class="header" v-if="!isLoading">
    <template v-for="(menuItem, index) in menuItems">
      <menu-item :item="menuItem" :key="'menu-item-' + index" :class="{ 'sticky': isSticky }"></menu-item>
    </template>       
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
      menuItems: [
        {
          label:"Vielen Dank!",
          speed:4,
          type:"thank-you-message",
          viewName: null
        },
        {
          name:"moneypool-balance",
          speed:0,
          type:"moneypool-balance",
          viewName:"about",
        },
        {
          label:"KULTUR GENERATOR",
          name:"Generator",
          speed:0,
          type:"custom-menu-item",
          viewName:"about",
        },
        {
          label:"ARCHIV",
          name:"Archiv",
          speed:0,
          type:"custom-menu-item",
          viewName:"archive",
        },
        {
          label:"IMPRESSUM",
          name:"Impressum",
          speed:0,
          type:"custom-menu-item",
          viewName:"impressum",
        }
      ],
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
  }
}
</script>