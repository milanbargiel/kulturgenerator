<template>
  <div>
    <div v-if="hasStandardHeader" ref="header" :class="{'header': true, 'header--sticky': showMoneypool }">
      <menu-item viewName="info">INFO
        </menu-item>
        <menu-item viewName="submit">EINREICHEN
        </menu-item>
        <menu-item v-if="showMoneypool" :class="{ 'sticky': isSticky }" viewName="shop" type="moneypool-balance" bannerSpeed="7"><moneypool-balance></moneypool-balance>
        </menu-item>
        <menu-item v-else viewName="shop">SHOP</menu-item>
    </div>
    <div v-if="hasThankYouHeader" class="header">
      <menu-item>Vielen Dank!
        </menu-item>
        <menu-item type="back-button">←
        </menu-item>
    </div>
    <div v-if="hasArchiveHeader">
      <div class="content">
        <router-link class="submit-art-link title link" :to="{ name: 'shop' }">
          <img class="arrows" src="@/assets/blue-arrows.svg">
        </router-link><br><br>
        <div class="text text--blue">Über den <router-link class="underlined-link" :to="{ name: 'shop' }">Link zum Shop</router-link> gelangen Sie zu der aktuellen Runde der so- lidarischen Online-Galerie <span class="intext-title">kulturgenerator</span>, in der alle teilnehmen- den Kunst- und Kulturschaffenden selbst entscheiden, ob und wie viel ihrer Erlöse durch Verkauf auf ein solidarisches Konto über- wiesen werden, das am Ende unter allen ausgeschüttet wird. Neben Objekten werden auch Erlebnisse angeboten.</div>
      </div>
      <div class="header header--archive">
        <menu-item type="archive-header" viewName="archive">ARCHIV</menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from '../components/MenuItem'
import MoneypoolBalance from '../components/MoneypoolBalance.vue'

export default {
  name: 'Header',
  components: { MenuItem, MoneypoolBalance },
  data() {
    return {
      isSticky: false,
      scrollPosition: 0,
      headerHeight: 0
    }
  },
  created () {
    // Listen to scroll event to attach sticky header only if moneypool is shown
    if (this.showMoneypool) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed () {
    if (this.showMoneypool) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      this.headerHeight = this.$refs.header.offsetHeight
      this.scrollPosition = window.scrollY

      if (this.showMoneypool && (this.scrollPosition > this.headerHeight)) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    }
  },
  computed: {
    artwork () {
      return this.$store.getters.getArtworkBySlug(this.$route.params.slug)
    },
    hasStandardHeader() {
      if (this.$route.meta.hasArchiveOrStandardHeader && this.artwork.status === 'ZweiteRunde') {
        return true;
      }

      return this.$route.meta.hasStandardHeader ? true : false
    },
    hasArchiveHeader() {
      if (this.$route.meta.hasArchiveOrStandardHeader && this.artwork.status === 'ErsteRunde') {
        return true;
      }
      return this.$route.meta.hasArchiveHeader ? true : false
    },
    hasThankYouHeader() {
      return this.$route.meta.hasThankYouHeader ? true : false
    },
    showMoneypool () {
      // Only show moneypool on shop page
      return this.$route.name === 'shop';
    },
  }
}
</script>