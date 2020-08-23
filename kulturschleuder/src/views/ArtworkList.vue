<template>
  <div>
    <h3>List of Artworks:</h3>
    <div style="display:flex; flex-wrap: wrap;">
        <artwork-list-item v-for="artwork in artworks" :key="artwork.id" :item="artwork"></artwork-list-item>
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
      artworks: []
    }
  },
  created () {
    axios.get(process.env.VUE_APP_API_BASEURL + '/artworks')
      .then(response => {
        this.artworks = response.data
      })
  }
}
</script>
