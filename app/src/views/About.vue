<template>
  <div class="content--blue">
    <div class="content">
      <div class="text">
        
        <router-link class="submit-art-link title link" :to="{ name: 'submit' }"><img class="arrows-submit" src="@/assets/strom2.gif"></router-link><br><br>
        <span class="about-title">STROM</span><br>

        Wenn der Strom ausfällt, wird ein Generator benötigt. Der Kulturgenerator ist online seit XX Tagen, XX Stunden, XX Minuten. Als eine Reaktion auf die COVID-19 Pandemie, vor allem in Betracht der Schließungen von Kulturinstitutionen in dem ersten Lockdown im März 2020, ist der Kulturgenerator mit der Frage, wie sich Kunst- und Kulturschaffende gegenseitig und eigenverantwortlich unterstützen können, entstanden. In ihm erscheinen etablierte und weniger etablierte Künstler:innen gleichberechtigt und hierarchiefrei nebeneinander und können somit die gegenseitige Sichtbarkeit erhöhen und sich gegenseitig unterstützen.<br><br><br>



        <span class="about-title">SOLIDARITÄT</span><br>

        Der Kulturgenerator ist somit eine solidarische Online-Galerie, die darauf abzielt, Einnahmen durch Verkäufe unter allen teilnehmenden Kunst- und Kulturschaffenden fair umzuverteilen. Diese entscheiden dabei selbst, ob und wie viel sie vom Erlös des Verkaufs ihrer Arbeit auf ein solidarisches Konto einzahlen möchten und ob sie bei der Ausschüttung des Kontos beteiligt werden wollen. Auch teilnehmende Kunst- und Kulturschaffende, die über den Generator nichts verkaufen, können vom solidarischen Konto profitieren. Der Kontostand beträgt derzeit: XXX Euro. Das Datum der Ausschüttung des solidarischen Kontos ist der XX/XX/XX Datum.<br><br><br><br>



        <span class="about-title">SPARTENÜBERGREIFENDE PLATTFORM</span><br>

        Da vor allem auch kulturorganisatorische Arbeit und Kultureinrichtungen der freien Szene oft aus dem Raster der Unterstützungsmaßnahmen fallen, können im Generator neben Objekten auch Kultur-Erlebnisse verkauft werden. Seit seinem bestehen hat der Kulturgenerator bereits XX Arbeiten generiert. Im Laden stehen 30 davon zum Verkauf. Wird ein Angebot verkauft, rückt ein anderes nach.<br><br><br><br>



        <span class="about-title">SPIEL</span><br>

        Sie können Teil unseres Experiments werden, indem Sie Angebote kaufen oder Arbeiten über das Formular einreichen. Für Fragen schreiben Sie uns an info@kulturgenerator.org oder melden Sie sich für unseren Newsletter an: <br><br><br><br>
      

      
    </div>
    </div>

    
    <my-footer></my-footer>

  </div>
</template>

<script>
  import MyFooter from '../components/Footer'

  export default {
    name: 'About',
    components: {
      MyFooter
    },
    created () {
      this.$store.commit('SET_LOADING_STATE', false)
    }
  }
</script>