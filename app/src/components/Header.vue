<template>
    <div class="header">
        <template v-for="menuItem in menuItems">
            <menu-item :item="menuItem" :active="isActive(menuItem)" :key="'menu-item-' + menuItem.id"></menu-item>
        </template>
        <payment-feedback-banner v-if="paymentFeedback.show" :state="paymentFeedback.state"></payment-feedback-banner>          
    </div>
</template>

<script>
import MenuItem from '../components/MenuItem'
import PaymentFeedbackBanner from '../components/PaymentFeedbackBanner'

export default {
    name: 'Header',
    components: { MenuItem, PaymentFeedbackBanner },
    computed: {
        menuItems () {
            const menuItems = []
            if (this.$route.name === 'about' || this.$route.name === 'impressum') {
                menuItems.push(...this.$store.state.menuItems)
            } else {
                menuItems.push({ label: 'moneypool-balance', viewName: 'about' })
                if (this.showBackButton) {
                    menuItems.push({ label: 'back-button', viewName: 'artworkList' })
                }
            }
            return menuItems
        },
        activeClass () {
            if (this.$route.name === 'about') {
                return 'active--orange'
            }
            if (this.$route.name === 'impressum') {
                return 'active--blue'
            }       
            return ''     
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
    },
    methods: {
        isActive (item) {
            return item.viewName === this.$route.name
        },        
    }
}
</script>