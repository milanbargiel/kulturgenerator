<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator">lädt</div>
    <div :class="{ 'hidden': isLoading }">
      <div v-if="isArtworkList" class="info-box">Willkommen im <span class="intext-title">kulturgenerator</span> – einer Initiative des <a class="underlined-link" href="https://www.koelnerkulturrat.de/" target="_blank">Kölner Kulturrats</a>, der Niehler Freiheit e.V. und des Kunstzentrum Wachsfabrik. Um Kunst- und Kulturschaffende zu unterstützen, können hier Kulturangebote eingereicht und erworben werden. Für weitere Informationen, klicken Sie auf die Laufschrift, die den aktuellen Kontostand des solidarischen Kontos anzeigt.↓</div>
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
