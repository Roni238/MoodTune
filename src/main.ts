import { createApp } from 'vue'
import App from './app/App.vue'
import router from './app/providers/router'
import { store } from './app/providers/pinia'

import './app/styles/base.css'
const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')