import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/auth'

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)
  const lastActivity = ref<number>(Date.now())
  const hasUnsavedChanges = ref<boolean>(false)
  const timeout = ref<number>(30 * 60 * 1000) // 30 minutos
  let inactivityTimer: number | null = null

  // INICIALIZAR con usuario nulo para forzar login
  const isAuthenticated = computed(() => {
    // Forzar falso inicialmente hasta que se haga login
    return !!user.value
  })

  const isAdmin = computed(() => user.value?.role === 'admin')

  const resetTimer = () => {
    lastActivity.value = Date.now()
  }

  const checkInactivity = () => {
    const currentTime = Date.now()
    if (currentTime - lastActivity.value > timeout.value) {
      logoutDueToInactivity()
    }
  }

  const logoutDueToInactivity = () => {
    console.log('Sesión expirada por inactividad')
    logout()
    if (typeof window !== 'undefined') {
      window.location.href = '/login?reason=inactivity'
    }
  }

  const login = async (userData: User) => {
    console.log('🔄 Iniciando sesión para usuario:', userData)
    user.value = userData
    resetTimer()

    // Configurar verificación de inactividad
    if (inactivityTimer) {
      clearInterval(inactivityTimer)
    }
    inactivityTimer = window.setInterval(checkInactivity, 60000) // Verificar cada minuto

    console.log('✅ Sesión iniciada correctamente')
  }

  const logout = () => {
    console.log('🔄 Cerrando sesión')
    user.value = null
    hasUnsavedChanges.value = false

    if (inactivityTimer) {
      clearInterval(inactivityTimer)
      inactivityTimer = null
    }

    console.log('✅ Sesión cerrada correctamente')
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    hasUnsavedChanges,
    resetTimer,
    login,
    logout,
  }
})
