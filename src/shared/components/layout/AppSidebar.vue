<!-- src/shared/components/layout/AppSidebar.vue -->
<template>
  <aside class="app-sidebar">
    <!-- Información del usuario -->
    <div class="sidebar-user">
      <div class="user-avatar">
        {{ userInitials }}
      </div>
      <div class="user-info">
        <h4>{{ user?.nombre_completo || user?.username }}</h4>
        <p class="user-role">{{ user?.rol }}</p>
        <p class="user-cargo">{{ user?.cargo }}</p>
      </div>
    </div>

    <!-- Timer de sesión -->
    <div class="session-timer">
      <div class="timer-display">
        <span class="timer-icon">⏰</span>
        <span class="timer-label">Tiempo:</span>
        <span class="timer-value">{{ timeLeft }}</span>
      </div>
      <div class="timer-limit">Límite: 30:00</div>
    </div>

    <!-- Navegación -->
    <nav class="sidebar-nav">
      <button @click="goHome" class="nav-button">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Inicio</span>
      </button>
      <button @click="goBack" class="nav-button">
        <span class="nav-icon">↩️</span>
        <span class="nav-text">Atrás</span>
      </button>
    </nav>

    <!-- Logout -->
    <button @click="handleLogout" class="logout-button">
      <span class="logout-icon">🚪</span>
      <span class="logout-text">Cerrar Sesión</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/authService'

const router = useRouter()
const authService = new AuthService()
const user = computed(() => authService.getCurrentUser())

// Timer de sesión
const timeLeft = ref('30:00')
let timerInterval: NodeJS.Timeout

// Iniciales del usuario
const userInitials = computed(() => {
  const name = user.value?.nombre_completo || user.value?.username || ''
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

// Navegación
const goHome = () => {
  // Verificar cambios no guardados (simulado)
  const hasUnsavedChanges = false
  if (hasUnsavedChanges) {
    const confirm = window.confirm('Tienes cambios sin guardar. ¿Estás seguro?')
    if (!confirm) return
  }
  router.push('/dashboard')
}

const goBack = () => {
  const hasUnsavedChanges = false
  if (hasUnsavedChanges) {
    const confirm = window.confirm('Tienes cambios sin guardar. ¿Estás seguro?')
    if (!confirm) return
  }
  router.back()
}

const handleLogout = () => {
  const hasUnsavedChanges = false
  if (hasUnsavedChanges) {
    const confirm = window.confirm('Tienes cambios sin guardar. ¿Estás seguro?')
    if (!confirm) return
  }
  authService.logout()
  router.push('/login')
}

// Timer simple
onMounted(() => {
  let minutes = 30
  let seconds = 0

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        handleLogout()
        return
      }
      minutes--
      seconds = 59
    } else {
      seconds--
    }

    timeLeft.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
.app-sidebar {
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-user {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  font-size: 1.4rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-info h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 600;
}

.user-role {
  margin: 0 0 3px 0;
  font-size: 0.85rem;
  opacity: 0.9;
  text-transform: capitalize;
}

.user-cargo {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.7;
  font-style: italic;
}

/* Timer de sesión */
.session-timer {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.timer-display {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.timer-icon {
  font-size: 1.2rem;
}

.timer-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.timer-value {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1.3rem;
  color: #2ecc71;
  text-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
}

.timer-limit {
  font-size: 0.85rem;
  opacity: 0.7;
  text-align: center;
  padding-top: 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Navegación */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.nav-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
}

.nav-button:hover {
  background: rgba(52, 152, 219, 0.3);
  border-color: #3498db;
  transform: translateX(5px);
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-text {
  flex: 1;
}

/* Logout */
.logout-button {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
}

.logout-button:hover {
  background: linear-gradient(135deg, #c0392b, #a93226);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(231, 76, 60, 0.4);
}

.logout-icon {
  font-size: 1.2rem;
}

.logout-text {
  font-weight: 600;
}

/* Responsive */
@media (max-width: 1024px) {
  .app-sidebar {
    width: 220px;
  }
}

@media (max-width: 768px) {
  .app-sidebar {
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 15px;
  }

  .sidebar-user {
    width: 100%;
    margin-bottom: 15px;
  }

  .session-timer {
    width: 100%;
    margin-bottom: 15px;
  }

  .sidebar-nav {
    flex-direction: row;
    width: 100%;
    margin-bottom: 15px;
  }

  .nav-button {
    flex: 1;
    justify-content: center;
    padding: 12px;
  }

  .nav-text {
    display: none;
  }

  .logout-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
