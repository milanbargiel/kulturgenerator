<template>
    <div class="checkout">
        <form class="checkout-form">
            <section>
                <h2>Kontakinformation</h2>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Vorname</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="firstname">                
                    </div>
                    <div class="checkout-form__item">
                        <label>Nachname</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="lastname">                
                    </div>
                </div>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Email-Adresse</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="email">                
                    </div>
                </div>             
            </section>
            <section>
                <h2>Versand</h2>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Straße</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="address">                
                    </div>
                    <div class="checkout-form__item">
                        <label>Postleitzahl</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="postcode">                
                    </div>
                </div>
                <div class="checkout-form__row">
                    <div class="checkout-form__item">
                        <label>Stadt</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="city">                
                    </div>
                    <div class="checkout-form__item">
                        <label>Land</label>
                        <input class="checkout-form__text-input" type="text" v-model.trim="country">                
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
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
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
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            postcode: '',
            city: '',
            country: '',
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