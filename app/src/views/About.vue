<template>
  <div class="content--blue">
    <div class="content">
      <div class="text">

        <span class="about-title">SICHTBARKEIT</span><br>

        Wenn der Strom ausfällt, wird ein Generator benötigt. Unter der Fragestellung, wie sich Kunst- und Kulturschaffende gegenseitig und eigenverantwortlich unterstützen können, ist der Kulturgenerator als Reaktion auf die COVID-19 Pandemie - vor allem in Betracht der Schließungen von Kulturinstitutionen in dem ersten Lockdown im März 2020 - entstanden.  Alle Angebote der Kunst- und Kulturschaffenden sind in ihm gleichberechtigt und hierarchiefrei nebeneinander positioniert, um gegenseitig die Sichtbarkeit zu erhöhen und sich zu unterstützen.
        <br><br><br><br>

        <span class="about-title">SOLIDARITÄT</span><br>

        Der Kulturgenerator ist eine Online-Galerie. Ziel ist es, Einnahmen durch Verkäufe unter allen teilnehmenden Kunst- und Kulturschaffenden fair umzuverteilen. Diese entscheiden dabei selbst, ob und wie viel sie vom Erlös des Verkaufs ihrer Arbeit auf ein solidarisches Konto einzahlen möchten und ob sie bei der Ausschüttung des Kontos beteiligt werden wollen. Auch teilnehmende Kunst- und Kulturschaffende, die über den Generator nichts verkaufen, können vom solidarischen Konto profitieren. Den Kontostand können Sie der Laufzeile im Shop entnehmen. Das Datum der Ausschüttung des solidarischen Kontos ist der 01.02.2021. <br><br><br><br>


        <span class="about-title">PLATTFORM FÜR KUNST UND KULTUR</span><br>

        Da vor allem auch kulturorganisatorische Arbeit und Kultureinrichtungen der freien Szene oft aus dem Raster der Unterstützungsmaßnahmen fallen, können im Generator neben Objekten auch Kultur-Erlebnisse verkauft werden. Seit seinem Bestehen hat der Kulturgenerator bereits 53 Arbeiten generiert. Im Laden stehen 30 davon zum Verkauf. Wird ein Angebot verkauft, rückt ein anderes nach.<br><br><br><br>

        <span class="about-title">SPIELTHEORETISCHES EXPERIMENT</span><br>

        Wenn die Idee aufgeht, dann kann jede und jeder Teilnehmende mehr profitieren, wenn sie oder er bereit ist, etwas zu geben. Auch Sie können Teil unseres Projektes werden und Kulturschaffende unterstützen, indem Sie Angebote kaufen. Für Fragen schreiben Sie uns an <a class="navigation-element underlined-link underlined-link--white" href="mailto:info@kulturgenerator.org">info@kulturgenerator.org</a>. <br><br><br><br>

        <router-link class="submit-art-link title link" :to="{ name: 'submit' }">
          <img class="arrows-submit" src="@/assets/yellow-arrows.svg">
        </router-link><br><br>
        
        <span class="yellow-numbers"> Über den <router-link class="submit-art-link underlined-link underlined-link--yellow" :to="{ name: 'submit' }">Link zum Formular</router-link> können Künstler*innen und Kulturschaffende Arbeiten einreichen. Willkommen sind sowohl Objekte der bildenden Kunst, als auch kulturelle Angebote als Erlebnisse (soweit diese mit den aktuellen Bestimmungen realierbar sind) Es werden immer nur 30 Angebote gleichzeitig im Shop angezeigt, der Rest rückt nach, sobald etwas verkauft wird.</span><br><br><br><br> 
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

