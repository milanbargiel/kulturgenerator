<template>
  <div>
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ hidden: isLoading }">
      <AppHeader />
      <Nuxt />
      <Newsletter />
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
}
</script>
