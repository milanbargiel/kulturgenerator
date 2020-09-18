<template>
    <div>
        <form class="checkout">
            <section>
                <h2>Kontakinformation</h2>
                <div style="display: flex; justify-content: between;">
                    <div style="flex: 1;">
                        <label>Vorname</label>
                        <input type="text" v-model.trim="firstname" style="width: 100%; margin-top: 10px;">                
                    </div>
                    <div style="flex: 1;">
                        <label>Nachname</label>
                        <input type="text" v-model.trim="lastname" style="width: 100%; margin-top: 10px;">                
                    </div>
                </div>
                <div style="display: flex; margin-bottom: 60px; margin-top: 30px;">
                    <div style="flex: .49;">
                        <label>Email-Adresse</label>
                        <input type="text" v-model.trim="email" style="width: 100%; margin-top: 10px;">                
                    </div>
                </div>             
            </section>
            <section>
                <h2>Versand</h2>
                <div style="display: flex; justify-content: between;">
                    <div style="flex: 1;">
                        <label>Straße und Hausnummer</label>
                        <input type="text" v-model.trim="street" style="width: 100%; margin-top: 10px;">                
                    </div>
                    <div style="flex: 1;">
                        <label>Postleitzahl</label>
                        <input type="text" v-model.trim="postcode" style="width: 100%; margin-top: 10px;">                
                    </div>
                </div>
                <div style="display: flex; margin-bottom: 60px; margin-top: 30px;">
                    <div style="flex: 1;">
                        <label>Stadt</label>
                        <input type="text" v-model.trim="city" style="width: 100%; margin-top: 10px;">                
                    </div>
                    <div style="flex: 1;">
                        <label>Land</label>
                        <input type="text" v-model.trim="country" style="width: 100%; margin-top: 10px;">                
                    </div>                
                </div>             
            </section>
        </form>
        <div>
            list
        </div>
        <div id="paypal-buttons-container" style="width: 300px;"></div>
        <p >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.            
        </p>
    </div>
</template>

<script>

export default {
    name: 'Checkout',
    data () {
        return {
            firstname: '',
            lastname: '',
            email: '',
            street: '',
            postcode: '',
            city: '',
            country: ''
        }
    },
    computed: {
    },
    mounted () {
        this.loadPaypalScript()
    },
    methods: {
        loadPaypalScript () {
            var head = document.getElementsByTagName('head')[0]
            var script = document.createElement('script')
            script.src = 'https://www.paypal.com/sdk/js?client-id=sb'
            head.appendChild(script)
            script.onload = function () {
                window.paypal.Buttons().render('#paypal-buttons-container')
            }
        }   
    }
}
</script>