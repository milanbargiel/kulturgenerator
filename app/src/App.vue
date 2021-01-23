<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading }">
      <div v-if="isArtworkList" class="info-box">In <span class="highlighted-text">xx/yy/zz</span> ist die letzte Möglichkeit, Arbeiten aus der ersten Runde des <span class="intext-title">kulturgenerators</span> zu erwerben und somit das solidarische Konto aufzufüllen. Diese Online-Galerie ist ein Projekt auf Initiative des Kölner Kulturrats, der Niehler Freiheit e.V. und des Kunstzentrum Wachsfabrik. Für weitere Informationen klicken Sie auf die Laufleiste, die den aktuellen Kontostand anzeigt ↓</div>
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
