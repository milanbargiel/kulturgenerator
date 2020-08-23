<template>
    <div style="width: 450px">
        <img :src="titleImage" alt="" width="100%">
        <div>
            <router-link :to="{ name: 'artworkDetail', params: { id: item.id, author: item.author, title: item.title }}">
                {{ item.author }}: {{ item.title }}, {{ item.price }}€
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArtworkListItem',
    props: ['item'],
    computed: {
        titleImage () {
            return process.env.VUE_APP_API_BASEURL + this.item.images[0].url
        }
    }
}
</script>