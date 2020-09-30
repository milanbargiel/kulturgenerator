<template>
    <div class="checkout">
        <form class="checkout-form">
            <section class="checkout-form__section">
                <h2 class="checkout-form__header">Kontaktinformation</h2>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label class="checkout-form__label">Vorname</label>
                        <input class="checkout-form__input" type="text" v-model.trim="payer.firstname">                
                    </div>
                    <div class="checkout-form__item">
                        <label class="checkout-form__label">Nachname</label>
                        <input class="checkout-form__input" type="text" v-model.trim="payer.lastname">                
                    </div>
                </div>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label class="checkout-form__label">E-Mail-Adresse</label>
                        <input class="checkout-form__input" type="text" v-model.trim="payer.email">                
                    </div>
                </div>             
            </section>
            <section class="checkout-form__section">
                <h2 class="checkout-form__header">Versand</h2>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label class="checkout-form__label">Straße und Hausnummer</label>
                        <input class="checkout-form__input" type="text" v-model.trim="payer.address">                
                    </div>
                    <div class="checkout-form__item">
                        <label class="checkout-form__label">Postleitzahl</label>
                        <input class="checkout-form__input" type="text" v-model.trim="payer.postcode">                
                    </div>
                </div>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label class="checkout-form__label">Stadt</label>
                        <input class="checkout-form__input" type="text" v-model.trim="payer.city">                
                    </div>
                    <div class="checkout-form__item">
                        <label class="checkout-form__label">Land</label>
                        <input class="checkout-form__input" type="text" v-model.trim="payer.country">                
                    </div>                
                </div>             
            </section>
        </form>
        <div class="price-summary">         
            <ul>
                <li v-show="artwork.quantity !== 1" class="price-summary__item price-summary__item--input">
                    <div :class="{'price-summary__invalid': !validQuantity}">
                        Bestellmenge <span v-if="!validQuantity">ungültig</span>
                    </div>
                    <input class="price-summary__quantity" type="number" v-model="orderQuantity" min="1" :max="artwork.quantity">
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
                    <div>Mwst. ({{ artwork.tax }}%)</div>
                    <div>{{ taxShare }} €</div>
                </li>
                <li v-if="validQuantity" class="price-summary__item price-summary__item--total">
                    <div>Summe</div>
                    <div>{{ totalCost }} €</div>
                </li>
            </ul>
        </div>
        <div class="paypal">
            <div v-show="validQuantity" ref="paypal" class="paypal__buttons"></div>
            <p class="paypal__description">
                Durch Anklicken von bezahlen mit Paypal, bestätigen Sie die Weitergabe ihrer angegebenen Daten an die Kulturschaffenden. Das Geld fließt direkt und zu 100% an den/die teilnehmende Künstler*in. Für Fragen zu Abrechnung treten Sie bitte nach dem Kauf direkt mit den Verkäufer*innen in Kontakt. Danke!    
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['artwork'],
    name: 'Checkout',
    data () {
        return {
            payer : {
                firstname: '',
                lastname: '',
                email: '',
                address: '',
                postcode: '',
                city: '',
                country: '',                
            },
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
        taxShare () {
            return this.purchaseOrderPrice * this.artwork.tax/100
        },
        priceWithTaxes () {
            return this.purchaseOrderPrice + this.taxShare
        },
        totalCost () {
            return this.priceWithTaxes + this.artwork.shippingCosts
        },
        validQuantity () {
            return this.orderQuantity < this.artwork.quantity && this.orderQuantity >= 1
        },
        generatorShare () {
            if (!this.artwork.generatorShare) {
                return 0
            }
            return this.artwork.price * parseInt(this.artwork.generatorShare) / 100
        }
    },
    mounted () {
        this.loadPaypalScript()
    },
    methods: {
        setPaymentInfo (success) {
            if (success) {
                this.$store.dispatch('updateShadowMoneypool', this.generatorShare)
                this.$store.commit('SET_PAYMENT_INFO', { show: true, state: 'success'})
            } else {
                this.$store.commit('SET_PAYMENT_INFO', { show: true, state: 'error'})
            }
        },
        updateQuantity (quantity) {
            if (this.artwork.quantity < 1) {
                return
            }
            this.$store.dispatch('updateArtworkQuantity', {id: this.artwork.id, quantity: quantity, currentQuantity: this.artwork.quantity})
                .then(response => {
                    this.$store.commit('UPDATE_ARTWORK_QUANTITY', {id: this.artwork.id, quantity: response})
                })
                .catch(error => {
                    console.error(error)
                })
        },
        loadPaypalScript () {
            const script = document.createElement('script')
            script.src = 'https://www.paypal.com/sdk/js?client-id=Ab1l-FnhLTRhv9JDyFJA1Rn79WTB1-K6MjiLrj5dLYYhmiQE0Lelq7wSN3hkJZ4JhKxS0cx_xL5KlIg9&currency=EUR&disable-funding=credit,giropay,sofort'
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
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            payer: {
                                name: {
                                    given_name: this.payer.firstname,
                                    surname: this.payer.lastname
                                },
                                address: {
                                    address_line_1: this.payer.address,
                                    postal_code: this.payer.postcode,
                                    admin_area_2: this.payer.city,
                                    admin_area_1: this.payer.country,
                                    country_code: 'DE' // TODO: this should of course be dynamic
                                }

                            },                            
                            purchase_units: [{
                                amount: {
                                    value: this.totalCost
                                },
                                payee: {
                                    email_address: this.artwork.paypal
                                },
                                description: `${this.order.quantity} x ${this.artwork.author}: ${this.artwork.title}`
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture()
                        this.setPaymentInfo(order.status === 'COMPLETED')
                        this.updateQuantity(this.orderQuantity)
                    }

                })
                .render(this.$refs.paypal)
        }   
    }
}
</script>