import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import axios from "axios"
const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:8080'
app.config.globalProperties.$axios = axios;
app.use(store)
app.mount('#app')