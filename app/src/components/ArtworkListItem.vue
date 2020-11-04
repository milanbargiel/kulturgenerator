<template>
    <router-link :class="['artwork-list-item link', { 'artwork-list-item--sold': isSoldOut }]" :style="styles" :to="{ name: 'artworkDetail', params: { author: this.authorSlug, slug: item.slug }}">
        <responsive-image class="artwork-list-item__image" :lazy-src="imgUrl" :lazy-srcset="srcSet" :aspectRatio="aspectRatio"></responsive-image>
        <span class="artwork-list-item__author">{{ item.author }}<br></span>
        <span class="artwork-list-item__title">{{ item.title }}<br></span> 
        <span class="artwork-list-item__price">{{ item.price }}€</span>
    </router-link>
</template>

<script>
import ResponsiveImage from '../components/ResponsiveImage'
import slugify from '@sindresorhus/slugify'

export default {
    name: 'ArtworkListItem',
    components: { ResponsiveImage },
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
            const regularImg = `${process.env.VUE_APP_API_BASEURL + this.imgVariant('large')} 1x, `
            const retinaImg = `${process.env.VUE_APP_API_BASEURL + this.imgVariant('x2')} 2x`

            return regularImg + retinaImg
        },
        aspectRatio() {
            // Calculate the aspect ratio of the image
            return (this.item.images[0].height / this.item.images[0].width) * 100;
        },
        isSoldOut () {
            return this.item.quantity < 1
        },
        authorSlug () {
            return slugify(this.item.author)
        },
        styles () {
            return {
                maxWidth: this.randomizedWidth + '%'
            }
        },
        viewportWidth () {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        },
        minWidth () {            
            if (this.viewportWidth < 680) {
                return 40 // width for small screens [%]
            }
            if (this.viewportWidth < 1500) {
                return 30 // width for medium screens [%]
            }
            return 20 // width for large screens [%]
        },
        randomizedWidth () {
            let maxAdded = Math.random() * 8; // maximum added to minWidth [%]

            if (this.item.type === 'Erlebnis') {
                return this.minWidth // do not randomize width of artworks of type "Erlebnis"
            }

            if (this.viewportWidth < 680) {
                // On mobile make artwork really wide every now and then (with probabilites)
                maxAdded = [maxAdded, maxAdded, maxAdded, maxAdded, maxAdded, 36]
                const randomIndex = Math.floor(Math.random() * maxAdded.length)
                return Math.floor(maxAdded[randomIndex] + this.minWidth)
            }
            
            return Math.floor(maxAdded + this.minWidth)
        }
    }
}
</script>