// src/services/authService.ts
import type { LoginCredentials, User } from '@/types/auth'

// Datos de usuarios de ejemplo (en producción esto vendría de una API)
const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'Administrador' },
  { username: 'usuario', password: 'user123', role: 'Usuario' },
]

export const authService = {
  async login(credentials: LoginCredentials): Promise<User | null> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find(
      (u) => u.username === credentials.username && u.password === credentials.password,
    )

    if (user) {
      return {
        username: user.username,
        role: user.role,
        loginTime: new Date().toLocaleTimeString(),
      }
    }

    return null
  },

  async logout(): Promise<void> {
    // Limpiar cualquier dato de sesión
    await new Promise((resolve) => setTimeout(resolve, 500))
  },
}
