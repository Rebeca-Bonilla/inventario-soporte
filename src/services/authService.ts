/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/authService.ts
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
  cargo?: string
}

export interface AuthResponse {
  token: string
  usuario: User
  mensaje: string
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('📤 Enviando credenciales al backend...', credentials)

      const response = await api.post('/auth/login', credentials)
      const data = response.data

      console.log('✅ Respuesta del backend:', data)

      // Guardar en localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.usuario))

      console.log('💾 Token guardado:', data.token?.substring(0, 20) + '...')
      console.log('👤 Usuario guardado:', data.usuario.username)

      return data
    } catch (error: unknown) {
      // ← Cambia 'any' por 'unknown'
      console.error('❌ Error en login:', error)

      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as any
        if (err.response?.status === 401) {
          throw new Error('Usuario o contraseña incorrectos')
        }
      }

      throw new Error('Error de conexión con el servidor')
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}
