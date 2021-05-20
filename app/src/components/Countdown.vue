<template>
  <span class="highlighted-text">{{days}}T {{hours}}Std {{minutes}}Min {{seconds}}Sek</span>
</template>

<script>
export default {
  name: 'Countdown',
  data () {
    return {
      interval: null,
      endDate: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervals:{
        second: 1000,
        minute: 1000 * 60,
        hour: 1000 * 60 * 60,
        day: 1000 * 60 * 60 * 24
      }
    }
  },
  mounted () {
    this.endDate = new Date('June 06, 2021 00:00:00');
    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  },
  methods: {
    updateCountdown() {
      let diff = Math.abs(Date.now() - this.endDate.getTime());
      this.days = Math.floor(diff / this.intervals.day);
      diff -= this.days * this.intervals.day;
      this.hours = Math.floor(diff / this.intervals.hour);   
      diff -= this.hours * this.intervals.hour;
      this.minutes = Math.floor(diff / this.intervals.minute);
      diff -= this.minutes * this.intervals.minute;
      this.seconds = Math.floor(diff / this.intervals.second);
    }
  }
}
</script> 