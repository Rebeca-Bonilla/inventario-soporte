import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importar todos los estilos
import './styles/global.css'
import './styles/login.css'
import './styles/dashboard.css'
import './styles/registro.css'
import './styles/consulta.css'
import './styles/importacion.css'
import './styles/reportes.css'
import './styles/historial.css'
import './styles/archivados.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
