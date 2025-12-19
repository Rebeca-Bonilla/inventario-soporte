import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// ESTILOS GLOBALES - RUTAS ABSOLUTAS
import '@/shared/styles/global.css'
import '@/shared/styles/colors.css'
import '@/shared/styles/layout.css'
import '@/shared/styles/components/buttons.css'
import '@/shared/styles/components/forms.css'
import '@/shared/styles/components/tables.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')