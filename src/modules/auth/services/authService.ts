import api from '@/services/api'

export interface LoginCredentials {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  nombre_completo: string
  rol: 'admin' | 'usuario'
}

export interface LoginResponse {
  success: boolean
  token?: string
  user?: User
  error?: string
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('🚀 authService.login() llamado con:', credentials)
    console.log('🌐 URL del API:', import.meta.env.VITE_API_URL || 'http://localhost:3000')
    try {
      console.log('🔐 Enviando login a backend...', credentials)

      // api.post ya devuelve response.data gracias al interceptor
      const result = await api.post('/auth/login', credentials)
      console.log('✅ Respuesta del backend:', result)

      // Guardar token si existe
      if (result.token) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
      }

      return result
    } catch (error: any) {
      console.error('❌ Error en login:', error)

      // El error ya viene transformado por el interceptor
      return {
        success: false,
        error: error?.error || error?.message || 'Error de conexión'
      }
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  async checkAuth(): Promise<{ isAuthenticated: boolean; user?: User }> {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (token && userStr) {
      try {
        // Opcional: verificar token con backend
        // await api.get('/auth/verify')
        return {
          isAuthenticated: true,
          user: JSON.parse(userStr)
        }
      } catch {
        return { isAuthenticated: false }
      }
    }

    return { isAuthenticated: false }
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }
}
