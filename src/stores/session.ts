// src/stores/session.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LoginCredentials, User, UserBasicInfo } from '@/types/auth'
import { authService } from '@/services/authService'

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const hasUnsavedChanges = ref(false)

  // Timer de sesión
  const sessionStartTime = ref<Date | null>(null)
  const lastActivityTime = ref<Date | null>(null)
  const sessionTimeout = ref<number | null>(null) // Cambiado a number
  const timeLimit = 30 * 60 * 1000 // 30 minutos en milisegundos

  // Computed para el tiempo restante
  const remainingTime = computed(() => {
    if (!lastActivityTime.value) return timeLimit

    const now = new Date().getTime()
    const lastActivity = lastActivityTime.value.getTime()
    const elapsed = now - lastActivity
    const remaining = timeLimit - elapsed

    return remaining > 0 ? remaining : 0
  })

  // Computed para el tiempo formateado
  const formattedRemainingTime = computed(() => {
    const remaining = remainingTime.value
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  // Computed para el tiempo actual
  const currentTime = computed(() => {
    return new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
  })

  // Inicializar timer de sesión
  const initializeSessionTimer = () => {
    sessionStartTime.value = new Date()
    lastActivityTime.value = new Date()
    resetSessionTimer()
  }

  // Reiniciar timer con actividad
  const resetSessionTimer = () => {
    // Limpiar timeout anterior
    if (sessionTimeout.value !== null) {
      clearTimeout(sessionTimeout.value)
    }

    // Actualizar tiempo de última actividad
    lastActivityTime.value = new Date()

    // Configurar nuevo timeout
    sessionTimeout.value = window.setTimeout(() => {
      // Logout automático cuando se acaba el tiempo
      forceLogoutByTimeout()
    }, remainingTime.value)
  }

  // Forzar logout por timeout
  const forceLogoutByTimeout = () => {
    console.log('Sesión expirada por inactividad')
    logout()
  }

  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedAuth = localStorage.getItem('isAuthenticated')

    if (savedUser && savedAuth === 'true') {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
      initializeSessionTimer()
    }
  }

  const userInfo = (): UserBasicInfo => {
    if (!user.value) {
      return {
        username: 'Invitado',
        role: 'Usuario',
      }
    }
    return {
      username: user.value.username,
      role: user.value.role,
    }
  }

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const userData = await authService.login(credentials)

      if (userData) {
        user.value = userData
        isAuthenticated.value = true
        hasUnsavedChanges.value = false
        initializeSessionTimer()

        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isAuthenticated', 'true')
      } else {
        throw new Error('Credenciales incorrectas')
      }
    } catch (error) {
      throw new Error('Error de autenticación. Verifique sus credenciales.')
    }
  }

  const logout = (): void => {
    // Limpiar timeout
    if (sessionTimeout.value !== null) {
      clearTimeout(sessionTimeout.value)
      sessionTimeout.value = null
    }

    user.value = null
    isAuthenticated.value = false
    hasUnsavedChanges.value = false
    sessionStartTime.value = null
    lastActivityTime.value = null

    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  // Registrar actividad del usuario
  const registerActivity = () => {
    if (isAuthenticated.value) {
      resetSessionTimer()
    }
  }

  return {
    user,
    isAuthenticated,
    hasUnsavedChanges,
    remainingTime,
    formattedRemainingTime,
    currentTime,
    userInfo,
    initializeAuth,
    login,
    logout,
    registerActivity,
    resetSessionTimer,
  }
})
