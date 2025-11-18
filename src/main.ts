import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Importar estilos globales
import '@/styles/global.css'
import '@/styles/colors.css'
import '@/styles/buttons.css'
import '@/styles/forms.css'
import '@/styles/tables.css'
import '@/styles/layout.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
