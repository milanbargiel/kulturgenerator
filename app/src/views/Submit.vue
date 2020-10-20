<template>
    <div class="content">
      <div class="intro">
            Der <span class="heading">kulturgenerator</span> ist virtueller Laden und Kunstprojekt, generöse Maschine und Startschuss für eine Plattform, die spartenübergreifend die Facetten der Kölner Kulturszene abbildet. Er ist ein spieltheoretisches Experiment, in dem die Kulturschaffenden selbst entscheiden, ob und wie viel sie vom Erlös des Verkaufs ihrer Arbeit in ein solidarisches Konto einzahlen möchten. Unser Ziel ist es, im Generator eingenommenes Geld unter allen Beteiligten fair zu verteilen. Als Kulturschaffende*r, Künstler*in oder Institution können Sie nun künstlerische Werke, kulturelle Erlebnisse und Motive für Textildrucke einreichen. Für mehr Informationen lesen Sie bitte das <a class="underlined-link underlined-link--blue" href="faq.html">FAQ</a>.
        </div>
    </div>
</template>

<script>
export default {
  name: 'Submit',
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
}
}
</script>