<template>
    <div class="header">
        <router-link v-if="showToShopButton" :to="{name: 'artworkList'}" class="header__to-shop-btn link">
            ← shop
        </router-link>
        <router-link v-else class="link" :to="{name: 'about'}" >
            <moneypool-banner :isLoading="isLoading"></moneypool-banner>
        </router-link>
        <div v-if="showBackButton" class="header__back-button">
            <router-link :to="{name: 'artworkList'}">
                <marquee-text
                    :repeat="20"
                    :duration="5">
                    <span class="marquee-text__item">←</span>
                </marquee-text>       
            </router-link>            
        </div>
        <payment-feedback-banner v-if="paymentFeedback.show" :state="paymentFeedback.state"></payment-feedback-banner>          
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import MoneypoolBanner from '../components/MoneypoolBanner'
import PaymentFeedbackBanner from '../components/PaymentFeedbackBanner'

export default {
    name: 'Header',
    props: [ 'isLoading' ],
    components: { MarqueeText, MoneypoolBanner, PaymentFeedbackBanner },
    computed: {
        showBackButton () {
            return this.$route.meta.showBackButton || false
        },
        showToShopButton () {
            return this.$route.meta.showToShopButton || false
        },
        paymentFeedback () {
            return this.$store.state.paymentFeedback
        }
    }
}
</script>