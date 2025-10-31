<!-- src/views/LoginView.vue -->
<template>
  <div class="login-container">
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
import { ref, reactive } from 'vue'
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
  background-color: var(--color-light-gray);
}

.login-card {
  background: var(--color-white);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
}

.logo-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo-section h1 {
  color: var(--color-dark-text);
  margin-bottom: 1rem;
}

.error-message {
  background-color: var(--color-critical);
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-dark-text);
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-secondary);
  border-radius: 6px;
  background-color: var(--color-white);
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: var(--color-info);
}

.input-error {
  border-color: var(--color-critical) !important;
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
  color: var(--color-info);
  cursor: pointer;
  font-size: 0.8rem;
}

.password-toggle:hover {
  color: var(--color-success);
}

.error-text {
  color: var(--color-critical);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.login-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.forgot-link {
  color: var(--color-info);
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-link:hover {
  text-decoration: underline;
}

.btn-primary:disabled {
  background-color: var(--color-secondary);
  cursor: not-allowed;
  opacity: 0.6;
}

.test-credentials {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--color-light-gray);
  border-radius: 6px;
  font-size: 0.8rem;
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
