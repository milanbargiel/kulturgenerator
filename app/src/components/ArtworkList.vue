<template>
  <div>
    <div :class="['artwork-list', { 'artwork-list--archive': isArchive }]">
      <artwork-list-item v-for="artwork in artworks" :key="artwork.id" :item="artwork"></artwork-list-item>
    </div>
  </div>
</template>

<script>
import ArtworkListItem from '../components/ArtworkListItem.vue'

export default {
  name: 'ArtworkList',
  components: {
    ArtworkListItem,
  },
  props: ['artworks', 'isArchive'],
}
</script>
