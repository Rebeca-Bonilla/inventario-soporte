<template>
  <div class="session-timer">
    <div class="timer-display">
      <div class="timer-item">
        <span class="label">Tiempo:</span>
        <strong class="time">{{ formattedTime }}</strong>
      </div>
      <div class="timer-item">
        <span class="label">Límite:</span>
        <strong class="time">30:00</strong>
      </div>
    </div>
    <div v-if="showWarning" class="warning-message">
      ⚠️ Sesión expira en {{ warningTime }} minuto{{ warningTime !== 1 ? 's' : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const timeLeft = ref(1800) // 30 minutos en segundos
const formattedTime = ref('30:00')
const showWarning = ref(false)
const warningTime = ref(5)

let intervalId: number

// Función para actualizar el display
const updateDisplay = () => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  formattedTime.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// Función para resetear el timer
const resetTimer = () => {
  console.log('Actividad detectada - Reseteando timer')
  timeLeft.value = 1800
  showWarning.value = false
  updateDisplay()
}

// Función para cerrar sesión
const logout = () => {
  console.log('Cerrando sesión por inactividad')
  // Limpiar interval
  if (intervalId) clearInterval(intervalId)

  // Aquí va tu lógica de logout del store
  // sessionStore.logout()

  // Redirigir al login
  router.push('/login')
  alert('Sesión expirada por inactividad')
}

// Configurar listeners de actividad
const setupActivityListeners = () => {
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

  events.forEach((event) => {
    document.addEventListener(event, resetTimer, { passive: true })
  })

  return () => {
    events.forEach((event) => {
      document.removeEventListener(event, resetTimer)
    })
  }
}

onMounted(() => {
  console.log('SessionTimer montado')

  // Configurar listeners
  const cleanup = setupActivityListeners()

  // Iniciar countdown
  intervalId = window.setInterval(() => {
    timeLeft.value--

    // Actualizar display
    updateDisplay()

    // Mostrar advertencias
    if (timeLeft.value === 300) {
      // 5 minutos
      showWarning.value = true
      warningTime.value = 5
      console.log('Advertencia: 5 minutos restantes')
    } else if (timeLeft.value === 120) {
      // 2 minutos
      warningTime.value = 2
      console.log('Advertencia: 2 minutos restantes')
    } else if (timeLeft.value === 60) {
      // 1 minuto
      warningTime.value = 1
      console.log('Advertencia: 1 minuto restante')
    }

    // Cerrar sesión al llegar a 0
    if (timeLeft.value <= 0) {
      console.log('Tiempo agotado - Cerrando sesión')
      logout()
    }
  }, 1000)

  onUnmounted(() => {
    console.log('SessionTimer desmontado')
    if (intervalId) clearInterval(intervalId)
    cleanup()
  })
})
</script>

<style scoped>
.session-timer {
  padding: 12px;
  background: #374151;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  margin-top: 10px;
  border: 1px solid #4b5563;
}

.timer-display {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.timer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #d1d5db;
}

.time {
  color: white;
  font-size: 15px;
}

.warning-message {
  margin-top: 8px;
  padding: 6px 8px;
  background: #f59e0b;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  animation: pulse 2s infinite;
  border: 1px solid #d97706;
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
</style>
