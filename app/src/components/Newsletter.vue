<template>
  <mailchimp-subscribe
  url="https://kulturgenerator.us8.list-manage.com/subscribe/post-json"
  user-id="6abc0980238ff5a55fb947df7"
  list-id="100b3f64c8"
  @error="onError"
  @success="onSuccess"
  >
  <template v-slot="{ subscribe, setEmail, error, success, loading }">
    <div class="newsletter">
      Anmeldung zum Newsletter
      <form class="nf" @submit.prevent="subscribe" ref="form">
        <span class="nf__at-sign">@: </span>
        <input class="nf__email-input" type="email" placeholder="E-Mail-Adresse" @input="setEmail($event.target.value)" required />
        <button class="nf__button button" type="submit">anmelden ⏎</button>
      </form>
      <div class="form-responses">
        <div class="form-responses__success" v-if="success">Fast fertig.. Um die Anmeldung abzuschließen, klicken Sie bitte auf den Link in der E-Mail, die wir Ihnen gerade zugeschickt haben. Prüfen Sie ggf. auch Ihr Spam-Postfach.</div>
        <div class="form-responses__error" v-if="error">Ein Fehler ist aufgetreten. Haben Sie sich eventuell vertippt oder sind Sie bereits im Verteiler?</div>
        <div class="form-responses__loading" v-if="loading">lädt</div>
      </div>
    </div>
  </template>
</mailchimp-subscribe>
</template>

<script>
import MailchimpSubscribe from 'vue-mailchimp-subscribe'

export default {
  name: 'Newsletter',
  components: {
    MailchimpSubscribe,
  },
  methods: {
    onError() {
      // handle error
    },
    onSuccess() {
      this.$refs.form.reset(); // clear email on success
    },
  },
}
</script>