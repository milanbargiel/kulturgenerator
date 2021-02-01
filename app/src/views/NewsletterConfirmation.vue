<template>
  <div>
    <div class="content text text--blue">Sie haben sich für den Newsletter angemeldet.</div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '../components/Footer'

export default {
  name: 'NewsletterConfirmation',
  components: {
    MyFooter,
  }
}
</script>