import './assets/main.css'
import knob from './components/knob.vue'
import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App)
app.component("knob",knob)
app.mount('#app')
