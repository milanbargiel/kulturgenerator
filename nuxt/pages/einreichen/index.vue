<template>
    <div>
        <SubmitArtForm class="content" />
        <Footer />
    </div>
</template>

<script>
export default {
  name: 'Submit',
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
  }
}
</script>
