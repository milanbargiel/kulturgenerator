<template>
    <div 
        v-if="show"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        class="menu-item"
        :class="classes"
        >
        <router-link :to="{ name: item.viewName }">
            <marquee-text
                :repeat="20"
                :duration="itemSpeed"
                :paused="paused">
                <span v-if="item.type === 'moneypool-balance'" class="marquee-text__item marquee-text__item--euro" :style="{ width: balanceItemWidth }">{{ animatedBalance.toLocaleString() }}</span>	
                <span v-else class="marquee-text__item">{{ label }}</span>
            </marquee-text>
        </router-link>
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import gsap from 'gsap'

export default {
    name: 'MenuItem',
    props: ['item'],
    components: { MarqueeText },
    data () {
        return {
            hover: false,
            tweenedNumber: 0,
            balanceAnimationDuration: 2.5
        }
    },
    watch: {	
        moneypoolBalance () {	
            gsap.to(this.$data, { duration: this.balanceAnimationDuration, tweenedNumber: this.moneypoolBalance, ease: "power4.out" });	
        }	
    },    
    created () {
        if (this.item.type === 'moneypool-balance') {
            gsap.to(this.$data, { duration: this.balanceAnimationDuration, tweenedNumber: this.moneypoolBalance, ease: "power4.out" });
        } else if (this.item.type === 'back-button') {
            this.item.viewName = 'artworkList'
        }
    },
    computed: {
        show () {
            return this.$route.meta.menuItemTypesToDisplay.includes(this.item.type)
        },
        paused () {
            if (this.item.type !== 'custom-menu-item') {
                return false
            }
            return this.item.viewName !== this.$route.name
        },
        active () {
            return this.$route.name === this.item.viewName
        },
        label () {
            return this.item.label
        },
        moneypoolBalance () {
            return this.$store.getters.roundedMoneypoolBalance
        },
        classes () {
            if (this.$route.meta.bluePageLayout) {
                return 'menu-item--blue-layout'
            }
            if (this.active) {
                return 'active' + 
                    ' active--background-' + this.item.activeBackgroundColor +
                    ' active--color-' + this.item.activeFontColor
            }
            return 'link'
        },
        itemSpeed () {
            return 10 - this.item.speed
        },
        animatedBalance: function() {	
            return parseInt(this.tweenedNumber.toFixed(0))
        },	
        balanceItemWidth () {	
            return this.moneypoolBalance.toString().length * 50 + 'px' // 50 is approximately the width of a single number
        }        
    }
}
</script>