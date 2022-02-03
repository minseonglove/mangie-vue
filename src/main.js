import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import axios from "axios"
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
    expireTimes: "1d",
    secure: true
})

const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$axios = axios;
app.use(store)
app.mount('#app')