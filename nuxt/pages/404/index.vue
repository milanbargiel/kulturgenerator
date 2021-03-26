<template>
  <div class="content">
    <div class="text">
      <span class="intext-title">Diese Seite existiert nicht.</span>
    </div>
    <!-- Maybe MyFooter? -->
    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  created() {
    // this.$store.commit('SET_LOADING_STATE', false)
  },
}
</script>
