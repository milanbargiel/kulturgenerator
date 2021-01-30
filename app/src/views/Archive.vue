<template>
  <div>
    <div class="archive-info text">In diesem Archiv finden Sie Arbeiten aus der ersten Runde des <span class="intext-title">kulturgenerators</span>. Die Runde lief vom 18. November 2020 bis zum 01. Februar 2021 und es wurden <span class="highlighted-text">7025€</span> für ein solidarisches Konto generiert, dass am Ende an alle teilnehmenden Künstler:innen ausgeschüttet wurde.</div>
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
      artworks: 'getArtworks'
    })
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
