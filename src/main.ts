// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Inicializar después del mount
app.mount('#app')

// Inicializar sesión
import { useSessionStore } from '@/stores/session'
const sessionStore = useSessionStore()
sessionStore.initializeAuth()

// Event listeners
document.addEventListener('click', () => sessionStore.registerActivity())
document.addEventListener('keypress', () => sessionStore.registerActivity())
document.addEventListener('mousemove', () => sessionStore.registerActivity())

console.log('✅ App iniciada')
