<template>
  <div class="footer-container">
    <footer class="footer">
      <div class="founders">
        <div class="founders__header">Eine Initiative von</div>
        <div class="founders__logos">
          <a class="founder-link founder-link--kk" href="https://www.koelnerkulturrat.de/" target="_blank">
            <img class="founder-img" :src="kulturratLogo">
          </a>
          <a class="founder-link founder-link--wf" href="http://www.cafe-in-der-wachsfabrik.de/" target="_blank">
            <img class="founder-img" :src="wachsfabrikLogo">
          </a>
          <a class="founder-link founder-link--nf" href="https://niehlerfreiheit.de/" target="_blank">
            <img class="founder-img" :src="niehlerfreiheitLogo">
          </a>
        </div>
      </div>
      <div class="founders">
        <div class="founders__header">Gefördert durch</div>
        <div class="founders__logos">
          <a class="founder-link founder-link--sk" href="https://www.stadt-koeln.de/" target="_blank">
            <img class="founder-img" :src="kulturamtLogo">
          </a>
          <a class="founder-link founder-link--sk" href="https://www.rheinenergiestiftung.de/de/kultur/index.php" target="_blank">
            <img class="founder-img" :src="rheinenergieLogo">
          </a>          
        </div>
      </div>
      <div class="navigation">
        <a class="navigation-element link" href="mailto:info@kulturgenerator.org">info@kulturgenerator.org</a><br>
        <router-link :to="{name: 'impressum'}" class="navigation-element link">Impressum & Datenschutz</router-link>
      </div>
    </footer>
    <newsletter :class="{ 'newsletter--white': this.$route.meta.hasWhiteFooter}"></newsletter>
  </div>
</template>

<script>
import Newsletter from '../components/Newsletter'

export default {
  name: 'Footer',
  components: { Newsletter },
  computed: {
    kulturratLogo() {
      return this.$route.meta.hasWhiteFooter ? require('@/assets/kulturrat-white.svg') : require('@/assets/kulturrat.svg')
    },
    wachsfabrikLogo() {
      return this.$route.meta.hasWhiteFooter ? require('@/assets/wachsfabrik-white.svg') : require('@/assets/wachsfabrik.svg')
    },
    niehlerfreiheitLogo() {
      return this.$route.meta.hasWhiteFooter ? require('@/assets/niehlerfreiheit-white.svg') : require('@/assets/niehlerfreiheit.svg')
    },
    kulturamtLogo() {
      return this.$route.meta.hasWhiteFooter ? require('@/assets/kulturamt-white.svg') : require('@/assets/kulturamt.svg')
    },
    rheinenergieLogo() {
      return this.$route.meta.hasWhiteFooter ? require('@/assets/rheinenergie.svg') : require('@/assets/rheinenergie.svg')
    }
  }
}
</script>