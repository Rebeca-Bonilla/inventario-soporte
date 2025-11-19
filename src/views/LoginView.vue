<template>
  <div class="login-container">
    <!-- Fondo con efecto lava -->
    <div class="lava-background">
      <div
        v-for="blob in lavaBlobs"
        :key="blob.id"
        class="lava-blob"
        :style="blobStyle(blob)"
      ></div>
    </div>

    <!-- Formulario de login -->
    <div class="login-form">
      <div class="form-header">
        <h1>Sistema de Inventario</h1>
        <p>Ingresa a tu cuenta</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            required
            @input="clearError('username')"
            :class="{ error: errors.username }"
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="password-input">
            <input
              id="password"
              v-model="credentials.password"
              :type="showPassword ? 'text' : 'password'"
              required
              @input="clearError('password')"
              :class="{ error: errors.password }"
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div v-if="errors.general" class="error-general">
          {{ errors.general }}
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading">Cargando...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()

// Estado del formulario
const credentials = reactive({
  username: '',
  password: '',
})

const errors = reactive<Record<string, string>>({})
const showPassword = ref(false)
const isLoading = ref(false)

// Configuración de la Lámpara de Lava
interface LavaBlob {
  id: number
  size: number
  x: number
  y: number
  color: string
  duration: number
}

const lavaBlobs = ref<LavaBlob[]>([
  { id: 1, size: 120, x: 20, y: 80, color: '#ff6b6b', duration: 25 },
  { id: 2, size: 90, x: 70, y: 30, color: '#4c4cac', duration: 30 },
  { id: 3, size: 100, x: 80, y: 60, color: '#4b7dc1', duration: 35 },
  { id: 4, size: 80, x: 80, y: 70, color: '#9cc6b4', duration: 28 },
  { id: 5, size: 110, x: 30, y: 40, color: '#feca57', duration: 32 },
  { id: 6, size: 100, x: 60, y: 20, color: '#ff9ff3', duration: 27 },
])

// Computed para los estilos de cada blob
const blobStyle = computed(() => (blob: LavaBlob) => ({
  width: `${blob.size}px`,
  height: `${blob.size}px`,
  left: `${blob.x}%`,
  top: `${blob.y}%`,
  backgroundColor: blob.color,
  animationDuration: `${blob.duration}s`,
}))

// Limpiar errores
const clearError = (field: string) => {
  if (errors[field]) {
    errors[field] = ''
  }
  if (errors.general) {
    errors.general = ''
  }
}

// Validar formulario
const validateForm = (): boolean => {
  let isValid = true

  // Limpiar errores previos
  errors.username = ''
  errors.password = ''
  errors.general = ''

  if (!credentials.username.trim()) {
    errors.username = 'Usuario requerido'
    isValid = false
  }

  if (!credentials.password) {
    errors.password = 'Contraseña requerida'
    isValid = false
  }

  return isValid
}

// Manejo del login
const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errors.general = ''

  try {
    const result = await sessionStore.login(credentials)

    if (result.success) {
      router.push('/dashboard')
    } else {
      errors.general = result.error || 'Error al iniciar sesión'
    }
  } catch (error) {
    if (error instanceof Error) {
      errors.general = error.message
    } else {
      errors.general = 'Error de conexión. Intente nuevamente.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.lava-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  z-index: -1;
}

.lava-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.7;
  animation: float infinite ease-in-out;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
}

.login-form {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #666;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

input.error {
  border-color: #e74c3c;
}

.password-input {
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
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.error-general {
  background: #fee;
  color: #e74c3c;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #f5c6cb;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
