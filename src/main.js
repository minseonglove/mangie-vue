import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios"
import store from "./store"
const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$axios = axios;
app.use(store)
app.mount('#app')