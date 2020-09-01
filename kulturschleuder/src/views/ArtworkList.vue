<template>
  <div @click="incrementIndex()">
    <div style="display:flex; flex-wrap: wrap;">
        <artwork-list-item v-for="artwork in partialArtworks" :key="artwork.id" :item="artwork" class="artwork__list__item"></artwork-list-item>
        <!-- <artwork-list-item v-for="artwork in partialArtworks" :key="artwork.id + 'y'" :item="artwork" class="artwork__list__item"></artwork-list-item> -->
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import ArtworkListItem from '../components/ArtworkListItem.vue'

export default {
  name: 'ArtworkList',
  components: {
      ArtworkListItem
  },
  data () {
    return {
      index: 1,
      artworks: []
    }
  },
  computed: {
     partialArtworks () {
      return this.artworks.slice(0, this.index).reverse()
    }
  },
  created () {
    axios.get(process.env.VUE_APP_API_BASEURL + '/artworks')
      .then(response => {
        this.artworks = response.data
          .map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
      })
  },
  methods: {
    incrementIndex () {
      this.index++
    }
  }
}
</script>
