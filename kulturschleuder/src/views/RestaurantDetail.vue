<template>
    <div>details for {{ restaurant.Title}}, {{ restaurant.seats }} Seats</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RestaurantDetail',
    data () {
        return {
            restaurant: {}
        }
    },
    mounted () {
        axios.get(process.env.VUE_APP_API_BASEURL + '/restaurants/' + this.$route.params.id)
            .then(response => {
                this.restaurant = response.data
            })
    }
}
</script>