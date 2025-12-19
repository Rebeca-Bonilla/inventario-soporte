import { defineStore } from 'pinia'
import { authService } from '@/modules/auth/services/authService'
import type { LoginCredentials } from '@/modules/auth/services/authService'

export const useSessionStore = defineStore('session', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.rol === 'admin',
  },

  actions: {
    async login(credentials: LoginCredentials) {
      try {
        this.isLoading = true
        this.error = null

        const response = await authService.login(credentials)

        if (response.success && response.token && response.user) {
          this.token = response.token
          this.user = response.user

          // Guardar en localStorage
          localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))

          // Iniciar timer de inactividad (30 minutos)
          this.startInactivityTimer()

          return { success: true }
        } else {
          this.error = response.error || 'Error en login'
          return { success: false, error: this.error }
        }
      } catch (error: any) {
        this.error = error.message || 'Error de conexión'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.error = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Limpiar timer
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer)
      }
    },

    startInactivityTimer() {
      // Limpiar timer anterior
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer)
      }

      // Nuevo timer de 30 minutos (1,800,000 ms)
      this.inactivityTimer = setTimeout(
        () => {
          this.logout()
          // Redirigir al login
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
        },
        30 * 60 * 1000,
      ) // 30 minutos
    },

    resetInactivityTimer() {
      this.startInactivityTimer()
    },

    inactivityTimer: null as NodeJS.Timeout | null,
  },
})
