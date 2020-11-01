<template>
    <div class="menu-item link">
        <router-link :to="{ name: item.viewName }">
            <marquee-text
                :repeat="20"
                :duration="5">
                <span class="marquee-text__item">{{ label }}</span>
            </marquee-text>       
        </router-link>
    </div>    
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'

export default {
    name: 'MenuItem',
    props: ['item', 'active'],
    components: { MarqueeText },
    computed: {
        label () {
            if (this.item.label === 'back-button') {
                return '←'
            }
            if (this.item.label === 'moneypool-balance') {
                return this.moneypoolBalance
            }
            return this.item.label
        },
        moneypoolBalance () {
            return this.$store.getters.roundedMoneypoolBalance
        }
    }
}
</script>