<template>
  <span :style="{ width: balanceItemWidth }" class="moneypool-balance">{{
    animatedBalance.toLocaleString()
  }}</span>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'MoneypoolBalance',
  props: {
    balance: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tweenedNumber: 0,
      balanceAnimationDuration: 2.5,
    }
  },
  computed: {
    animatedBalance() {
      if (this.balance < 100) {
        return this.balance
      }
      return parseInt(this.tweenedNumber.toFixed(0))
    },
    balanceItemWidth() {
      let digits = this.balance.toString().length
      const digitWidth = 50
      if (digits >= 4) {
        digits += 1
      }
      return digits * digitWidth + 'px'
    },
  },
  watch: {
    balance() {
      gsap.to(this.$data, {
        duration: this.balanceAnimationDuration,
        tweenedNumber: this.balance,
        ease: 'power4.out',
      })
    },
  },
  mounted() {
    gsap.to(this.$data, {
      duration: this.balanceAnimationDuration,
      tweenedNumber: this.balance,
      ease: 'power4.out',
    })
  },
}
</script>
