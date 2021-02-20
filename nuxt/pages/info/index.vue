<template>
  <div class="content--blue">
    <div class="content">
      <div class="text">
        <div class="about-title">SICHTBARKEIT</div>
        Wenn der Strom ausfällt, wird ein Generator benötigt. Unter der
        Fragestellung, wie sich Kunst- und Kulturschaffende gegenseitig und
        eigenverantwortlich unterstützen können, ist der Kulturgenerator als
        Reaktion auf die COVID-19 Pandemie - vor allem in Betracht der
        Schließungen von Kulturinstitutionen in dem ersten Lockdown im März 2020
        - entstanden. Alle Angebote der Kunst- und Kulturschaffenden sind in ihm
        gleichberechtigt und hierarchiefrei nebeneinander positioniert, um
        gegenseitig die Sichtbarkeit zu erhöhen und sich zu unterstützen.
        <br /><br /><br /><br />

        <div class="about-title">SOLIDARITÄT</div>
        Durch Verkäufe werden die Einnahmen unter allen teilnehmenden Kunst- und
        Kulturschaffenden fair umverteilt. Diese entscheiden dabei selbst, ob
        und wie viel sie vom Erlös des Verkaufs ihrer Arbeit auf ein
        solidarisches Konto einzahlen möchten und ob sie bei der Ausschüttung
        des Kontos beteiligt werden wollen. Auch teilnehmende Kunst- und
        Kulturschaffende, die über den Generator nichts verkaufen, können vom
        solidarischen Konto profitieren. <br /><br /><br /><br />

        <div class="about-title">PLATTFORM FÜR KUNST UND KULTUR</div>
        Der Kulturgenerator begreift sich als eine spartenübergreifende
        Plattform, die nicht nur künstlerische Objekte, sondern auch
        kulturorganisatorische Positionen und Angebote von Institutionen
        vertritt, die als Erlebnisse in Form von Gutscheinen verkauft werden und
        dann eingelöst werden können, wenn Kunst- und Kultureinrichtungen wieder
        öffnen dürfen. Damit sind sie Materialisierungen der Vorfreude.
        <br /><br /><br /><br />

        <div class="about-title">SPIELTHEORETISCHES EXPERIMENT</div>

        Wenn die Idee aufgeht, dann kann jede und jeder Teilnehmende mehr
        profitieren, wenn sie oder er bereit ist, etwas zu geben. Auch Sie
        können Teil unseres Projektes werden und Kulturschaffende unterstützen,
        indem Sie Angebote kaufen. Für Fragen schreiben Sie uns an
        <a
          class="underlined-link underlined-link--white"
          href="mailto:info@kulturgenerator.org"
          >info@kulturgenerator.org</a
        >.<br /><br /><br /><br />

        <router-link
          class="submit-art-link title link"
          :to="{ name: 'archive' }"
        >
          <img class="arrows" src="@/assets/yellow-arrows.svg" /> </router-link
        ><br /><br />

        <div class="yellow-numbers">
          Über den
          <router-link
            class="underlined-link underlined-link--yellow"
            :to="{ name: 'archive' }"
            >Link zum Archiv</router-link
          >
          können Sie die Arbeiten sehen, die an der ersten Runde des
          Kulturgenerators teilgenommen haben. Die erste Runde wurde am
          01.02.2021 mit der Ausschüttung des solidarischen Kontos in Höhe von
          7666,50 EUR durch den Verkauf von 38 Arbeiten abgeschlossen. Für die
          50 Teilnehmenden bedeutet dies, dass jede*r einen Betrag von 153,41
          EUR erhalten hat.
        </div>
        <br /><br /><br /><br />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'About',
  created() {
    this.$store.commit('SET_LOADING_STATE', false)
  },
}
</script>
