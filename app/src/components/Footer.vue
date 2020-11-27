<template>
  <div class="footer-container">
    <footer class="footer">
      <div class="navigation">
        <a :class="navigationElementClass" href="mailto:info@kulturgenerator.org"><span :class="underlinedLinkClass">info@kulturgenerator.org</span></a><br>
        <a :class="navigationElementClass" href="https://www.instagram.com/kulturgenerator" target="_blank"><span :class="underlinedLinkClass">Instagram</span></a><br>
        <router-link :to="{name: 'impressum'}" :class="navigationElementClass"><span :class="underlinedLinkClass">Impressum + Datenschutz</span></router-link>
      </div>
      <div class="founders">
        <div class="founders__logos">
          <a class="founder-link founder-link--kk" href="https://www.koelnerkulturrat.de/" target="_blank">
            <img class="founder-img" :src="kulturratLogo">
          </a>
          <a class="founder-link founder-link--wf" href="https://kunstzentrum-wachsfabrik.de/" target="_blank">
            <img class="founder-img" :src="wachsfabrikLogo">
          </a>
          <a class="founder-link founder-link--nf" href="https://niehlerfreiheit.de/" target="_blank">
            <img class="founder-img" :src="niehlerfreiheitLogo">
          </a>
          <span class="breaker"></span>
          <a class="founder-link founder-link--sponsors" href="https://www.stadt-koeln.de/" target="_blank">
            <img class="founder-img" :src="kulturamtLogo">
          </a>
          <a class="founder-link founder-link--sponsors" href="https://www.rheinenergiestiftung.de/de/kultur/index.php" target="_blank">
            <img class="founder-img" :src="rheinenergieLogo">
          </a>          
        </div>
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
    navigationElementClass() {
      return {
        'navigation-element': true,
        'navigation-element--white': this.$route.meta.hasWhiteFooter
      }
    },
    underlinedLinkClass() {
      return {
        'underlined-link': true,
        'underlined-link--white': this.$route.meta.hasWhiteFooter
      }
    },
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
      return this.$route.meta.hasWhiteFooter ? require('@/assets/rheinenergie-white.svg') : require('@/assets/rheinenergie.svg')
    }
  }
}
</script>