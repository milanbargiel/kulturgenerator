<template>
    <div class="header">
        <template v-if="$route.name === 'about' || $route.name === 'impressum'">
            <div v-for="menuItem in menuItems" :key="'menu-item' + menuItem.id" class="header__menu-item">
                <router-link :to="{ name: menuItem.viewName }" class="link">
                    <marquee-text
                        :repeat="20"
                        :duration="5">
                        <span class="marquee-text__item">{{ menuItem.label }}</span>
                    </marquee-text>       
                </router-link>            
            </div>               
        </template>
        <!-- <router-link v-if="showToShopButton" :to="{name: 'artworkList'}" class="header__to-shop-btn link">
            ← shop
        </router-link> -->
        <router-link v-else class="link" :to="{name: 'about'}" >
            <moneypool-banner></moneypool-banner>
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
    components: { MarqueeText, MoneypoolBanner, PaymentFeedbackBanner },
    computed: {
        menuItems () {
            return this.$store.state.menuItems
        },
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