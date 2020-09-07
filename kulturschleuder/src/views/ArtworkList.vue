<template>
  <div @click="addItem()">
    <div class="artwork__list">
        <artwork-list-item v-for="artwork in artworks" :key="artwork.id" :item="artwork" class="artwork__list__item"></artwork-list-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArtworkListItem from '../components/ArtworkListItem.vue'

export default {
  name: 'ArtworkList',
  components: {
      ArtworkListItem
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
    if (!this.artworks.length > 0) {
      this.$store.dispatch('getArtworks')
    }
  },
  methods: {
    addItem () {
      this.artworkCount++
    }
  }
}
</script>
