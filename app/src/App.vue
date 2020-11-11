<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading }">
      <div v-if="isArtworkList" class="info-box">Der <span class="intext-title">kulturgenerator</span> ist eine solidarische Online-Galerie auf Initiative des <a class="link" href="https://www.koelnerkulturrat.de/" target="_blank">Kölner Kulturrats</a>, der <a class="link" href="https://www.niehlerfreiheit.de/" target="_blank">Niehler Freiheit e.V.</a>und des<a class="link" href="https://kunstzentrum-wachsfabrik.de/" target="_blank"> Kunstzentrum Wachsfabrik.</a> Alle teilnehmende Kunst- und Kulturschaffende entscheiden selbst, ob und in welchem Umfang ihre Erlöse auf ein solidarisches Konto eingezahlt werden. Für weitere Informationen klicken Sie auf die Laufschrift, die den aktuellen Kontostand anzeigt ↓</div>
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
