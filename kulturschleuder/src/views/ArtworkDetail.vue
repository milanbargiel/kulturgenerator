<template>
    <div v-if="!isLoading">
        <div style="display: flex;">
            <img v-for="image in artworkImages" :key="image" :src="image" style="height: 400px;">
        </div>     
        <div>{{ artwork.author }}</div>
        <div>{{ artwork.title }}</div>
        <div v-html="artwork.description"></div>
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
    components: { },
    data () {
        return {
            isLoading: true,
            artwork: {
                images: [],
                author: '',
                title: '',
                description: '',
                price: null,
                generatorShare: null,
            },
        }
    },
    mounted () {
        axios.get(process.env.VUE_APP_API_BASEURL + '/artworks/' + this.$route.params.id)
            .then(response => {
                this.isLoading = false
                this.artwork = response.data
            })
    },
    computed: {
        artworkImages () {
            return this.artwork.images.map(image => process.env.VUE_APP_API_BASEURL + image.url) || []
        }
    }
}
</script>