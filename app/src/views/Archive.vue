<template>
  <div>
    <div class="content text text--blue">Hier finden Sie alle Arbeiten aus der ersten Runde des <span class="intext-title">kulturgenerators</span>, einer solidarischen Online-Galerie auf Initiative des Kölner Kulturrats, der Niehler Freiheit e.V. und des Kunstzentrum Wachsfabrik. Vom 18. November 2020 bis zum 01. Februar 2021 wurden <span class="highlighted-text">7766,50€</span> für ein solidarisches Konto generiert, dass nun an alle teilnehmenden Künstler*innen anteilig ausgeschüttet wird.</div>
    <artwork-list :artworks="artworks" :is-archive="true"></artwork-list>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArtworkList from '../components/ArtworkList'
import MyFooter from '../components/Footer'

export default {
  name: 'Archive',
  components: {
    ArtworkList,
    MyFooter
  },
  computed: {
    ...mapGetters({
      artworks: 'getArchivedArtworks'
    })
  },
  created () {
    if (this.artworks.length <= 1) {
      this.$store.commit('SET_LOADING_STATE', true)      
      this.$store.dispatch('getArchivedArtworks')
        .then(() => this.$store.commit('SET_LOADING_STATE', false))
    }
  }
}
</script>
