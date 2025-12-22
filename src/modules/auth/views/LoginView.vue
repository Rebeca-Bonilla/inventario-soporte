<!-- src/modules/auth/views/LoginView.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue' // ← Añade computed
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/authService'

const router = useRouter()
const authService = new AuthService()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

// Agrega esta línea para detectar modo desarrollo
const isDevMode = import.meta.env.DEV // ← Aquí SÍ se puede usar

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  console.log('=== INICIANDO LOGIN ===')

  try {
    // Validar campos
    if (!username.value.trim() || !password.value.trim()) {
      throw new Error('Por favor completa todos los campos')
    }

    const credentials = {
      username: username.value.trim(),
      password: password.value.trim(),
    }

    console.log('📤 Credenciales a enviar:', credentials)

    // 1. Llamar al servicio de login
    const response = await authService.login(credentials)
    console.log('✅ Respuesta recibida:', response)

    // 2. Verificar que se guardó
    const token = localStorage.getItem('token')
    const user = authService.getCurrentUser()

    console.log('🔍 Token en localStorage:', token ? '✅ Sí' : '❌ No')
    console.log('🔍 Usuario en localStorage:', user)

    if (!token || !user) {
      throw new Error('No se pudo guardar la sesión')
    }

    console.log('🔄 Redirigiendo a dashboard...')

    // 3. Redirigir
    router.push('/dashboard')
  } catch (err: any) {
    console.error('❌ Error completo:', err)
    error.value = err.message || 'Error desconocido'
    alert('Error: ' + error.value)
  } finally {
    loading.value = false
  }
}

// Para desarrollo: autocompletar credenciales
const autoFill = (type: 'admin' | 'usuario') => {
  if (type === 'admin') {
    username.value = 'admin'
    password.value = 'admin123'
  } else {
    username.value = 'usuario'
    password.value = 'usuario123'
  }
  console.log(`Autocompletado: ${type}`)
}
</script>

<template>
  <div class="login-container">
    <div class="logo">*LOGO*</div>

    <!-- Para desarrollo: botones de autocompletar -->
    <!-- Cambia v-if="import.meta.env.DEV" por v-if="isDevMode" -->
    <div v-if="isDevMode" class="dev-tools">
      <button @click="autoFill('admin')" class="btn-dev">Admin</button>
      <button @click="autoFill('usuario')" class="btn-dev">Usuario</button>
    </div>

    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label>Usuario:</label>
        <input
          v-model="username"
          type="text"
          required
          placeholder="admin o usuario"
          :disabled="loading"
        />
      </div>

      <div class="input-group">
        <label>Contraseña:</label>
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            placeholder="admin123 o usuario123"
            :disabled="loading"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="toggle-password"
            :disabled="loading"
          >
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>

      <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>

      <button type="submit" :disabled="loading" class="login-button">
        {{ loading ? 'Verificando...' : 'Iniciar sesión' }}
      </button>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.dev-tools {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.btn-dev {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-dev:hover {
  background: #2980b9;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.forgot-password {
  display: block;
  text-align: right;
  margin-bottom: 1.5rem;
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.login-button:hover:not(:disabled) {
  background: #34495e;
}

.login-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #ffeaea;
  border: 1px solid #ffcccc;
  border-radius: 4px;
  color: #e74c3c;
  font-size: 0.9rem;
}
</style>
