<template>
    <div class="content">
        <submit-art-form></submit-art-form>
        <my-footer></my-footer>
    </div>
</template>

<script>
import SubmitArtForm from '../components/SubmitArtForm'
import MyFooter from '../components/Footer'

export default {
  name: 'Submit',
  components: {
    SubmitArtForm,
    MyFooter
  },
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
  }
}
</script>