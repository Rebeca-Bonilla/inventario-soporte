import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './styles/global.css'
import './styles/layout.css'
import './styles/login.css'
import './styles/dashboard.css'
import './styles/registros.css'
import './styles/consulta.css'
import './styles/importacion.css'
import './styles/reportes.css'
import './styles/historial.css'
import './styles/archivados.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
