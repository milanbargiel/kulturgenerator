<template>
    <div style="cursor: pointer; font-size: 3rem; margin-bottom: 30px;">
        <marquee-text 
            :repeat="99"
            :duration="10">
            <div style="margin-right: 140px;">20.000 €</div>
        </marquee-text>
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'

export default {
    name: 'MoneypoolBanner',
    components: { MarqueeText }
}
</script>