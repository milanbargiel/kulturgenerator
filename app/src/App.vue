<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading, 'blue-content': isBluePage }">
      <my-header></my-header>
      <router-view/> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyHeader from './components/Header'

export default {
  name: 'App',
  components: { MyHeader },
  created () {
    this.$store.dispatch('getShadowMoneypoolBalance')
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ]),
    isBluePage () {
      return this.$route.meta.bluePageLayout || false
    }
  }
}
</script>

<style lang="scss">
@import "styles/App.scss";
</style>
