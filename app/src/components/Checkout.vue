<template>
    <div class="checkout">
        <div>{{ artwork.quantity }} left</div>
        <button @click="updateQuantity(1)">delete one</button>
        <form class="checkout-form">
            <section>
                <h2>Kontakinformation</h2>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Vorname</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="payer.firstname">                
                    </div>
                    <div class="checkout-form__item">
                        <label>Nachname</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="payer.lastname">                
                    </div>
                </div>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Email-Adresse</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="payer.email">                
                    </div>
                </div>             
            </section>
            <section>
                <h2>Versand</h2>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Straße</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="payer.address">                
                    </div>
                    <div class="checkout-form__item">
                        <label>Postleitzahl</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="payer.postcode">                
                    </div>
                </div>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Stadt</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="payer.city">                
                    </div>
                    <div class="checkout-form__item">
                        <label>Land</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="payer.country">                
                    </div>                
                </div>             
            </section>
        </form>
        <div class="price-summary">
            <ul>
                <li class="price-summary__item">
                    <div>Preis</div>
                    <div>{{ artwork.price }} €</div>
                </li>
                <li class="price-summary__item">
                    <div>Versand</div>
                    <div>{{ artwork.shippingCosts }} €</div>
                </li>
                <li class="price-summary__item">
                    <div>Mwst. ({{ artwork.tax }}%)</div>
                    <div>{{ taxShare }} €</div>
                </li>
                <li class="price-summary__item--total">
                    <div>Summe</div>
                    <div>{{ totalCost }} €</div>
                </li>
            </ul>
        </div>
        <p v-if="isPayed" class="payment-success">Congrats! The Money moved over smoothly! :-)</p>
        <div v-else class="paypal">
            <div ref="paypal" class="paypal__buttons"></div>
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
            isPayed: false
        }
    },
    computed: {
        taxShare () {
            return this.artwork.price * this.artwork.tax/100
        },
        priceWithTaxes () {
            return this.artwork.price + this.taxShare
        },
        totalCost () {
            return this.priceWithTaxes + this.artwork.shippingCosts
        }
    },
    mounted () {
        this.loadPaypalScript()
    },
    methods: {
        updateQuantity (quantity) {
            this.$store.dispatch('updateArtworkQuantity', {id: this.artwork.id, quantity: quantity, currentQuantity: this.artwork.quantity})
                .then(response => {
                    this.artwork.quantity = response
                })
                .catch(error => {
                    console.error(error)
                })
        },
        loadPaypalScript () {
            const script = document.createElement('script')
            script.src = 'https://www.paypal.com/sdk/js?client-id=Ab1l-FnhLTRhv9JDyFJA1Rn79WTB1-K6MjiLrj5dLYYhmiQE0Lelq7wSN3hkJZ4JhKxS0cx_xL5KlIg9&currency=EUR&disable-funding=credit,card,giropay,sofort'
            document.head.appendChild(script)
            script.addEventListener("load", this.setLoaded)
        },
        setLoaded: function() {
            window.paypal
                .Buttons({
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
                                }
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture()
                        this.isPayed = order.status === 'COMPLETED'
                    }

                })
                .render(this.$refs.paypal)
        }   
    }
}
</script>