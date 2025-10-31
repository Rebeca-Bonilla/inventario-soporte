import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import router from './router'
import './styles/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

import { useSessionStore } from './stores/session'
const sessionStore = useSessionStore()
sessionStore.initializeAuth()

app.mount('#app')
