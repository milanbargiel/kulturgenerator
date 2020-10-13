<template>
    <div class="checkout">
        <h2 class="checkout__header">Kunstwerk kaufen</h2>
        <div class="price-summary">         
            <ul>
                <li v-show="artwork.quantity > 1" class="price-summary__item price-summary__item--input">
                    <div :class="{'price-summary__invalid': !validQuantity}">
                        Bestellmenge <span v-if="!validQuantity">ungültig</span>
                    </div>
                    <input class="price-summary__quantity js-quantity" type="number" v-model="orderQuantity" min="1" :max="artwork.quantity">
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
                <li v-if="validQuantity" class="price-summary__item price-summary__item--total">
                    <div>Summe</div>
                    <div>{{ totalCost }} €</div>
                </li>
            </ul>
        </div>
        <button @click="handleOrder()" style="margin-bottom: 20px;">Send Dummy Order and trigger Mailing</button>
        <div class="paypal">
            <div v-show="validQuantity" ref="paypal" class="paypal__buttons"></div>
            <p class="paypal__description">
                Durch Anklicken von bezahlen mit Paypal, bestätigen Sie die Weitergabe ihrer angegebenen Daten an die Kulturschaffenden. Das Geld fließt direkt und zu 100% an den/die teilnehmende Künstler*in. Für Fragen zu Abrechnung treten Sie bitte nach dem Kauf direkt mit den Verkäufer*innen in Kontakt. Danke!    
            </p>
        </div>
    </div>
</template>

<script>
import dummyOrder from '../fixtures/dummy-paypal-response'; // dummy payload from paypal

export default {
    props: ['artwork'],
    name: 'Checkout',
    data () {
        return {
            orderQuantity: 1
        }
    },
    computed: {
        singleUnitPrice () {
            return this.artwork.price
        },
        purchaseOrderPrice  () {
            return this.singleUnitPrice * this.orderQuantity
        },
        tax () {
            return this.artwork.tax.substring(1); // remove dummy underscore from tax enumeration String
        },
        taxShare () {
            return this.purchaseOrderPrice * this.tax/100
        },
        priceWithTaxes () {
            return this.purchaseOrderPrice + this.taxShare
        },
        totalCost () {
            return this.priceWithTaxes + this.artwork.shippingCosts
        },
        validQuantity () {
            return this.orderQuantity <= this.artwork.quantity && this.orderQuantity > 0
        },
        generatorShare () {
            if (!this.artwork.generatorShare) {
                return 0
            }
            return this.artwork.price * parseInt(this.artwork.generatorShare.substring(1)) / 100
        }
    },
    mounted () {
        this.loadPaypalScript()
    },
    methods: {
        handleOrder (order = dummyOrder) {
            if (order.status !== 'COMPLETED') {
                this.$store.commit('UPDATE_PAYMENT_FEEDBACK', { show: true, state: 'error'})
                return 
            }
            this.$store.dispatch('sendOrder', { artworkId: this.artwork.id, order })
                .then(response => { 
                    this.$store.commit('UPDATE_ARTWORK_QUANTITY', response.data.artwork)
                })

            // update quantity even before it's confirmed and updated again after sendOrder success.    
            this.$store.commit('UPDATE_ARTWORK_QUANTITY', { 
                id: this.artwork.id,
                quantity: this.artwork.quantity - this.orderQuantity
            })
            this.$store.dispatch('updateShadowMoneypool', this.generatorShare)
            this.$store.commit('UPDATE_PAYMENT_FEEDBACK', { show: true, state: 'success'})
        },
        loadPaypalScript () {
            const script = document.createElement('script')
            script.src = 'https://www.paypal.com/sdk/js?client-id=' + process.env.VUE_APP_PAYPAL_CLIENT_ID + '&currency=EUR&disable-funding=credit,giropay,sofort'
            document.head.appendChild(script)
            script.addEventListener("load", this.setLoaded)
        },
        setLoaded: function() {
            window.paypal
                .Buttons({
                    style: {
                        color: 'blue',
                        height: 55,
                    },
                    onInit: (data, actions) => {
                        // disable paypal buttons if purchase quantity is invalid (compare https://developer.paypal.com/docs/checkout/integration-features/validation/#synchronous-validation)
                        document.querySelector('.js-quantity')
                            .addEventListener('change', function(event) {
                                if (event.target.value > event.target.max || event.target.value < event.target.min) {
                                    actions.disable();
                                } else {
                                    actions.enable();
                                }
                            });                        
                    },
                    createOrder: (data, actions) => {
                        return actions.order.create({                      
                            purchase_units: [{
                                amount: {
                                    value: this.totalCost,
                                    breakdown: {
                                        item_total: {
                                            currency_code: 'EUR',
                                            value: this.purchaseOrderPrice 
                                        },
                                        shipping: {
                                            currency_code: 'EUR',
                                            value: this.artwork.shippingCosts
                                        },
                                        tax_total: {
                                            currency_code: 'EUR',
                                            value: this.taxShare
                                        }
                                    }

                                },
                                payee: {
                                    email_address: this.artwork.paypal
                                },
                                description: `${this.orderQuantity} x ${this.artwork.author}: ${this.artwork.title} – Einkauf über kulturgenerator.de`,
                                items: [{
                                    name: `${this.artwork.author}: ${this.artwork.title}`,
                                    unit_amount: { 
                                        currency_code: 'EUR',
                                        value: this.artwork.price
                                    },
                                    quantity: this.orderQuantity
                                }]
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture()
                        this.handleOrder(order)
                    }

                })
                .render(this.$refs.paypal)
        }   
    }
}
</script>
