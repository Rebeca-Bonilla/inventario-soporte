<!-- src/shared/components/common/SessionTimer.vue -->
<template>
  <div v-if="showTimer" class="session-timer" :class="timerClass">
    <div class="timer-content">
      <span class="timer-icon">⏰</span>
      <span class="timer-text">
        Tiempo restante:
        <strong>{{ formattedTime }}</strong>
      </span>
    </div>
    <div class="timer-progress">
      <div class="progress-bar" :style="progressStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Configuración
const SESSION_LIMIT = 30 * 60 // 30 minutos en segundos
const WARNING_THRESHOLD = 5 * 60 // 5 minutos
const DANGER_THRESHOLD = 1 * 60 // 1 minuto

// Estado
const elapsedSeconds = ref(0)
const timerInterval = ref<NodeJS.Timeout | null>(null)
const showTimer = ref(true)

// Computed
const remainingSeconds = computed(() => Math.max(0, SESSION_LIMIT - elapsedSeconds.value))

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const progressPercentage = computed(() => {
  return Math.max(0, Math.min(100, (elapsedSeconds.value / SESSION_LIMIT) * 100))
})

const progressStyle = computed(() => ({
  width: `${progressPercentage.value}%`,
}))

const timerClass = computed(() => {
  if (remainingSeconds.value <= DANGER_THRESHOLD) return 'danger'
  if (remainingSeconds.value <= WARNING_THRESHOLD) return 'warning'
  return 'normal'
})

// Métodos
const updateTimer = () => {
  elapsedSeconds.value++

  if (remainingSeconds.value <= 0) {
    // Sesión expirada
    clearTimer()
    showTimer.value = false
    alert('Tu sesión ha expirado por inactividad')
    // Aquí normalmente cerrarías sesión
  }
}

const clearTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const resetTimer = () => {
  elapsedSeconds.value = 0
}

const handleUserActivity = () => {
  resetTimer()
}

// Lifecycle
onMounted(() => {
  // Iniciar timer
  timerInterval.value = setInterval(updateTimer, 1000)

  // Detectar actividad del usuario
  window.addEventListener('mousemove', handleUserActivity)
  window.addEventListener('keydown', handleUserActivity)
  window.addEventListener('click', handleUserActivity)
})

onUnmounted(() => {
  clearTimer()
  window.removeEventListener('mousemove', handleUserActivity)
  window.removeEventListener('keydown', handleUserActivity)
  window.removeEventListener('click', handleUserActivity)
})
</script>

<style scoped>
.session-timer {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.session-timer.normal {
  border-color: #3498db;
  background: #e3f2fd;
}

.session-timer.warning {
  border-color: #f39c12;
  background: #fff3e0;
}

.session-timer.danger {
  border-color: #e74c3c;
  background: #ffebee;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.timer-content {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.timer-icon {
  font-size: 1.2rem;
}

.timer-text {
  flex: 1;
  font-size: 0.9rem;
  color: #333;
}

.timer-text strong {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
}

.timer-progress {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 1s linear;
}

.session-timer.normal .progress-bar {
  background: #3498db;
}

.session-timer.warning .progress-bar {
  background: #f39c12;
}

.session-timer.danger .progress-bar {
  background: #e74c3c;
}

/* Responsive */
@media (max-width: 768px) {
  .session-timer {
    bottom: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
  }
}
</style>
