<template>
  <div>
    <h3>List of Artworks:</h3>
    <p>
      <ul>
        <li v-for="artwork in artworks" :key="artwork.id">
          <artwork-list-item :item="artwork"></artwork-list-item>
        </li>
      </ul>
    </p>

  </div>
</template>

<script>
import axios from 'axios'
import ArtworkListItem from './ArtworkListItem.vue'

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
