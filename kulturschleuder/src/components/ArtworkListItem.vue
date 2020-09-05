<template>
    <div class="artwork__list__item" :style="styles">
        <img class="artwork__list__item-image" :src="titleImage">
        <router-link :to="{ name: 'artworkDetail', params: { id: item.id, author: item.author, title: item.title }}">
            <span class="artwork__list__item-label">{{ item.author }}: {{ item.title }}, </span>
            <span class="artwork__list__item-price">{{ item.price }}€</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArtworkListItem',
    props: ['item'],
    computed: {
        titleImage () {
            return process.env.VUE_APP_API_BASEURL + this.item.images[0].url
        },
        styles () {
            return 'width:' + Math.floor(Math.random()  * (650 - 250) + 250) + 'px;'
        },
    }
}
</script>