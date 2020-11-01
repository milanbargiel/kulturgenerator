<template>
    <div v-if="show" @mouseover="hover = true" @mouseleave="hover = false" class="menu-item" :class="classes">
        <router-link
            :to="{ name: item.viewName }"
        >
            <marquee-text
                :repeat="20"
                :duration="5"
                :paused="paused">
                <span class="marquee-text__item">{{ label }}</span>
            </marquee-text>       
        </router-link>        
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'

export default {
    name: 'MenuItem',
    props: ['item'],
    components: { MarqueeText },
    data () {
        return {
            hover: false
        }
    },
    computed: {
        show () {
            return this.$route.meta.menuItemsToDisplay.includes(this.item.label)
        },
        paused () {
            if (this.item.label === 'moneypool-balance' || this.item.label === 'back-button') {
                return false
            }
            return this.item.viewName !== this.$route.name
        },
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
        classes () {
            if (this.$route.name === 'about' && this.item.viewName === 'about') {
                return 'active active--orange'
            }
            if (this.$route.name === 'impressum' && this.item.viewName === 'impressum') {
                return 'active active--blue'
            }       
            return 'link'
        }        
    }
}
</script>