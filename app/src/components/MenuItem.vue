<template>
    <div v-if="show" @mouseover="hover = true" @mouseleave="hover = false" class="header__menu-item link" :class="activeClass">
        <router-link
            v-if="show" 
            :to="{ name: item.viewName }"
        >
            <marquee-text
                :repeat="20"
                :duration="activeSpeed"
                :paused="hover">
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
        activeSpeed:{
            get () {
                if (this.item.viewName === this.$route.name || this.item.label === 'moneypool-balance') {
                    return 5
                }
                return 0                
            }
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