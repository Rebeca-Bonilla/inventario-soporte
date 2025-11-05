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
              <span class="timer-value">00:00</span>
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

      <!-- Información del sistema -->
      <div class="sidebar-section">
        <h3>Información del Sistema</h3>
        <div class="system-info">
          <div class="info-item">
            <span class="info-label">Equipos activos:</span>
            <span class="info-value">45</span>
          </div>
          <div class="info-item">
            <span class="info-label">Usuarios:</span>
            <span class="info-value">23</span>
          </div>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="sidebar-section">
        <h3>Acciones Rápidas</h3>
        <div class="quick-actions">
          <button class="quick-btn" @click="nuevoEquipo">➕ Nuevo Equipo</button>
          <button class="quick-btn" @click="generarReporte">📊 Generar Reporte</button>
          <button class="quick-btn" @click="buscarAvanzado">🔍 Búsqueda Avanzada</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

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

const buscarAvanzado = () => {
  alert('Búsqueda avanzada activada')
}
</script>

<style scoped>
.app-sidebar {
  width: 280px;
  background: #1e40af;
  color: white;
  padding: 20px;
  overflow-y: auto;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.sidebar-section h3 {
  margin: 0 0 15px 0;
  font-size: 1.1em;
  color: white;
  border-bottom: 1px solid #3b82f6;
  padding-bottom: 8px;
}

.session-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.user-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: #1e3a8a;
  border-radius: 8px;
}

.user-avatar {
  font-size: 1.5em;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  font-size: 1em;
}

.user-role {
  font-size: 0.8em;
  opacity: 0.8;
}

.timer-display {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: #1e3a8a;
  border-radius: 8px;
}

.timer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timer-label {
  font-size: 0.9em;
  color: #bdc3c7;
}

.timer-value {
  font-weight: bold;
  color: #60a5fa;
}

.control-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn:hover {
  transform: translateX(3px);
}

.home-btn:hover {
  background: #3b82f6;
}

.back-btn:hover {
  background: #f59e0b;
}

.logout-btn:hover {
  background: #ef4444;
}

.system-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.info-label {
  font-size: 0.9em;
  color: #bdc3c7;
}

.info-value {
  font-weight: bold;
  color: #60a5fa;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s;
  font-size: 0.9em;
}

.quick-btn:hover {
  background: #60a5fa;
  transform: translateX(3px);
}
</style>
