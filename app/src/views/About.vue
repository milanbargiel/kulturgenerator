<template>
    <div class="content content--blue">
      <div class="text">
            Der <span class="intext-title">kulturgenerator</span> ist virtueller Laden und ist seit 3 Tagen 7 Stunden und 8 Minuten online, er ist virtueller Laden und Plattform die spartenübergreifend die Facetten der Kölner Kulturszene abbildet. Bisher wurden in den Generator 53 Arbeiten hochgeladen, im Shop werden davon 30 Angebote angzeigt. Wenn ein Kulturangebot verkauft wurde, rückt ein anderes nach. Was ist der Kulturgenerator? Wie funktioniert der Kulturgenerator? An wen richtet sich der Kulturgenerator? Er ist virtueller Laden und Plattform die spartenübergreifend die Facetten der Kölner Kulturszene abbildet. Blabliblub hullahup mit dem. Jup In dem spieltheoretischen Experiment, entscheiden Kunst- und Kulturschaffende selbst ob sie einen Teil des Erlös ihrer Verkäufe, in das solidarische Konto einzahlen möchten an dem anschließend alle Teilnehmer*innen des Projekts beteiligt werden, unabhängig davon ob ihre Angebote verkauft wurden oder nicht. Der aktuelle Kontostand beträgt €1234,12. Um ein Kunstwerk im Generator zum Verkauf anzubieten, tragen Sie bitte ihre Daten ein. ↓
        </div>
        <submit-art-form></submit-art-form>
        <my-footer></my-footer>
    </div>
</template>

<script>
import SubmitArtForm from '../components/SubmitArtForm'
import MyFooter from '../components/Footer'

export default {
  name: 'About',
  components: {
    SubmitArtForm,
    MyFooter
  },
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
  }
}
</script>