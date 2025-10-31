<!-- src/components/layout/AppLayout.vue -->
<template>
  <div class="app-layout">
    <NavbarView
      :user="userInfo"
      :current-time="currentTime"
      :remaining-time="remainingTime"
      @navigate="handleNavigation"
      @logout="handleLogout"
    />

    <main class="main-content">
      <router-view />
    </main>

    <!-- Modal de confirmación para cambios no guardados -->
    <div v-if="showConfirmationModal" class="modal-overlay">
      <div class="modal tech-border tech-shadow">
        <h3>Confirmar acción</h3>
        <p>{{ confirmationMessage }}</p>
        <div class="modal-actions">
          <button @click="confirmAction" class="btn-primary">Sí, continuar</button>
          <button @click="cancelAction" class="btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import NavbarView from './NavbarView.vue'
import type { UserBasicInfo } from '@/types/auth'

const router = useRouter()
const sessionStore = useSessionStore()

const showConfirmationModal = ref(false)
const pendingAction = ref<string | null>(null)
const confirmationMessage = ref('')

// Usar el getter que siempre retorna un objeto UserBasicInfo
const userInfo = computed<UserBasicInfo>(() => sessionStore.userInfo())
const currentTime = ref('00:00')
const remainingTime = ref(1800) // 30 minutos

let inactivityTimer: number

const handleNavigation = (route: string) => {
  if (sessionStore.hasUnsavedChanges) {
    showConfirmationModal.value = true
    pendingAction.value = route
    confirmationMessage.value = 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
  } else {
    router.push(`/${route}`)
  }
}

const handleLogout = () => {
  sessionStore.logout()
  router.push('/login')
}

const confirmAction = () => {
  if (pendingAction.value) {
    router.push(`/${pendingAction.value}`)
  }
  showConfirmationModal.value = false
  pendingAction.value = null
}

const cancelAction = () => {
  showConfirmationModal.value = false
  pendingAction.value = null
}

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(() => {
    sessionStore.logout()
    router.push('/login')
  }, remainingTime.value * 1000)
}

onMounted(() => {
  // Inicializar timer de inactividad
  resetInactivityTimer()

  // Resetear timer en eventos de usuario
  document.addEventListener('mousemove', resetInactivityTimer)
  document.addEventListener('keypress', resetInactivityTimer)
})

onUnmounted(() => {
  clearTimeout(inactivityTimer)
  document.removeEventListener('mousemove', resetInactivityTimer)
  document.removeEventListener('keypress', resetInactivityTimer)
})
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: var(--color-light-gray);
  overflow-y: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}

.modal h3 {
  margin-bottom: 1rem;
  color: var(--color-dark-text);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
