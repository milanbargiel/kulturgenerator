<template>
  <div class="content">
    <div class="purchase text">
      <div class="purchase__sucess">Herzlichen Glückwunsch, Ihr Kauf war erfolgreich!</div>
      <div class="purchase__instructions">
        <div class="purchase__img-container">
          <img class="purchase__img" src="https://xyz.kulturgenerator.org/uploads/large_o_t_plasterpainting_rose_0_cd4ae43334.jpeg">
        </div>
        <div class="purchase__message">
          <p>1 Sie erhalten eine Bestätigungsmail von Paypal.</p>
          <p>2 Die Anbieter*in nimmt Kontakt zu Ihnnen auf zur Vereeinbarung der Lieferung.</p>
          <p>3 Das Kunstwerk kommt zu Ihnen.</p>
        </div>
      </div>
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