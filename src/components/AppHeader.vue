<!-- components/AppHeader.vue -->
<template>
  <header class="app-header">
    <!-- Logo y Título -->
    <div class="header-left">
      <h1 class="logo">🏢 Sistema Equipos</h1>
    </div>

    <!-- Menú de Navegación -->
    <nav class="header-nav">
      <router-link to="/dashboard" class="nav-item"> 📊 Dashboard </router-link>
      <router-link to="/registro" class="nav-item"> ➕ Registro </router-link>
      <router-link to="/consulta" class="nav-item"> 🔍 Consulta </router-link>
      <router-link to="/archivados" class="nav-item"> 📁 Archivados </router-link>
      <router-link to="/importacion" class="nav-item"> 📥 Importación </router-link>
      <router-link to="/reportes" class="nav-item"> 📈 Reportes </router-link>
      <router-link to="/historial" class="nav-item"> 🕒 Historial </router-link>
    </nav>

    <!-- Información de usuario y controles -->
    <div class="header-right">
      <!-- Contador de tiempo -->
      <div class="timer">
        <span>Tiempo: {{ timerFormatted }}</span>
        <span>Límite: 30:00</span>
      </div>

      <!-- Info usuario -->
      <div class="user-info">
        <span class="username">admin</span>
        <span class="user-role">Administrador</span>
      </div>

      <!-- Botones de control -->
      <div class="header-controls">
        <button @click="goHome" class="control-btn" title="Ir al Home">🏠 Home</button>
        <button @click="goBack" class="control-btn" title="Atrás">⬅️ Atrás</button>
        <button @click="handleLogout" class="control-btn logout" title="Cerrar sesión">
          🚪 Salir
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const timerFormatted = ref('00:00')

// Timer logic
let timerInterval: number
const startTime = ref(Date.now())

const updateTimer = () => {
  const elapsed = Date.now() - startTime.value
  const minutes = Math.floor(elapsed / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  timerFormatted.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

onMounted(() => {
  timerInterval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  clearInterval(timerInterval)
})

// Navigation methods
const goHome = () => {
  router.push('/dashboard')
}

const goBack = () => {
  router.back()
}

const handleLogout = async () => {
  const { useSessionStore } = await import('@/stores/session')
  const sessionStore = useSessionStore()
  sessionStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2c3e50;
  color: white;
  padding: 0 20px;
  height: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-left .logo {
  margin: 0;
  font-size: 1.4em;
  font-weight: bold;
  white-space: nowrap;
}

.header-nav {
  display: flex;
  gap: 5px;
  flex: 1;
  justify-content: center;
  margin: 0 20px;
}

.nav-item {
  color: #ecf0f1;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 0.9em;
  white-space: nowrap;
}

.nav-item:hover {
  background: #34495e;
  transform: translateY(-2px);
}

.nav-item.router-link-active {
  background: #3498db;
  color: white;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.timer {
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  text-align: right;
}

.timer span {
  line-height: 1.2;
}

.user-info {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.username {
  font-weight: bold;
  font-size: 0.9em;
}

.user-role {
  font-size: 0.8em;
  opacity: 0.8;
}

.header-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  background: #34495e;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 0.85em;
  white-space: nowrap;
}

.control-btn:hover {
  background: #3498db;
}

.control-btn.logout {
  background: #e74c3c;
}

.control-btn.logout:hover {
  background: #c0392b;
}
</style>
