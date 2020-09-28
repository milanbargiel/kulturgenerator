<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">...lädt</div>
    <div v-show="!isLoading">
      <my-header></my-header>
      <router-view/> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyHeader from './components/Header'

export default {
  name: 'App',
  components: { MyHeader },
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
