<template>
    <marquee-text
        :repeat="repeatBalance"
        :duration="animationDuration">
        <span class="marquee-text__item">{{ balance }} </span>
    </marquee-text>
</template>


<script>
import MarqueeText from 'vue-marquee-text-component'

export default {
    name: 'MoneypoolBanner',
    components: { MarqueeText },
    data () {
        return {
            repeatBalance: 10,
            animationDuration: 5,
        }
    },
    computed: {
        balance () {
            return this.$store.getters.roundedMoneypoolBalance
        }
    }
}
</script>