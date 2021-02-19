<template>
  <div>
    <div class="hourglass">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <countdown class="hourglass-countdown"></countdown>
  </div>
</template>

<script>
import Countdown from './Countdown'
export default {
  name: 'Hourglass',
  components: {
    Countdown,
  },
}
</script>