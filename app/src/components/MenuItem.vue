<template>
  <div 
  @mouseover="hover = true"
  @mouseleave="hover = false"
  class="menu-item"
  :class="classes"
  >
  <router-link :tag="tag" :to="{ name: viewName }">
    <marquee-text
    :repeat="20"
    :duration="bannerSpeed"
    :paused="paused">
    <span v-if="type === 'moneypool-balance'" class="marquee-text__item marquee-text__item--euro" :style="{ width: balanceItemWidth }">{{ animatedBalance.toLocaleString() }}</span>	
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
  props: ['label', 'type', 'viewName', 'bannerSpeed'],
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
    if (this.type === 'moneypool-balance') {
      gsap.to(this.$data, { duration: this.balanceAnimationDuration, tweenedNumber: this.moneypoolBalance, ease: "power4.out" });
    } else if (this.type === 'back-button') {
      this.viewName = 'about'
    }
  },
  computed: {
    tag () {
      return this.viewName ? 'a' : 'div' // only render valid routes as links
    },
    paused () {
      // show archive as selected when on artwork detail page
      if (this.viewName === 'archive' && this.$route.name === 'artworkDetail') {
        return false
      }

      return this.viewName !== this.$route.name
    },
    active () {
      return this.$route.name === this.viewName
    },
    moneypoolBalance () {
      return this.$store.getters.roundedMoneypoolBalance
    },
    classes () {
      if (this.active) {
        return 'active';
      }

            return this.viewName ? 'link' : '' // apply hover effect only to valid routes
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