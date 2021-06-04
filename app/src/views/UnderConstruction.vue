<template>
  <div>
    <div class="content text">
      Hier sehen sie alle Arbeiten, die an der ersten Runde des <span class="intext-title intext-title--blue">kulturgenerators</span> beteiligt waren. Sie wurde am 01.02.2021 mit der Ausschüttung des solidarischen Kontos in Höhe von 7766,50 EUR durch den Verkauf von 38 Arbeiten abgeschlossen. Für die 50 Teilnehmenden be- deutet dies, dass jede*r einen Betrag von 153,41 EUR erhalten hat. Wenn Sie Arbeiten davon kaufen wollen, treten Sie bitte mit uns in Kontakt.</div>
      <div class="content hourglass hourglass--construction">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '../components/Footer'

export default {
  name: 'Archive',
  components: {
    MyFooter
  },
  created () {
    this.$store.commit('SET_LOADING_STATE', false)
  }
}
</script>
