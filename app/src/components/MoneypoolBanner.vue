<template>
    <div class="moneypool-banner">
        <marquee-text
            :repeat="repeatBalance"
            :duration="animationDuration">
            <span class="marquee-text__item">{{ balance }}</span>
        </marquee-text>
    </div>
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
            // Math.floor to hide decimals
            // toLocaleString is native js function to add the point for 1000s
            return Math.floor(this.$store.state.shadowMoneypoolBalance).toLocaleString(undefined, { minimumFractionDigits: 0 })
        }
    }
}
</script>