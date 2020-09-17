<template>
    <div class="artwork-list-item" :style="styles">
        <img class="artwork-list-item__image" :src="titleImage">
        <router-link :to="{ name: 'artworkDetail', params: { id: item.id, author: item.author, title: item.title }}">
            <span class="artwork-list-item__author">{{ item.author }}: </span>
            <span class="artwork-list-item__title">{{ item.title }}, </span>
            <span class="artwork-list-item__price">{{ item.price }}€</span>
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
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            const minWidth = vw < 680 ? 30 : 20; // make artwork item wider on small devices
            return 'max-width:' + Math.floor(Math.random()  * 30 + minWidth) + '%;'
        },
    }
}
</script>