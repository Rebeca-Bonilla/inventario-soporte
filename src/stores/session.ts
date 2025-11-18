import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  username: string
  role: string
}

export const useSessionStore = defineStore('session', () => {
  const isAuthenticated = ref(true)
  const user = ref<User>({ username: 'admin', role: 'Administrador' })
  const lastActivity = ref(Date.now())

  const login = (username: string, password: string) => {
    // Lógica de login
    isAuthenticated.value = true
    user.value = { username, role: 'admin' }
    lastActivity.value = Date.now()
    return true
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = { username: '', role: '' }
    lastActivity.value = 0
  }

  const updateActivity = () => {
    lastActivity.value = Date.now()
  }

  return {
    isAuthenticated,
    user,
    lastActivity,
    login,
    logout,
    updateActivity,
  }
})
