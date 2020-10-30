<template>
    <marquee-text
        v-if="!isLoading"
        :repeat="repeatBalance"
        :duration="animationDuration">
        <div ref="balanceItem" class="marquee-text__item" :style="{ width: balanceItemWidth }">         
            <span>{{ animatedBalance.toLocaleString() }}</span>
        </div>       
    </marquee-text>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import gsap from 'gsap'

export default {
    name: 'MoneypoolBanner',
    props: [ 'isLoading' ],
    components: { MarqueeText },
    data () {
        return {
            tweenedNumber: 0,            
            repeatBalance: 10,
            animationDuration: 5,
        }
    },
    watch: {
        balance () {
            gsap.to(this.$data, { duration: 2.5, tweenedNumber: this.balance, ease: "power4.out" });
        }
    },
    computed: {
        animatedBalance: function() {
            return parseInt(this.tweenedNumber.toFixed(0))
        },        
        balance () {
            return this.$store.getters.roundedMoneypoolBalance
        },
        balanceItemWidth () {
            return this.balance.toString().length * 30 + 'px' // 30 is approximately the width of a single number
        }
    }
}
</script>