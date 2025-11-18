export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  name: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  expiresIn: number
}
