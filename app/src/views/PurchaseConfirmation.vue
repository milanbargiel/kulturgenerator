<template>
    <div class="content">
      <div class="text">
            <span class="intext-title">Ihr Kauf war erfolgreich.</span>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyFooter from '../components/Footer'

export default {
  name: 'PurchaseConfirmation',
  components: {
    MyFooter
  },
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
  }
}
</script>