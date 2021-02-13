<template>
  <div class="content--blue">
    <div class="content">
      <div class="text">
        Der Kulturgenerator ist eine solidarische Online-Galerie auf Initiative der Niehler Freiheit e.V., des Kunstzentrum Wachsfabrik e.V. und des Kölner Kulturrats.
        Alle Teilnehmenden entscheiden selbst, ob und in welchem Umfang ihre Erlöse solidarisch verteilt werden.<br><br>
        Die erste Runde wurde am 01.02.2021 mit der Ausschüttung des solidarischen Kontos in Höhe von 7670,50 EUR durch den Verkauf von 38 Arbeiten abgeschlossen.
        Für die 50 Teilnehmenden bedeutet dies, dass jede*r einen Betrag von 153,41 EUR erhält. Die Werke der ersten Runde finden Sie im <router-link class="submit-art-link underlined-link underlined-link--white" :to="{ name: 'archive' }">Archiv</router-link>. Möchten Sie auch Kunst und Kultur für die zweite Runde, die am 15.02 beginnt, einreichen, dann klicken Sie auf den <router-link class="submit-art-link underlined-link underlined-link--white" :to="{ name: 'submit' }">Link zum Formular</router-link>.
        <br><br><br><br>

        <div class="about-title">SICHTBARKEIT</div>
        Wenn der Strom ausfällt, wird ein Generator benötigt. Unter der Fragestellung, wie sich Kunst- und Kulturschaffende gegenseitig und eigenverantwortlich unterstützen können, ist der Kulturgenerator als Reaktion auf die COVID-19 Pandemie - vor allem in Betracht der Schließungen von Kulturinstitutionen in dem ersten Lockdown im März 2020 - entstanden.  Alle Angebote der Kunst- und Kulturschaffenden sind in ihm gleichberechtigt und hierarchiefrei nebeneinander positioniert, um gegenseitig die Sichtbarkeit zu erhöhen und sich zu unterstützen.
        <br><br><br><br>

        <div class="about-title">SOLIDARITÄT</div>

        Durch Verkäufe werden die Einnahmen unter allen teilnehmenden Kunst- und Kulturschaffenden fair umverteilt. Diese entscheiden dabei selbst, ob und wie viel sie vom Erlös des Verkaufs ihrer Arbeit auf ein solidarisches Konto einzahlen möchten und ob sie bei der Ausschüttung des Kontos beteiligt werden wollen. Auch teilnehmende Kunst- und Kulturschaffende, die über den Generator nichts verkaufen, können vom solidarischen Konto profitieren. <br><br><br><br>


        <div class="about-title">SPIELTHEORETISCHES EXPERIMENT</div>

        Wenn die Idee aufgeht, dann kann jede und jeder Teilnehmende mehr profitieren, wenn sie oder er bereit ist, etwas zu geben. Auch Sie können Teil unseres Projektes werden und Kulturschaffende unterstützen, indem Sie Angebote kaufen. Für Fragen schreiben Sie uns an <a class="underlined-link underlined-link--white" href="mailto:info@kulturgenerator.org">info@kulturgenerator.org</a>.<br><br><br><br>

        <router-link class="submit-art-link title link" :to="{ name: 'submit' }">
          <img class="arrows" src="@/assets/yellow-arrows.svg">
        </router-link><br><br>
        
        <div class="yellow-numbers"> Über den <router-link class="submit-art-link underlined-link underlined-link--yellow" :to="{ name: 'submit' }">Link zum Formular</router-link> können Künstler*innen und Kulturschaffende Arbeiten einreichen. Willkommen sind sowohl Objekte der bildenden Kunst, als auch kulturelle Angebote in Form von Erlebnissen (soweit diese mit den aktuellen Bestimmungen realisierbar sind). Damit wollen wir neben Künstler*innen auch Institutionen einladen, Angebote einzureichen. Voraussetzung ist eine professionell ausgeübte Tätigkeit. Bitte haben Sie Verständnis, dass wir nicht alle Einreichungen berücksichtigen können.</div><br><br><br><br> 
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

