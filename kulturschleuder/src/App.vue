<template>
  <div id="app">
    <div v-if="sampleData && sampleData.invoices" id="nav">
      Number of Invoices: {{ sampleData.invoices.length }} (Paypal Sandbox User)
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      paypal_access_token: null,
      sampleData: null
    } 
  }, 
  created () {
    axios({
      method: 'post',
      url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Credentials': true
      },
      params: new URLSearchParams({'grant_type': 'client_credentials'}),
      auth: {
        username: process.env.VUE_APP_PAYPAL_API_CLIENT_ID,
        password: process.env.VUE_APP_PAYPAL_API_SECRET
      },
  }).then(response => {
    this.paypal_access_token = response.data
  }).then(() => {
    this.getPayPalSampleData()
  })
  },
  methods: {
    getPayPalSampleData () {
      axios({
        method: 'get',
        url: 'https://api.sandbox.paypal.com/v1/invoicing/invoices?page=3&page_size=4&total_count_required=true',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.paypal_access_token.access_token
        }
      }).then(response => {
        this.sampleData = response.data
      })
    }
  }
}
</script>

<style lang="scss">
@import "styles/App.scss";
</style>
