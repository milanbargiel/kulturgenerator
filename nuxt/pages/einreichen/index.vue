<template>
  <div>
    <SubmitArtForm class="content" />
    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'Submit',
  head() {
    return {
      title: 'Einreichen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Was möchten Sie einreichen?',
        },
      ],
    }
  },
  created() {
    // this.$store.commit('SET_LOADING_STATE', false)
  },
}
</script>
