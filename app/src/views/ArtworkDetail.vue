<template>
    <div v-if="!isLoading" class="artwork__detail">
        <div class="artwork__detail__slider">
            <!-- vue-carousel from https://github.com/ssense/vue-carousel -->
            <carousel 
                :perPage="1"
                >
                <slide v-for="image in artworkImages" :key="image">
                    <div class="artwork__detail__slider__image-container">
                        <img :src="image" class="artwork__detail__slider__image">
                    </div>
                </slide>
            </carousel>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eligendi voluptatum eum, fugiat odio, nihil assumenda.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { Carousel, Slide} from 'vue-carousel'

export default {
    name: 'artworkDetail',
    components: { Carousel, Slide },
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
        this.$store.dispatch('getArtworkById', this.$route.params.id)
            .then(response => {
                this.isLoading = false
                this.artwork = response
            })
    },
    computed: {
        artworkImages () {
            return this.artwork.images.map(image => process.env.VUE_APP_API_BASEURL + image.url) || []
        }
    }
}
</script>