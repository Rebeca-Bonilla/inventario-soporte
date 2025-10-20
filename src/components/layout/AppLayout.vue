<template>
  <div class="dashboard-container" @mousemove="resetInactivity" @keypress="resetInactivity">
    <div class="dashboard-layout">
      <div class="sidebar">
        <div class="logo" @click="goToHome">*LOGO*</div>

        <div class="user-info">
          <span>Usuario: {{ sessionStore.usuario }}</span>
          <span>Cargo: Administrador</span>
        </div>

        <div class="timer">
          <span>Tiempo: {{ sessionStore.tiempo }}</span>
          <span>Límite: {{ sessionStore.limite }}</span>
        </div>

        <div class="sidebar-buttons">
          <button class="sidebar-btn" @click="goBack">← Atrás</button>
          <button class="sidebar-btn" @click="goToHome">🏠 Home</button>
        </div>
      </div>

      <div class="main-content">
        <div class="header">
          <nav class="nav-menu">
            <button class="nav-btn">
              <router-link to="/registro">Registro</router-link>
            </button>
            <button class="nav-btn">
              <router-link to="/consulta">Consulta</router-link>
            </button>
            <button class="nav-btn">
              <router-link to="/importacion">Importación</router-link>
            </button>
            <button class="nav-btn">
              <router-link to="/reportes">Reportes</router-link>
            </button>
            <button class="nav-btn">
              <router-link to="/historial">Historial</router-link>
            </button>
            <button class="nav-btn">
              <router-link to="/archivados">Archivados</router-link>
            </button>
          </nav>
        </div>

        <div class="page-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../../stores/session'

export default defineComponent({
  name: 'AppLayout',
  setup() {
    const router = useRouter()
    const sessionStore = useSessionStore()

    const usuarioGuardado = localStorage.getItem('usuario')
    const sessionStart = localStorage.getItem('sessionStart')

    if (usuarioGuardado && sessionStart && !sessionStore.usuario) {
      sessionStore.iniciarSesion(usuarioGuardado)
    }

    const resetInactivity = () => {
      sessionStore.resetearInactividad()
    }

    const goToHome = () => {
      router.push('/dashboard')
    }

    const goBack = () => {
      router.back()
    }

    return {
      sessionStore,
      resetInactivity,
      goToHome,
      goBack,
    }
  },
})
</script>

<style scoped src="../../styles/layout.css"></style>
