<template>
  <span :style="{ width: balanceItemWidth }">{{ animatedBalance.toLocaleString() }}</span>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'MoneypoolBalance',
  data () {
    return {
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
    gsap.to(this.$data, { duration: this.balanceAnimationDuration, tweenedNumber: this.moneypoolBalance, ease: "power4.out" });
  },
  computed: {
    moneypoolBalance () {
      return this.$store.getters.roundedMoneypoolBalance
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