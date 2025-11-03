<template>
  <aside class="app-sidebar">
    <div class="sidebar-content">
      <!-- Información de usuario y tiempo -->
      <div class="sidebar-section">
        <h3>Sesión</h3>
        <div class="session-info">
          <div class="user-display">
            <div class="user-avatar">👤</div>
            <div class="user-details">
              <span class="username">admin</span>
              <span class="user-role">Administrador</span>
            </div>
          </div>
          <div class="timer-display">
            <div class="timer-item">
              <span class="timer-label">Tiempo:</span>
              <span class="timer-value">{{ timerFormatted }}</span>
            </div>
            <div class="timer-item">
              <span class="timer-label">Límite:</span>
              <span class="timer-value">30:00</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de control -->
      <div class="sidebar-section">
        <h3>Navegación</h3>
        <div class="control-buttons">
          <button @click="goHome" class="control-btn home-btn">🏠 Home</button>
          <button @click="goBack" class="control-btn back-btn">⬅️ Atrás</button>
          <button @click="handleLogout" class="control-btn logout-btn">🚪 Salir</button>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="sidebar-section">
        <h3>Acciones Rápidas</h3>
        <div class="quick-actions">
          <button class="quick-btn" @click="nuevoEquipo">➕ Nuevo Equipo</button>
          <button class="quick-btn" @click="generarReporte">📊 Generar Reporte</button>
        </div>
      </div>
    </div>
  </aside>
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

const nuevoEquipo = () => {
  router.push('/registro')
}

const generarReporte = () => {
  router.push('/reportes')
}
</script>

<style scoped>
@import '@/styles/sidebar.css';
</style>
