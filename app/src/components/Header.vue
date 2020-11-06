<template>
    <div class="header" v-if="!isLoading">
        <template v-for="(menuItem, index) in menuItems">
            <menu-item :item="menuItem" :key="'menu-item-' + index"></menu-item>
        </template>
        <payment-feedback-banner v-if="paymentFeedback.show" :state="paymentFeedback.state"></payment-feedback-banner>          
    </div>
</template>

<script>
import MenuItem from '../components/MenuItem'
import PaymentFeedbackBanner from '../components/PaymentFeedbackBanner'

export default {
    name: 'Header',
    props: ['isLoading'],
    components: { MenuItem, PaymentFeedbackBanner },
    computed: {
        menuItems () {
            return this.$store.state.menuItems
        },
        paymentFeedback () {
            return this.$store.state.paymentFeedback
        }
    }
}
</script>