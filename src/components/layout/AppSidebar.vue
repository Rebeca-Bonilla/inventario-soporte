<template>
  <aside class="sidebar" :class="{ 'sidebar-dark': isDarkMode, 'sidebar-light': !isDarkMode }">
    <!-- Header del Sidebar -->
    <div class="sidebar-header">
      <div class="usuario-info">
        <div class="avatar">{{ userInitial }}</div>
        <div class="user-details">
          <div class="nombre">{{ user?.username || 'admin' }}</div>
          <div class="rol">{{ user?.role || 'Administrador' }}</div>
        </div>
      </div>

      <!-- Switch Modo Oscuro/Claro -->
      <div class="theme-switch">
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode" @change="toggleTheme" />
          <span class="slider"></span>
        </label>
        <span class="theme-label">{{ isDarkMode ? '🌙 Oscuro' : '☀️ Claro' }}</span>
      </div>
    </div>

    <!-- Timer -->
    <SessionTimer />

    <!-- Navegación Principal -->
    <nav class="navegacion-principal">
      <div class="nav-section">
        <h3 class="section-title">Navegación</h3>
        <div class="nav-item" @click="goHome">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Home</span>
        </div>
        <div class="nav-item" @click="goBack">
          <span class="nav-icon">↩️</span>
          <span class="nav-text">Atrás</span>
        </div>
        <div class="nav-item" @click="logout">
          <span class="nav-icon">🚪</span>
          <span class="nav-text">Salir</span>
        </div>
      </div>
    </nav>

    <!-- Información del Sistema -->
    <div class="info-section">
      <h3 class="section-title">Información del Sistema</h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">💻</div>
          <div class="info-content">
            <div class="info-value">45</div>
            <div class="info-label">Equipos Activos</div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">👥</div>
          <div class="info-content">
            <div class="info-value">23</div>
            <div class="info-label">Usuarios</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones Rápidas -->
    <div class="acciones-section">
      <h3 class="section-title">Acciones Rápidas</h3>
      <div class="acciones-grid">
        <button class="accion-btn" @click="nuevoEquipo">
          <span class="accion-icon">➕</span>
          <span>Nuevo Equipo</span>
        </button>
        <button class="accion-btn" @click="generarReporte">
          <span class="accion-icon">📊</span>
          <span>Generar Reporte</span>
        </button>
        <button class="accion-btn" @click="busquedaAvanzada">
          <span class="accion-icon">🔍</span>
          <span>Búsqueda Avanzada</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import SessionTimer from '@/components/SessionTimer.vue'

const router = useRouter()
const sessionStore = useSessionStore()
const user = computed(() => sessionStore.user)
const isDarkMode = ref(true) // Por defecto modo oscuro

const userInitial = computed(() => {
  return user.value?.username?.charAt(0).toUpperCase() || 'A'
})

// Cambiar tema
const toggleTheme = () => {
  const html = document.documentElement
  if (isDarkMode.value) {
    html.classList.add('dark')
    html.classList.remove('light')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.add('light')
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Cargar tema guardado
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  isDarkMode.value = savedTheme === 'dark'
  toggleTheme() // Aplicar tema al cargar
})

// Navegación
const goHome = () => router.push('/dashboard')
const goBack = () => router.back()
const logout = () => {
  sessionStore.logout()
  router.push('/login')
}
const nuevoEquipo = () => router.push('/registro')
const generarReporte = () => router.push('/reportes')
const busquedaAvanzada = () => console.log('Búsqueda avanzada')
</script>

<style scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: all 0.3s ease;
}

/* Modo Oscuro */
.sidebar-dark {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  border-right: 1px solid #374151;
}

/* Modo Claro */
.sidebar-light {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1f2937;
  border-right: 1px solid #cbd5e1;
}

/* Header */
.sidebar-header {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.usuario-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  color: white;
}

.user-details {
  flex: 1;
}

.nombre {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 2px;
}

.rol {
  font-size: 14px;
  opacity: 0.8;
}

/* Switch de Tema */
.theme-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.sidebar-light .theme-switch {
  background: rgba(0, 0, 0, 0.05);
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6b7280;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #3b82f6;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.theme-label {
  font-size: 14px;
  font-weight: 500;
}

/* Secciones */
.section-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.sidebar-light .section-title {
  opacity: 0.6;
}

/* Navegación */
.navegacion-principal {
  margin-bottom: 25px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 5px;
}

.sidebar-dark .nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.sidebar-light .nav-item:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateX(5px);
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
}

/* Información del Sistema */
.info-section {
  margin-bottom: 25px;
}

.info-grid {
  display: grid;
  gap: 10px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-light .info-card {
  background: rgba(0, 0, 0, 0.05);
}

.info-icon {
  font-size: 20px;
}

.info-content {
  flex: 1;
}

.info-value {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2px;
}

.info-label {
  font-size: 12px;
  opacity: 0.8;
}

/* Acciones Rápidas */
.acciones-grid {
  display: grid;
  gap: 8px;
}

.accion-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.sidebar-dark .accion-btn {
  background: rgba(59, 130, 246, 0.2);
  color: white;
}

.sidebar-dark .accion-btn:hover {
  background: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.sidebar-light .accion-btn {
  background: rgba(59, 130, 246, 0.1);
  color: #1e40af;
}

.sidebar-light .accion-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

.accion-icon {
  font-size: 16px;
}
</style>
