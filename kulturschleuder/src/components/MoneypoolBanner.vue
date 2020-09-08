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
            balance: '0.00'
        }
    }
}
</script>