import axios from 'axios'

// IMPORTANTE: Debe apuntar al puerto 3000
const API_BASE_URL = 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
