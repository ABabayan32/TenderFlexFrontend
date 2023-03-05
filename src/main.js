import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@fortawesome/fontawesome-free/css/all.css'
const vuetify = createVuetify({
    components,
    directives,
})

import './styles/main.css'
const app = createApp(App)

app.use(router).use(VueCookies).use(vuetify, {
    iconfont: 'fa'
}).mount('#app')
