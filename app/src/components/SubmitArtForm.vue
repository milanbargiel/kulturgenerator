<template>
  <div>
    <FormulateForm
    @submit="submit"
    >
    <FormulateInput 
    type="text" 
    name="title"
    placeholder="Titel"
    validation="required"
    />
    <FormulateInput 
    type="email" 
    name="email"
    placeholder="E-Mail-Adresse"
    validation="required"
    />
    <FormulateInput
    type="submit"
    label="Kunst einreichen"
    />
  </FormulateForm>
  <div class="form-responses">
    <div v-if="sucess" class="form-responses__success">Vielen Dank für die Einreichung! Wir melden uns bei Ihnen, wenn wir das Angebot gesichtet haben.</div>
    <div v-if="error" class="form-responses__error">Ein Fehler ist aufgetreten. Versuchen Sie es später erneut oder wenden Sie sich an <a href="mailto:info@kulturgenerator.org" class="underlined-link underlined-link--red">info@kulturgenerator.org</a></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SubmitArtForm',
  data() {
    return {
      error: false,
      sucess: false
    }
  },
  methods: {
    submit (artwork) {
      this.$store.dispatch('submitArtwork', { artwork })
      .then((response) => {
        console.log(response)
        this.sucess = true
      })
    }
  }
}
</script>