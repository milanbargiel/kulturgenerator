<template>
    <marquee-text
        v-if="!isLoading"
        :repeat="repeatBalance"
        :duration="animationDuration">
        <div ref="balanceItem" class="marquee-text__item" :style="{ width: balanceItemWidth }">
            <span 
                v-anime="{ 
                    duration: 3000,
                    loop: false,
                    round: 1,
                    innerHTML: [0, balance],
                    easing: 'easeOutExpo'
                }"
            ></span>
        </div>
    </marquee-text>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'

export default {
    name: 'MoneypoolBanner',
    props: [ 'isLoading' ],
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
        },
        balanceItemWidth () {
            return this.balance.length * 30 + 'px' // 30 is approximately the width of a single number
        }
    }
}
</script>