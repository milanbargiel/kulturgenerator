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
            if (this.item.name === 'moneypool-balance') {
                return this.moneypoolBalance
            }
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
        }
    }
}
</script>