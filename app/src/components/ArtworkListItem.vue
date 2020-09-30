<template>
    <div class="artwork-list-item" :style="styles">
        <img class="artwork-list-item__image" :v-lazy="imgUrl" :srcset="srcSet">
        <router-link class="artwork-list-item__link" :to="{ name: 'artworkDetail', params: { id: item.id, author: item.author, title: item.title }}">
            <span class="artwork-list-item__author">{{ item.author }}: </span>
            <span class="artwork-list-item__title">{{ item.title }}</span>, 
            <span class="artwork-list-item__price">{{ item.price }}€</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArtworkListItem',
    props: ['item'],
    methods: {
        imgVariant (breakpoint) {
            const img = this.item.images[0]
            let url = img.url // unresized image url
            
            // return resized url for breakpoint if present
            for (const format in img.formats) {
                if (format === breakpoint && img.formats[breakpoint]) { 
                    url = img.formats[breakpoint].url
                }
            }

            return url
        }
    },
    computed: {
        imgUrl () {
            // Get 'large' variant of image, if existent
            // If not, take the unresized one
            return process.env.VUE_APP_API_BASEURL + this.imgVariant('large')
        },
        srcSet () {
            // Create srcset attribute for responsive images
            const regularImg = `${process.env.VUE_APP_API_BASEURL + this.imgVariant('large')} 1x,`
            const retinaImg = `${process.env.VUE_APP_API_BASEURL + this.imgVariant('x2')} 2x`

            return regularImg + retinaImg
        },
        styles () {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            const minWidth = vw < 680 ? 30 : 20; // make artwork item wider on small devices
            return 'max-width:' + Math.floor(Math.random()  * 30 + minWidth) + '%;'
        },
    }
}
</script>