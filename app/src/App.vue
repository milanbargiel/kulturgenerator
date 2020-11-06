<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading }">
      <div v-if="isArtworkList" class="info-box">Der <span class="intext-title">kulturgenerator</span> ist virtueller Laden und Kunstprojekt, generöse Maschine und Startschuss für eine Plattform, die spartenübergreifend die Facetten der Kölner Kulturszene abbildet. Er ist ein spieltheoretisches Experiment, in dem die Kulturschaffenden selbst entscheiden, ob und wie viel sie vom Erlös des Verkaufs ihrer Arbeit in ein solidarisches Konto einzahlen möchten. Erwerben Sie jetzt Kunst um das Projekt zu unterstützen ↓</div>
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
  created () {
    this.$store.dispatch('getShadowMoneypoolBalance')
    this.$store.dispatch('getMenuItems')
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ]),
    isArtworkList() {
      return (this.$route.name === 'artworkList') || false
    }
  }
}
</script>

<style lang="scss">
@import "styles/App.scss";
</style>
