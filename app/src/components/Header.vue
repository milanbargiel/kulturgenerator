<template>
    <div class="header">
        <div v-if="showBackButton" class="header__back-button">
            <router-link :to="{name: 'artworkList'}">
                <marquee-text
                    :repeat="20"
                    :duration="5">
                    <span class="marquee-text__item">←</span>
                </marquee-text>            
            </router-link>            
        </div>
        <moneypool-banner v-bind:class="{ 'moneypool-banner--border': showBackButton }"></moneypool-banner>
        <payment-info-banner v-if="paymentInfo.show" :state="paymentInfo.state"></payment-info-banner>          
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import MoneypoolBanner from '../components/MoneypoolBanner'
import PaymentInfoBanner from '../components/PaymentInfoBanner'

export default {
    name: 'Header',
    components: { MarqueeText, MoneypoolBanner, PaymentInfoBanner },
    computed: {
        showBackButton () {
            return this.$route.meta.showBackButton || false
        },
        paymentInfo () {
            return this.$store.state.paymentInfo
        }
    }
}
</script>