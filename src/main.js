import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import axios from "axios"
import localforage from 'localforage'

localforage.config({
    name: 'userinfo'
})

const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$axios = axios;
app.use(store)
app.mount('#app')