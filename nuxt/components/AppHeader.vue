<template>
  <div ref="header">
    <div
      v-if="hasStandardHeader"
      :class="{ header: true, 'header--sticky': showMoneypool }"
    >
      <MenuItem view-name="info">INFO </MenuItem>
      <MenuItem view-name="einreichen">EINREICHEN </MenuItem>
      <MenuItem
        v-if="showMoneypool"
        :class="{ sticky: isSticky }"
        view-name="shop"
        type="moneypool-balance"
        banner-speed="7"
      >
        <MoneypoolBalance :balance="moneypoolBalance" />
      </MenuItem>
      <MenuItem v-else view-name="shop">SHOP</MenuItem>
    </div>
    <div v-if="hasThankYouHeader" class="header">
      <MenuItem>Vielen Dank! </MenuItem>
      <MenuItem type="back-button">← </MenuItem>
    </div>
    <div v-if="hasArchiveHeader">
      <div class="content">
        <nuxt-link class="submit-art-link title link" to="/">
          <img class="arrows" src="@/assets/blue-arrows.svg" /> </nuxt-link
        ><br /><br />
        <div class="text text--blue">
          Über den
          <nuxt-link class="underlined-link" to="/">Link zum Shop</nuxt-link>
          gelangen Sie zu der aktuellen Runde der so- lidarischen Online-Galerie
          <span class="intext-title">kulturgenerator</span>, in der alle
          teilnehmen- den Kunst- und Kulturschaffenden selbst entscheiden, ob
          und wie viel ihrer Erlöse durch Verkauf auf ein solidarisches Konto
          über- wiesen werden, das am Ende unter allen ausgeschüttet wird. Neben
          Objekten werden auch Erlebnisse angeboten.
        </div>
      </div>
      <div class="header header--archive">
        <MenuItem type="archive-header" view-name="archiv">ARCHIV</MenuItem>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isSticky: false,
      scrollPosition: 0,
      headerHeight: 0,
      artwork: null,
      moneypoolBalance: 0,
    }
  },
  async fetch() {
    if (this.$route.params.slug) {
      this.artwork = await this.$axios.$get(
        '/artworks/' + this.$route.params.slug
      )
    }
    const response = await this.$axios.$get(
      'https://xyz.kulturgenerator.org/moneypool'
    )
    this.moneypoolBalance = Math.round(response.currentBalance)
  },
  computed: {
    hasStandardHeader() {
      if (
        this.$route.name === 'artworks-author-slug' &&
        this.artwork?.status === 'ZweiteRunde'
      ) {
        return true
      }

      return (
        this.$route.name === 'index' ||
        this.$route.name === 'einreichen' ||
        this.$route.name === 'info' ||
        this.$route.name === 'impressum'
      )
    },
    hasArchiveHeader() {
      if (
        this.$route.name === 'artworks-author-slug' &&
        this.artwork?.status === 'ErsteRunde'
      ) {
        return true
      }
      return this.$route.name === 'archiv'
    },
    hasThankYouHeader() {
      return this.$route.meta.hasThankYouHeader
    },
    showMoneypool() {
      // Only show moneypool on shop page
      return this.$route.name === 'index'
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  created() {
    // Listen to scroll event to attach sticky header only if moneypool is shown
    if (this.showMoneypool) {
      // window.addEventListener('scroll', this.handleScroll) TODO: fix eslint error
    }
  },
  destroyed() {
    if (this.showMoneypool) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  updated() {
    if (this.showMoneypool) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      this.headerHeight = this.$refs.header.offsetHeight
      this.scrollPosition = window.scrollY

      if (this.showMoneypool && this.scrollPosition > this.headerHeight) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    },
  },
}
</script>
