<template>
  <div>
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ hidden: isLoading }">
      <AppHeader />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    this.$store.dispatch('getShadowMoneypoolBalance')
  },
}
</script>
