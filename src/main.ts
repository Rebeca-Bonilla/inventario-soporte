import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Cargar tema inmediatamente después de crear pinia
import { useThemeStore } from './stores/theme'
const themeStore = useThemeStore()
themeStore.loadTheme()

app.mount('#app')
