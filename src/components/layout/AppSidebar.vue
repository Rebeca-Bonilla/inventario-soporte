<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <!-- Timer de sesión -->
      <div class="session-timer-section">
        <div class="timer-header">
          <span class="timer-icon">⏰</span>
          <span>Tiempo restante:</span>
        </div>
        <div class="timer-display">
          {{ formattedTime }}
        </div>
        <div class="timer-progress">
          <div class="timer-progress-bar" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>

      <!-- Botones de acción rápida -->
      <div class="sidebar-actions">
        <button @click="goHome" class="action-btn">
          <span class="action-icon">🏠</span>
          <span>Home</span>
        </button>

        <button @click="goBack" class="action-btn" :disabled="!canGoBack">
          <span class="action-icon">⬅️</span>
          <span>Regresar</span>
        </button>

        <button @click="handleLogout" class="action-btn logout">
          <span class="action-icon">🚪</span>
          <span>Salir</span>
        </button>
      </div>

      <!-- Información del usuario -->
      <div class="user-section">
        <div class="user-avatar">
          {{ userInitials }}
        </div>
        <div class="user-details">
          <h3 class="user-name">{{ sessionStore.user?.name }}</h3>
          <p class="user-role">{{ sessionStore.user?.role }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()

// Timer functionality
const timeLeft = ref(30 * 60) // 30 minutos en segundos

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const progressPercentage = computed(() => {
  return (timeLeft.value / (30 * 60)) * 100
})

let interval: number

onMounted(() => {
  interval = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      sessionStore.logout()
      router.push('/login')
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

// User info
const userInitials = computed(() => {
  const name = sessionStore.user?.name || 'US'
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Navigation
const canGoBack = computed(() => {
  return window.history.length > 1
})

const goBack = () => {
  if (sessionStore.hasUnsavedChanges) {
    const confirmLeave = window.confirm(
      'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?',
    )
    if (!confirmLeave) return
  }
  router.back()
}

const goHome = () => {
  if (sessionStore.hasUnsavedChanges) {
    const confirmLeave = window.confirm(
      'Tienes cambios sin guardar. ¿Estás seguro de que quieres ir al inicio?',
    )
    if (!confirmLeave) return
  }
  router.push('/dashboard')
}

const handleLogout = () => {
  if (sessionStore.hasUnsavedChanges) {
    const confirmLeave = window.confirm(
      'Tienes cambios sin guardar. ¿Estás seguro de que quieres cerrar sesión?',
    )
    if (!confirmLeave) return
  }
  sessionStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, var(--sidebar-bg) 0%, var(--bg-tertiary) 100%);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
}

.sidebar-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
}

/* Timer Section */
.session-timer-section {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.timer-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.timer-icon {
  font-size: 1.1rem;
}

.timer-display {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.timer-progress {
  height: 8px;
  background-color: var(--border-light);
  border-radius: 4px;
  overflow: hidden;
}

.timer-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--success-color), var(--primary-color));
  transition: width 1s linear;
  border-radius: 4px;
}

/* Action Buttons */
.sidebar-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--button-secondary-bg);
  color: var(--button-secondary-text);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  font-weight: 500;
  font-size: 0.95rem;
}

.action-btn:hover:not(:disabled) {
  background: var(--button-secondary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.action-btn.logout {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border-color: #ef4444;
  margin-top: 1rem;
}

.action-btn.logout:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  transform: translateY(-2px);
}

.action-icon {
  font-size: 1.4rem;
  width: 24px;
  text-align: center;
}

/* User Section */
.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--card-bg);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  margin-top: auto;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: var(--shadow-sm);
}

.user-details {
  flex: 1;
}

.user-name {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.user-role {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin: 0;
  text-transform: capitalize;
  font-weight: 500;
}

/* Efectos cuando queda poco tiempo */
.timer-display:contains('05:') {
  color: var(--warning-color) !important;
}

.timer-display:contains('02:') {
  color: var(--error-color) !important;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
