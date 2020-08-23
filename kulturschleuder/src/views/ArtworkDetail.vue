<template>
    <div>
        <img src="" alt="">
        <div>order.author</div>
        <div>order.title</div>
        <div>order.description</div>
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
    name: 'Artwork',
    data () {
        return {
            order: {}
        }
    },
    mounted () {
        axios.get(process.env.VUE_APP_API_BASEURL + '/orders/' + this.$route.params.id)
            .then(response => {
                this.order = response.data
            })
    }
}
</script>