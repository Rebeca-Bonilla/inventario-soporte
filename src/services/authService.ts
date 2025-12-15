import api from './api'

export interface LoginCredentials {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  nombre_completo: string
  rol: 'admin' | 'usuario'
  activo: boolean
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/auth/login', credentials)

      if (response.success && response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))

        // Configurar timeout automático para logout (30 min)
        setTimeout(
          () => {
            this.logout()
          },
          30 * 60 * 1000,
        ) // 30 minutos
      }

      return response
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  },

  async logout() {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await api.post('/auth/logout', { token })
      }
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  async verifyToken() {
    try {
      const response = await api.get('/auth/verify')
      return response
    } catch (error) {
      this.logout()
      throw error
    }
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.rol === 'admin'
  },

  // Para el timer de inactividad
  resetInactivityTimer() {
    // Resetear el timer de 30 minutos
    clearTimeout(this.inactivityTimer)
    this.inactivityTimer = setTimeout(
      () => {
        this.logout()
        alert('Sesión expirada por inactividad')
        window.location.href = '/login'
      },
      30 * 60 * 1000,
    )
  },

  inactivityTimer: null as any,
}
