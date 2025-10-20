import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importar estilos globales
import './styles/global.css'
import './styles/login.css'
import './styles/dashboard.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
