<template>
  <div class="sidebar">
    <!-- Información del usuario -->
    <div class="user-info">
      <div class="user-avatar">
        {{ userInitials }}
      </div>
      <div class="user-details">
        <h3>{{ sessionStore.user?.name || sessionStore.user?.username }}</h3>
        <p>{{ sessionStore.user?.role }}</p>
      </div>
    </div>

    <!-- Timer de sesión -->
    <SessionTimer />

    <!-- Navegación -->
    <nav class="sidebar-nav">
      <button @click="goHome" class="nav-btn">🏠 Inicio</button>
      <button @click="goBack" class="nav-btn">↩️ Atrás</button>
    </nav>

    <!-- Botón de logout -->
    <button @click="handleLogout" class="logout-btn">🚪 Cerrar Sesión</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/modules/auth/stores/session'
import SessionTimer from '@/components/SessionTimer.vue'

const router = useRouter()
const sessionStore = useSessionStore()

// Iniciales del usuario
const userInitials = computed(() => {
  const name = sessionStore.user?.name || sessionStore.user?.username || ''
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const confirmLeave = (message: string): boolean => {
  return window.confirm(message)
}

const goBack = () => {
  if (sessionStore.hasUnsavedChanges) {
    const confirm = confirmLeave('Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?')
    if (!confirm) return
  }
  router.back()
}

const goHome = () => {
  if (sessionStore.hasUnsavedChanges) {
    const confirm = confirmLeave(
      'Tienes cambios sin guardar. ¿Estás seguro de que quieres ir al inicio?',
    )
    if (!confirm) return
  }
  router.push('/dashboard')
}

const handleLogout = () => {
  if (sessionStore.hasUnsavedChanges) {
    const confirm = confirmLeave(
      'Tienes cambios sin guardar. ¿Estás seguro de que quieres cerrar sesión?',
    )
    if (!confirm) return
  }
  sessionStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
}

.user-details h3 {
  margin: 0;
  font-size: 1rem;
}

.user-details p {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.8;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-btn {
  background: #34495e;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: #3498db;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #c0392b;
}
</style>
