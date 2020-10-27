<template>
  <div>
    <div class="Info">
      <div class="body"><p> Der <span class="intext-title">kulturgenerator</span> ist eine solidarische Online-Galerie. Kulturschaffende entscheiden selbst, ob und wie viel sie vom Erlös des Verkaufs ihrer Arbeit in ein gemeinsames Konto einzahlen möchten. Der Kontostand ist oben zu sehen  <span class="intext-pfeile">↑</span></p></div>
    </div>

  <div class="artwork-list">
      <artwork-list-item v-for="artwork in artworks" :key="artwork.id" :item="artwork"></artwork-list-item>
    </div>
  <my-footer class="content"></my-footer>
  </div>
  </template>
  

  

<script>
import { mapGetters } from 'vuex'
import ArtworkListItem from '../components/ArtworkListItem.vue'
import MyFooter from '../components/Footer'


export default {
  name: 'ArtworkList',
  components: {
    ArtworkListItem,
    MyFooter
  },
  data () {
    return {
      artworkCount: 1,
    }
  },
  computed: {
    ...mapGetters({
      artworks: 'getRandomizedArtworks'
    }),
    partialArtworks () {
      return this.artworks.slice(0, this.artworkCount).reverse()
    }
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
