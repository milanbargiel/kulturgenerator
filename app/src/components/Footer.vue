<template>
    <footer class="footer">
        <div class="founders">
            <div class="founders__header">Eine Initiative von</div>
            <div class="founders__logos">
                <a class="founder-link founder-link--kk" href="https://www.koelnerkulturrat.de/" target="_blank">
                    <img class="founder-img" src="@/assets/kulturrat.svg">
                </a>
                <a class="founder-link founder-link--wf" href="http://www.cafe-in-der-wachsfabrik.de/" target="_blank">
                    <img class="founder-img" src="@/assets/wachsfabrik.svg">
                </a>
                <a class="founder-link founder-link--nf" href="https://niehlerfreiheit.de/" target="_blank">
                    <img class="founder-img" src="@/assets/niehlerfreiheit.svg">
                </a>
            </div>
        </div>
        <div class="founders">
            <div class="founders__header">Gefördert durch</div>
            <div class="founders__logos">
                <a class="founder-link founder-link--sk" href="https://www.stadt-koeln.de/" target="_blank">
                    <img class="founder-img" src="@/assets/kulturamt.svg">
                </a>
            </div>
        </div>
        <div class="navigation">
            <a class="navigation-element link" href="mailto:info@kulturgenerator.de">info@kulturgenerator.de</a><br>
            <router-link :to="{name: 'impressum'}" class="navigation-element link">Impressum & Datenschutz</router-link>
        </div>
    </footer>
</template>