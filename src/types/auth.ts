// src/types/auth.ts
export interface LoginCredentials {
  username: string
  password: string
}

export interface User {
  username: string
  role: string
  loginTime: string
}

// Tipo para la información básica del usuario (sin campos opcionales)
export interface UserBasicInfo {
  username: string
  role: string
}
