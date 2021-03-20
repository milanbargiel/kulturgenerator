<template>
  <div>
    <div class="content text text--blue">
      Wie kann Solidarität innerhalb der Kunst- und Kulturszene aussehen? Der
      <span class="intext-title">kulturgenerator</span> ist eine solidarische
      Online-Galerie auf Initiative des Kölner Kulturrats, der Niehler Freiheit
      e.V. und des Kunstzentrum Wachsfabrik. Alle Teilnehmenden entscheiden
      selbst, ob und in welchem Umfang ihre Erlöse solidarisch verteilt werden.
      Neben Objekten, werden auch Erlebnisse in Form von Gutscheinen angeboten.
      Der aktuelle Kontostand des solidarischen Kontos beträgt
      {{ moneypoolBalance }} EUR.
    </div>
    <ArtworkList :artworks="artworks" />
    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'Shop',
  async asyncData({ $axios }) {
    const response = await $axios.$get('/artworks?status=ZweiteRunde')
    const artworks = response
      // .filter(item => item.status === 'ZweiteRunde') // only show artworks from second round
      .map(item => ({ sort: Math.random(), value: item })) // introduce random sort parameter
      .sort((a, b) => a.sort - b.sort) // sort by random sort parameter
      .map(item => {
        item.value.randomWidthBase = Math.random() // introduce random width base for later caluclation
        if (item.value.randomWidthBase < 0.2) {
          item.value.randomWidthBase += 4 // bump random width base by 2 for every 6th item
        }
        return item.value // exclude random sort parameter
      })
      .sort(a => (a.quantity > 0 ? -1 : 1)) // move sold out items to the back

    const moneypool = await $axios.$get('/moneypool')
    const moneypoolBalance = Math.round(moneypool.currentBalance)
    return { artworks, moneypoolBalance }
  },

  created() {
    if (this.artworks.length <= 1) {
      this.$store.commit('SET_LOADING_STATE', true)
    }
  },
}
</script>
