<template>
    <div>
        <img v-for="image in artworkImages" :key="image" :src="image" alt="" width="400">
        <div>{{ artwork.author }}</div>
        <div>{{ artwork.title }}</div>
        <div>{{ artwork.description }}</div>
        <div>
            <div>
                paybutton
            </div>
            <div>
                50% / 100% dontation explanation
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'artworkDetail',
    data () {
        return {
            artwork: {
                images: [],
                author: '',
                title: '',
                description: '',
                price: null,
                generatorShare: null,
            }
        }
    },
    mounted () {
        axios.get(process.env.VUE_APP_API_BASEURL + '/artworks/' + this.$route.params.id)
            .then(response => {
                this.artwork = response.data
            })
    },
    computed: {
        artworkImages () {
            return this.artwork.images.map(image => process.env.VUE_APP_API_BASEURL + image.url)
        }
    }
}
</script>