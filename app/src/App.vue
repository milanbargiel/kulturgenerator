<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading }">
      <div v-if="isArtworkList" class="info-box">Der <span class="intext-title">kulturgenerator</span> ist eine solidarische <span class="highlighted-text">Online-Galerie</span> auf Initiative des Kölner Kulturrats, der Niehler Freiheit e.V. und des Kunstzentrum Wachsfabrik. In der Galerie befinden sich <span class="highlighted-text">stetig neue Angebote</span>. Alle Teilnehmenden entscheiden selbst, ob und in welchem Umfang ihre Erlöse solidarisch verteilt werden. Für weitere Informationen klicken Sie auf die Laufleiste, die den aktuellen Kontostand des <span class="highlighted-text">solidarischen Kontos</span> anzeigt ↓</div>
      <my-header :isLoading="isLoading"></my-header>
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
