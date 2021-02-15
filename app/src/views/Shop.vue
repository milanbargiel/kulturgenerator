<template>
  <div>
    <div class="content text text--blue">Wie kann Solidarität innerhalb der Kunst- und Kulturszene aussehen? Der <span class="intext-title">kulturgenerator</span> ist eine solidarische Online-Galerie auf Initiative des Kölner Kulturrats, der Niehler Freiheit e.V. und des Kunstzentrum Wachsfabrik. Alle Teilnehmenden entscheiden selbst, ob und in welchem Umfang ihre Erlöse solidarisch verteilt werden. Neben Objekten, werden auch Erlebnisse in Form von Gutscheinen angeboten. Der aktuelle Kontostand des solidarischen Kontos beträgt {{ moneypoolBalance }} EUR.
    </div>
    <artwork-list :artworks="artworks"></artwork-list>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArtworkList from '../components/ArtworkList'
import MyFooter from '../components/Footer'

export default {
  name: 'Shop',
  components: {
    ArtworkList,
    MyFooter
  },
  computed: {
    ...mapGetters({
      artworks: 'getArtworks'
    }),
    moneypoolBalance () {
      return this.$store.getters.roundedMoneypoolBalance
    },
  },
  created () {
    if (this.artworks.length <= 1) {
      this.$store.commit('SET_LOADING_STATE', true)      
      this.$store.dispatch('getArtworks')
        .then(() => this.$store.commit('SET_LOADING_STATE', false))
    }
  }
}
</script>
