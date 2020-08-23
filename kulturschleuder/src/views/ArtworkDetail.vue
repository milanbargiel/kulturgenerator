<template>
    <div v-if="!isLoading" class="artwork__detail">
        <div class="artwork__detail__slider">
            <img v-for="image in artworkImages" :key="image" :src="image" style="height: 400px;">
        </div>     
        <div class="artwork__detail__author">{{ artwork.author }}:</div>
        <div class="artwork__detail__title">{{ artwork.title }}</div>
        <div class="artwork__detail__description" v-html="artwork.description"></div>
        <div class="artwork__detail__checkout">
            <div class="artwork__detail__payment">
                <div class="artwork__detail__payment-price-display">{{ artwork.price }}€</div>
                <button class="artwork__detail__payment-button">kaufen</button>
            </div>
            <div class="artwork__detail__generator-share">
                <div>{{ artwork.generatorShare }}%</div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eligendi voluptatum eum, fugiat odio, nihil assumenda doloribus inventore, libero magni esse. Necessitatibus distinctio facere adipisci, ducimus voluptas saepe quae nemo.
                </p>
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