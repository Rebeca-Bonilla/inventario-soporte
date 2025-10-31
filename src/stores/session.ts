import { defineStore } from 'pinia'
import { ref, computed, onUnmounted } from 'vue'

interface User {
  id: number
  email: string
  name: string
  role: string
}

interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastActivity = ref<number>(Date.now())
  let inactivityTimer: number | null = null

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userName = computed(() => user.value?.name || 'Usuario')

  // Configurar el timer de inactividad
  const resetInactivityTimer = () => {
    lastActivity.value = Date.now()

    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    // 30 minutos = 30 * 60 * 1000 = 1,800,000 ms
    inactivityTimer = window.setTimeout(
      () => {
        if (isAuthenticated.value) {
          logout()
          // Opcional: redirigir al login
          window.location.href = '/login'
        }
      },
      30 * 60 * 1000,
    ) // 30 minutos
  }

  // Detectar actividad del usuario
  const setupActivityListeners = () => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach((event) => {
      document.addEventListener(event, resetInactivityTimer, true)
    })
  }

  const cleanupActivityListeners = () => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach((event) => {
      document.removeEventListener(event, resetInactivityTimer, true)
    })
  }

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    isLoading.value = true
    error.value = null

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === 'admin@inventario.com' && password === 'Admin123!') {
        const userData: User = {
          id: 1,
          email: email,
          name: 'Administrador',
          role: 'admin',
        }

        const authToken = 'demo-token-' + Date.now()

        user.value = userData
        token.value = authToken
        localStorage.setItem('auth_token', authToken)
        localStorage.setItem('last_activity', Date.now().toString())

        // Iniciar el timer de inactividad
        resetInactivityTimer()
        setupActivityListeners()

        return { success: true, user: userData, token: authToken }
      } else {
        throw new Error('Credenciales inválidas')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error de autenticación'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null

    // Limpiar timers y listeners
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
      inactivityTimer = null
    }
    cleanupActivityListeners()

    // Limpiar localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('last_activity')
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedActivity = localStorage.getItem('last_activity')

    if (savedToken) {
      // Verificar si la sesión ha expirado por inactividad
      if (savedActivity) {
        const lastActivityTime = parseInt(savedActivity)
        const currentTime = Date.now()
        const timeDiff = currentTime - lastActivityTime

        // Si han pasado más de 30 minutos, hacer logout
        if (timeDiff > 30 * 60 * 1000) {
          logout()
          return
        }
      }

      token.value = savedToken
      user.value = {
        id: 1,
        email: 'admin@inventario.com',
        name: 'Administrador',
        role: 'admin',
      }

      // Reiniciar el timer de inactividad
      resetInactivityTimer()
      setupActivityListeners()
    }
  }

  // Limpiar al destruir el componente
  onUnmounted(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }
    cleanupActivityListeners()
  })

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userName,
    login,
    logout,
    initializeAuth,
  }
})
