<template>
  <div class="checkout">
    <div class="price-summary">
      <ul>
        <li
          v-show="artwork.quantity > 1"
          class="price-summary__item price-summary__item--input"
        >
          <div :class="{ 'price-summary__invalid': !validQuantity }">
            Bestellmenge <span v-if="!validQuantity">ungültig</span>
          </div>
          <input
            v-model="orderQuantity"
            class="price-summary__quantity js-quantity"
            type="number"
            min="1"
            :max="artwork.quantity"
          />
        </li>
        <li class="price-summary__item">
          <div>Einzelpreis</div>
          <div>{{ singleUnitPrice }} €</div>
        </li>
        <li class="price-summary__item">
          <div>Versand</div>
          <div>{{ artwork.shippingCosts }} €</div>
        </li>
        <li class="price-summary__item">
          <div>Mwst. ({{ tax }}%)</div>
          <div>{{ taxShare }} €</div>
        </li>
        <li
          v-if="validQuantity"
          class="price-summary__item price-summary__item--total"
        >
          <div>Summe</div>
          <div>{{ totalCost }} €</div>
        </li>
      </ul>
    </div>
    <div class="paypal">
      <div v-show="validQuantity" ref="paypal" class="paypal__buttons"></div>
      <div v-if="error" class="error">
        Ein Fehler ist aufgetreten. Versuchen Sie es später erneut oder wenden
        Sie sich an
        <a
          class="underlined-link underlined-link--red"
          href="mailto:info@kulturgenerator.org"
          >info@kulturgenerator.org</a
        >.
      </div>
      <p class="explain-text">
        Wenn Sie über
        <a
          href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full?locale.x=de_DE"
          target="_blank"
          rel="noopener"
          class="underlined-link"
          >PayPal</a
        >, bezahlen, bestätigen Sie die Weitergabe Ihrer angegebenen Daten an
        die Künstlerin oder den Künstler, damit sie oder er Kontakt zu Ihnen
        aufnehmen kann. Bei Fragen zur Abrechnung treten Sie bitte direkt mit
        diesen in Kontakt. Vielen Dank!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  props: ['artwork'],
  data() {
    return {
      error: false,
      orderQuantity: 1,
    }
  },
  computed: {
    singleUnitPrice() {
      return this.artwork.price
    },
    purchaseOrderPrice() {
      return this.singleUnitPrice * this.orderQuantity
    },
    tax() {
      return this.artwork.tax.substring(1) // remove dummy underscore from tax enumeration String
    },
    taxShare() {
      return (this.purchaseOrderPrice * this.tax) / 100
    },
    priceWithTaxes() {
      return this.purchaseOrderPrice + this.taxShare
    },
    shippingCosts() {
      return this.artwork.shippingCosts
    },
    totalCost() {
      return (this.priceWithTaxes + this.shippingCosts).toFixed(2)
    },
    validQuantity() {
      return (
        this.orderQuantity <= this.artwork.quantity && this.orderQuantity > 0
      )
    },
    generatorShare() {
      if (!this.artwork.generatorShare) {
        return 0
      }
      const baseShare =
        (this.artwork.price *
          parseInt(this.artwork.generatorShare.substring(1))) /
        100
      const paypalFee = ((baseShare * 2.49) / 100 + 0.35).toFixed(2)
      return baseShare - paypalFee
    },
  },
  mounted() {
    this.loadPaypalScript()
  },
  methods: {
    handleOrder(order) {
      if (order.status !== 'COMPLETED') {
        this.error = true
        return
      }
      this.$store
        .dispatch('sendOrder', {
          artworkId: this.artwork.id,
          order,
          share: this.generatorShare,
        })
        .then(response => {
          this.$store.commit('UPDATE_ARTWORK_QUANTITY', response.data.artwork)
        })

      // update quantity even before it's confirmed and updated again after sendOrder success.
      this.$store.commit('UPDATE_ARTWORK_QUANTITY', {
        id: this.artwork.id,
        quantity: this.artwork.quantity - this.orderQuantity,
      })
      this.$store.dispatch('updateShadowMoneypool', this.generatorShare)

      // change route programatically to thank you page
      this.$router.push({
        name: 'purchaseConfirmation',
        params: { artwork: this.artwork },
      })
    },
    loadPaypalScript() {
      const script = document.createElement('script')
      script.src =
        'https://www.paypal.com/sdk/js?client-id=' +
        process.env.paypalClientId +
        '&currency=EUR&disable-funding=credit,giropay,sofort'
      document.head.appendChild(script)
      script.addEventListener('load', this.setLoaded)
    },
    setLoaded() {
      window.paypal
        .Buttons({
          style: {
            color: 'blue',
            height: 55,
          },
          onInit: (data, actions) => {
            // disable paypal buttons if purchase quantity is invalid (compare https://developer.paypal.com/docs/checkout/integration-features/validation/#synchronous-validation)
            document
              .querySelector('.js-quantity')
              .addEventListener('change', function (event) {
                if (
                  event.target.value > event.target.max ||
                  event.target.value < event.target.min
                ) {
                  actions.disable()
                } else {
                  actions.enable()
                }
              })
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.totalCost,
                    breakdown: {
                      item_total: {
                        currency_code: 'EUR',
                        value: this.purchaseOrderPrice,
                      },
                      shipping: {
                        currency_code: 'EUR',
                        value: this.artwork.shippingCosts,
                      },
                      tax_total: {
                        currency_code: 'EUR',
                        value: this.taxShare,
                      },
                    },
                  },
                  payee: {
                    email_address: this.artwork.paypal,
                  },
                  description: `${this.orderQuantity} x ${this.artwork.author}: ${this.artwork.title} – Einkauf über kulturgenerator.org`,
                  items: [
                    {
                      name: `${this.artwork.author}: ${this.artwork.title}`,
                      unit_amount: {
                        currency_code: 'EUR',
                        value: this.artwork.price,
                      },
                      quantity: this.orderQuantity,
                    },
                  ],
                },
              ],
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            this.handleOrder(order)
          },
        })
        .render(this.$refs.paypal)
    },
  },
}
</script>
