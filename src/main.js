
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import {createPinia} from "pinia";
import i18n from "./i18n";


const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(pinia)

app.mount('#app')
