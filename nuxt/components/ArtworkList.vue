<template>
  <div>
    <div :class="['artwork-list', { 'artwork-list--archive': isArchive }]">
      <ArtworkListItem
        v-for="artwork in artworks"
        :key="artwork.id"
        :item="artwork"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtworkList',
  props: ['artworks', 'isArchive'],
}
</script>
