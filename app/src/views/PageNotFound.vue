<template>
    <div class="content">
      <div class="text">
            <span class="intext-title">Diese Seite existiert nicht.</span>
        </div>
        <my-footer class="text"></my-footer>
    </div>
</template>

<script>
import MyFooter from '../components/Footer'

export default {
  name: 'PageNotFound',
  components: {
    MyFooter
  },
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
}
}
</script>