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
        <payment-feedback-banner v-if="paymentFeedback.show" :state="paymentFeedback.state"></payment-feedback-banner>          
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import MoneypoolBanner from '../components/MoneypoolBanner'
import PaymentFeedbackBanner from '../components/PaymentFeedbackBanner'

export default {
    name: 'Header',
    components: { MarqueeText, MoneypoolBanner, PaymentFeedbackBanner },
    computed: {
        showBackButton () {
            return this.$route.meta.showBackButton || false
        },
        paymentFeedback () {
            return this.$store.state.paymentFeedback
        }
    }
}
</script>