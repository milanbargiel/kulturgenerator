<template>
    <div class="header__menu-item link" :class="activeClass">
        <router-link :to="{ name: item.viewName }">
            <marquee-text
                :repeat="20"
                :duration="activeSpeed">
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
        },
        activeSpeed () {
            if (this.active || this.item.label === 'moneypool-balance') {
                return 5
            }
            return 0
        },
        activeClass () {
            if (this.$route.name === 'about' && this.item.viewName === 'about') {
                return 'active--orange'
            }
            if (this.$route.name === 'impressum' && this.item.viewName === 'impressum') {
                return 'active--blue'
            }       
            return ''     
        }        
    }
}
</script>