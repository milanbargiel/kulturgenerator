<template>
  <span :style="{ width: balanceItemWidth }" class="moneypool-balance">{{
    animatedBalance.toLocaleString()
  }}</span>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'MoneypoolBalance',
  data() {
    return {
      tweenedNumber: 0,
      balanceAnimationDuration: 2.5,
      moneypoolBalance: 200,
    }
  },
  async fetch() {
    const response = await this.$axios.$get(
      'https://xyz.kulturgenerator.org/moneypool'
    )
    this.moneypoolBalance = Math.round(response.currentBalance)
  },
  computed: {
    animatedBalance() {
      if (this.moneypoolBalance < 100) {
        return this.moneypoolBalance
      }
      return parseInt(this.tweenedNumber.toFixed(0))
    },
    balanceItemWidth() {
      let digits = this.moneypoolBalance.toString().length
      const digitWidth = 50
      if (digits >= 4) {
        digits += 1
      }
      return digits * digitWidth + 'px'
    },
  },
  watch: {
    moneypoolBalance() {
      gsap.to(this.$data, {
        duration: this.balanceAnimationDuration,
        tweenedNumber: this.moneypoolBalance,
        ease: 'power4.out',
      })
    },
  },
  mounted() {
    gsap.to(this.$data, {
      duration: this.balanceAnimationDuration,
      tweenedNumber: this.moneypoolBalance,
      ease: 'power4.out',
    })
  },
}
</script>
