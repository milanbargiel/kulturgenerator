<template>
  <div>
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading }">
      <myHeader />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
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
