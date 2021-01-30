<template>
  <div 
  v-if="show"
  @mouseover="hover = true"
  @mouseleave="hover = false"
  class="menu-item"
  :class="classes"
  >
  <router-link :tag="tag" :to="{ name: item.viewName }">
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
      this.item.viewName = 'archive'
    }
  },
  computed: {
    tag () {
      return this.item.viewName ? 'a' : 'div' // only render valid routes as links
    },
    show () {
      return this.$route.meta.menuItemTypesToDisplay.includes(this.item.type)
    },
    paused () {
      if (this.item.type !== 'custom-menu-item') {
        return false
      }

      // show archive as selected when on artwork detail page
      if (this.item.viewName === 'archive' && this.$route.name === 'artworkDetail') {
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
      if (this.active) {
        return 'active' + 
        ' active--background-' + this.item.activeBackgroundColor +
        ' active--color-' + this.item.activeFontColor
      }

            return this.item.viewName ? 'link' : '' // apply hover effect only to valid routes
          },
          itemSpeed () {
            return 10 - this.item.speed
          },
          animatedBalance: function() {	
            if (this.moneypoolBalance < 100) {
              return this.moneypoolBalance
            }
            return parseInt(this.tweenedNumber.toFixed(0))
          },	
          balanceItemWidth () {
            let digits = this.moneypoolBalance.toString().length
            const digitWidth = 50
            if (digits >= 4) {
              digits += 1
            }
            return digits * digitWidth + 'px'        
          }        
        }
      }
      </script>