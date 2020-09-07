<template>
    <div class="moneypool__banner">
        <marquee-text
            :repeat="repeatBalance"
            :duration="animationDuration">
            <span class="moneypool__banner__balance-item">{{ balance }}</span>
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
            balance: '20.000'
        }
    }
}
</script>