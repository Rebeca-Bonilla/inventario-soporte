<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo placeholder -->
      <div class="logo">[LOGO]</div>

      <h1 class="login-title">INICIAR SESIÓN</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="usuario" class="form-label">Usuario:</label>
          <input
            id="usuario"
            v-model="email"
            type="text"
            required
            class="form-input"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Contraseña:</label>
          <div class="password-input-container">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="form-input"
              placeholder="Ingresa tu contraseña"
            />
            <button type="button" class="show-password-btn" @click="showPassword = !showPassword">
              {{ showPassword ? 'Ocultar contraseña' : 'Visualizar contraseña' }}
            </button>
          </div>
        </div>

        <div class="forgot-password">
          <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" class="login-button" :disabled="session.isLoading">
          {{ session.isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>

        <div v-if="session.error" class="error-message">
          {{ session.error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'

const router = useRouter()
const session = useSessionStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return

  const result = await session.login(email.value, password.value)

  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
/* Importar el CSS externo */
@import '../styles/login.css';
</style>
