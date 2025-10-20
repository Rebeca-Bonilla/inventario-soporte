<template>
  <div class="login-wrapper">
    <div class="logo">*LOGO*</div>
    <h1 class="page-title">LOG IN</h1>

    <div class="login-form">
      <div class="form-group">
        <label class="form-label">Usuario:</label>
        <input type="text" class="form-input" v-model="usuario" placeholder="" />
      </div>

      <div class="form-group">
        <label class="form-label">Contraseña:</label>
        <div class="password-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-input password-input"
            v-model="password"
            placeholder=""
          />
          <button type="button" class="show-password-btn" @click="togglePassword">
            Visualizar contraseña
          </button>
        </div>
      </div>

      <div class="forgot-password">
        <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
      </div>

      <button class="login-button" @click="login">Iniciar sesión</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter()

    return {
      router,
    }
  },
  data() {
    return {
      usuario: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    login() {
      if (this.usuario && this.password) {
        localStorage.setItem('usuario', this.usuario)
        localStorage.setItem('sessionStart', Date.now().toString())
        this.router.push('/dashboard')
      } else {
        alert('Por favor completa todos los campos')
      }
    },
  },
})
</script>

<style scoped src="../styles/login.css"></style>
