import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  email: string
  name: string
  role: string
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userName = computed(() => user.value?.name || 'Usuario')

  const login = async (email: string, password: string) => {
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

        user.value = userData
        token.value = 'demo-token'
        localStorage.setItem('auth_token', 'demo-token')

        return { success: true, user: userData }
      } else {
        throw new Error('Credenciales inválidas')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error de autenticación'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      token.value = savedToken
      user.value = {
        id: 1,
        email: 'admin@inventario.com',
        name: 'Administrador',
        role: 'admin',
      }
    }
  }

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
