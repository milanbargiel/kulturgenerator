<template>
    <div class="payment-info" :class="{'payment-info--success': state === 'success'}">
        <marquee-text
            :repeat="10"
            :duration="15">
            <span class="marquee-text__item">{{ infoText }}</span>
        </marquee-text>
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'

export default {
    props: ['state'],
    components: {
        MarqueeText
    },
    computed: {
        infoText () {
            if (this.state === 'success') {
                return 'KAUF HAT GEKLAPPT. VIELEN DANK!'
            }
            if (this.state === 'error') {
                return 'ETWAS IST SCHIEFGEGANGEN. VERSUCHEN SIE ES BITTE ERNEUT'
            }
            return 'ES GAB EIN PROBLEM. BITTE LADEN SIE DIE SEITE NEU.'
        }
    }
}
</script>