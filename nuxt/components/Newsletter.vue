<template>
  <ClientOnly>
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
          <form ref="form" class="nf" @submit.prevent="subscribe">
            <span class="nf__at-sign">@: </span>
            <input
              class="nf__email-input"
              type="email"
              placeholder="E-Mail-Adresse"
              required
              @input="setEmail($event.target.value)"
            />
            <button class="nf__button button" type="submit">anmelden ⏎</button>
          </form>
          <div class="form-responses">
            <div v-if="success" class="form-responses__success">
              Fast fertig.. Um die Anmeldung abzuschließen, klicken Sie bitte
              auf den Link in der E-Mail, die wir Ihnen gerade zugeschickt
              haben. Prüfen Sie ggf. auch Ihr Spam-Postfach.
            </div>
            <div v-if="error" class="form-responses__error">
              Ein Fehler ist aufgetreten. Haben Sie sich eventuell vertippt oder
              sind Sie bereits im Verteiler?
            </div>
            <div v-if="loading" class="form-responses__loading">lädt</div>
          </div>
        </div>
      </template>
    </mailchimp-subscribe>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Newsletter',
  methods: {
    onError() {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight)
      }, 10)
    },
    onSuccess() {
      setTimeout(() => {
        this.$refs.form.reset() // clear email on success
        window.scrollTo(0, document.body.scrollHeight)
      }, 10)
    },
  },
}
</script>
