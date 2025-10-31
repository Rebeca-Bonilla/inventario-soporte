// src/stores/session.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginCredentials, User, UserBasicInfo } from '@/types/auth'
import { authService } from '@/services/authService'

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const hasUnsavedChanges = ref(false)
  const isInitialized = ref(false)

  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedAuth = localStorage.getItem('isAuthenticated')

    if (savedUser && savedAuth === 'true') {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
    isInitialized.value = true
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
    user.value = null
    isAuthenticated.value = false
    hasUnsavedChanges.value = false

    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  return {
    user,
    isAuthenticated,
    hasUnsavedChanges,
    isInitialized,
    userInfo,
    initializeAuth,
    login,
    logout,
  }
})
