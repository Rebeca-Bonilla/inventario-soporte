<template>
  <div class="login-container">
    <!-- Fondo tipo lámpara de lava -->
    <div class="lava-lamp-background" id="lavaLamp">
      <div
        class="lava-blob"
        v-for="blob in lavaBlobs"
        :key="blob.id"
        :style="blobStyle(blob)"
      ></div>
    </div>

    <div class="login-card tech-border tech-shadow">
      <div class="logo-section">
        <h1>LOG IN</h1>
      </div>

      <!-- Mostrar error general -->
      <div v-if="errors.general" class="error-message tech-border">
        {{ errors.general }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label>Usuario:</label>
          <input
            type="text"
            v-model="credentials.username"
            :class="{ 'input-error': errors.username }"
            placeholder="Ingrese su usuario"
            @input="clearError('username')"
          />
          <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
        </div>

        <div class="input-group">
          <label>Contraseña:</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="credentials.password"
              :class="{ 'input-error': errors.password }"
              placeholder="***********"
              @input="clearError('password')"
            />
            <button type="button" @click="showPassword = !showPassword" class="password-toggle">
              {{ showPassword ? 'Ocultar' : 'Visualizar' }} contraseña
            </button>
          </div>
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>

        <div class="login-actions">
          <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="isLoading">Iniciando sesión...</span>
            <span v-else>Iniciar sesión</span>
          </button>
        </div>
      </form>

      <!-- Credenciales de ejemplo para testing -->
      <div class="test-credentials tech-border">
        <h4>Credenciales de prueba:</h4>
        <p><strong>Admin:</strong> admin / admin123</p>
        <p><strong>Usuario:</strong> usuario / user123</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()

const credentials = reactive({
  username: '',
  password: '',
})

const errors = reactive<Record<string, string>>({})
const showPassword = ref(false)
const isLoading = ref(false)

// Configuración de la lámpara de lava
const lavaBlobs = ref([
  { id: 1, size: 120, x: 20, y: 80, color: '#ff6b6b', duration: 25 },
  { id: 2, size: 90, x: 70, y: 30, color: '#4ecdc4', duration: 30 },
  { id: 3, size: 150, x: 40, y: 60, color: '#45b7d1', duration: 35 },
  { id: 4, size: 80, x: 80, y: 70, color: '#96ceb4', duration: 28 },
  { id: 5, size: 110, x: 30, y: 40, color: '#feca57', duration: 32 },
  { id: 6, size: 100, x: 60, y: 20, color: '#ff9ff3', duration: 27 },
])

// Computed para los estilos de cada blob
const blobStyle = computed(() => (blob: any) => ({
  width: `${blob.size}px`,
  height: `${blob.size}px`,
  left: `${blob.x}%`,
  top: `${blob.y}%`,
  background: `radial-gradient(circle at 30% 30%, ${blob.color}, ${darkenColor(blob.color, 0.3)})`,
  animationDuration: `${blob.duration}s`,
  filter: `blur(${blob.size / 15}px)`,
}))

// Función para oscurecer colores (gradiente)
const darkenColor = (color: string, factor: number) => {
  // Simplificado - en realidad necesitarías una librería de colores
  return color // Para el ejemplo
}

onMounted(() => {
  // La animación se maneja completamente con CSS
})

const clearError = (field: string) => {
  if (errors[field]) {
    errors[field] = ''
  }
  if (errors.general) {
    errors.general = ''
  }
}

const validateForm = (): boolean => {
  let isValid = true
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
  } else if (credentials.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errors.general = ''

  try {
    await sessionStore.login(credentials)
    router.push('/dashboard')
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
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #0c0c0c, #1a1a2e, #16213e);
}

/* Fondo tipo lámpara de lava */
.lava-lamp-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #0c0c0c, #1a1a2e, #16213e);
  overflow: hidden;
  z-index: 0;
}

.lava-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.7;
  animation: lavaFloat ease-in-out infinite;
  mix-blend-mode: screen;
}

@keyframes lavaFloat {
  0%,
  100% {
    transform: translateY(0px) scale(1) rotate(0deg);
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  25% {
    transform: translateY(-30px) scale(1.1) rotate(90deg);
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
  50% {
    transform: translateY(-60px) scale(0.9) rotate(180deg);
    border-radius: 70% 30% 50% 50% / 30% 70% 30% 70%;
  }
  75% {
    transform: translateY(-30px) scale(1.05) rotate(270deg);
    border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
  }
}

/* Efecto de respiración para el fondo */
.lava-lamp-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.1), transparent 50%);
  animation: breathe 8s ease-in-out infinite;
}

@keyframes breathe {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.logo-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo-section h1 {
  color: var(--color-dark-text);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-message {
  background-color: var(--color-critical);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  border: none;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-dark-text);
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4ecdc4;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.2);
}

.input-error {
  border-color: var(--color-critical) !important;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #45b7d1;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
}

.password-toggle:hover {
  color: #4ecdc4;
}

.error-text {
  color: var(--color-critical);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
  font-weight: 500;
}

.login-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.forgot-link {
  color: #45b7d1;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.forgot-link:hover {
  color: #4ecdc4;
  text-decoration: underline;
}

.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.btn-primary:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.test-credentials {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(78, 205, 196, 0.1);
  border-radius: 8px;
  font-size: 0.8rem;
  border: 1px solid rgba(78, 205, 196, 0.2);
}

.test-credentials h4 {
  margin-bottom: 0.5rem;
  color: var(--color-dark-text);
}

.test-credentials p {
  margin: 0.25rem 0;
  color: var(--color-dark-text);
}
</style>
