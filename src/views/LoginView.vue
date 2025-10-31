<template>
  <div class="login-wrapper">
    <div class="logo">Sistema de Inventario</div>

    <h1 class="page-title">Ingresa a tu cuenta</h1>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="form-input"
          :class="{ error: emailError }"
          @blur="validateEmail"
          placeholder="usuario@ejemplo.com"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>

      <div class="form-group password-group">
        <label for="password" class="form-label">Contraseña</label>
        <input
          id="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          required
          class="form-input password-input"
          :class="{ error: passwordError }"
          @blur="validatePassword"
          placeholder="Ingresa tu contraseña"
        />
        <button type="button" class="show-password-btn" @click="showPassword = !showPassword">
          {{ showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña' }}
        </button>
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>

      <div class="password-strength" v-if="password">
        <div class="strength-bar" :class="strengthClass"></div>
        <span class="strength-text">{{ strengthText }}</span>
      </div>

      <button type="submit" class="login-button" :disabled="!isFormValid || session.isLoading">
        <span v-if="session.isLoading">Ingresando...</span>
        <span v-else>Ingresar</span>
      </button>

      <div v-if="session.error" class="error-message server-error">
        {{ session.error }}
      </div>
    </form>

    <div class="demo-credentials">
      <p><strong>Demo:</strong> admin@inventario.com</p>
      <p><strong>Contraseña:</strong> Admin123!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'
import { authService } from '../services/authService'
// CAMBIA ESTA LÍNEA:
import '../styles/login.css'

const router = useRouter()
const session = useSessionStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')

const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    !emailError.value &&
    !passwordError.value &&
    authService.validateEmail(email.value)
  )
})

const strengthClass = computed(() => {
  const strength = authService.validatePasswordStrength(password.value)
  if (!strength.valid) return 'weak'
  return 'strong'
})

const strengthText = computed(() => {
  const strength = authService.validatePasswordStrength(password.value)
  return strength.valid ? 'Contraseña segura' : strength.message
})

const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'El correo electrónico es requerido'
  } else if (!authService.validateEmail(email.value)) {
    emailError.value = 'Formato de correo electrónico inválido'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'La contraseña es requerida'
  } else {
    const strength = authService.validatePasswordStrength(password.value)
    if (!strength.valid && password.value.length > 0) {
      passwordError.value = strength.message
    } else {
      passwordError.value = ''
    }
  }
}

const handleLogin = async () => {
  validateEmail()
  validatePassword()

  if (!isFormValid.value) return

  const result = await session.login(email.value, password.value)

  if (result.success) {
    router.push('/dashboard')
  }
}

onMounted(() => {
  if (session.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos del componente si necesitas */
</style>
