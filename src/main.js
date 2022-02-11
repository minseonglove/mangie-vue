import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import axios from "axios"
import localforage from 'localforage'

localforage.config({
    name: 'userinfo'
})

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(store)
app.mount('#app')