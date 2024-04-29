import {createPinia} from "pinia";
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";


const app = createApp(App)
app.use(router)
app.use(createPinia)

app.mount('#app')
