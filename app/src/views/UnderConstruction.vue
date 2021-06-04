<template>
  <div class="under-construction">
    <div class="content text">
      <div class="hourglass hourglass--construction">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
              

      <div>
      Wie kann Solidarität innerhalb der Kunst- und Kulturszene aussehen? Der <span class="intext-title intext-title--blue">kulturgenerator</span> ist eine solidarische Online-Galerie auf Initiative des Kölner Kulturrats, der Niehler Freiheit e.V. und des Kunstzentrum Wachsfabrik. Alle Teilnehmenden entscheiden selbst, ob und in welchem Umfang ihre Erlöse solidarisch verteilt werden. <span class="highlighted-text">Diese Seite befindet sich im Umbau.</span> Tragen Sie sich im Newsletter ein, um über Neuigkeiten auf dem Laufenden gehalten zu werden.</div></div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '../components/Footer'

export default {
  name: 'Archive',
  components: {
    MyFooter
  },
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
  }
}
</script>
