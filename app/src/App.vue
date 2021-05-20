<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading }">
      <hourglass></hourglass>
      <my-header></my-header>
      <router-view/> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyHeader from './components/Header'
import Hourglass from './components/Hourglass'

export default {
  name: 'App',
  components: { MyHeader, Hourglass },
  created () {
    this.$store.dispatch('getShadowMoneypoolBalance')
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  }
}
</script>

<style lang="scss">
@import "styles/App.scss";
</style>
