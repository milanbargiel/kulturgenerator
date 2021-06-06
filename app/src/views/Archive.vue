<template>
  <div>
    <div class="content text">Hier sehen sie alle Arbeiten, die an der ersten und zweiten Runde des <span class="intext-title">kulturgenerators</span> beteiligt waren.</div>
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
