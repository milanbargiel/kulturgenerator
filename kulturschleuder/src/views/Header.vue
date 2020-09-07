<template>
    <div class="header">
        <div v-if="showBackButton" class="header__back-button">
            <router-link :to="{name: 'artworkList'}">
                <marquee-text
                    :repeat="20"
                    :duration="5">
                    <span class="header__back-arrow-icon" v-html="backArrowIcon"></span>
                </marquee-text>            
            </router-link>            
        </div>
        <moneypool-banner></moneypool-banner>
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import MoneypoolBanner from '../components/MoneypoolBanner'

export default {
    name: 'Header',
    components: { MarqueeText, MoneypoolBanner },
    computed: {
        showBackButton () {
            return this.$route.meta.showBackButton || false
        },
        backArrowIcon () {
            return "&#129120;" // TODO: exchange arrow icon
        }
    }
}
</script>