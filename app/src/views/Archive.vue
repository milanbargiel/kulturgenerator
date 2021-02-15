<template>
  <div>
    <div class="content text">Hier sehen sie alle Arbeiten, die an der ersten Runde des <span class="intext-title">kulturgenerators</span> beteiligt waren. Sie wurde am 01.02.2021 mit der Ausschüttung des solidarischen Kontos in Höhe von 7766,50 EUR durch den Verkauf von 38 Arbeiten abgeschlossen. Für die 50 Teilnehmenden be- deutet dies, dass jede*r einen Betrag von 153,41 EUR erhalten hat. Wenn Sie Arbeiten davon kaufen wollen, treten Sie bitte mit uns in Kontakt.</div>
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
