<template>
  <div>
    <div class="content text text--blue">Der <span class="intext-title">kulturgenerator</span> ist eine solidarische <span class="highlighted-text">Online-Galerie</span> auf Initiative des Kölner Kulturrats, der Niehler Freiheit e.V. und des Kunstzentrum Wachsfabrik. In der Galerie befinden sich <span class="highlighted-text">stetig neue Angebote</span>. Alle Teilnehmenden entscheiden selbst, ob und in welchem Umfang ihre Erlöse solidarisch verteilt werden. Der aktuelle Kontostand des <span class="highlighted-text">solidarischen Kontos</span> beträgt {{ moneypoolBalance }} EUR.
    </div>
    <artwork-list :artworks="artworks" :is-archive="true"></artwork-list>
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
