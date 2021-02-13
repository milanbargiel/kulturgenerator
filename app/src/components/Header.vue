<template>
  <div ref="header" class="header" v-if="!isLoading">
    <menu-item label = "INFO" type= "custom-menu-item" viewName = "about" :bannerSpeed="bannerSpeed">
    </menu-item>
    <menu-item label = "EINREICHEN" type= "custom-menu-item" viewName = "submit" :bannerSpeed="bannerSpeed">
    </menu-item>
    <menu-item label = "IMPRESSUM" type= "custom-menu-item" viewName = "impressum" :bannerSpeed="bannerSpeed">
    </menu-item>
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
      bannerSpeed: 10,
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