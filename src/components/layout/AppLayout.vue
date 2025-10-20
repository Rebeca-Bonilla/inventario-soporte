<template>
  <div class="dashboard-container" @mousemove="resetInactivity" @keypress="resetInactivity">
    <div class="dashboard-layout">
      <!-- Sidebar (ahora para usuario y tiempo) -->
      <div class="sidebar">
        <div class="logo">*LOGO*</div>

        <!-- Información del usuario -->
        <div class="user-info">
          <span>Usuario: {{ sessionStore.usuario }}</span>
          <span>Cargo: Administrador</span>
        </div>

        <!-- Temporizador -->
        <div class="timer">
          <span>Tiempo: {{ sessionStore.tiempo }}</span>
          <span>Límite: {{ sessionStore.limite }}</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Header (ahora para menús de acción) -->
        <div class="header">
          <nav class="nav-menu">
            <router-link to="/registro">Registro</router-link>
            <router-link to="/consulta">Consulta</router-link>
            <router-link to="/importacion">Importación</router-link>
            <router-link to="/reportes">Reportes</router-link>
            <router-link to="/historial">Historial</router-link>
            <router-link to="/archivados">Archivados</router-link>
          </nav>
        </div>

        <!-- Contenido de la página -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSessionStore } from '../../stores/session'

export default defineComponent({
  name: 'AppLayout',
  setup() {
    const sessionStore = useSessionStore()

    // Iniciar sesión si hay datos en localStorage
    const usuarioGuardado = localStorage.getItem('usuario')
    const sessionStart = localStorage.getItem('sessionStart')

    if (usuarioGuardado && sessionStart && !sessionStore.usuario) {
      sessionStore.iniciarSesion(usuarioGuardado)
    }

    const resetInactivity = () => {
      sessionStore.resetearInactividad()
    }

    return {
      sessionStore,
      resetInactivity,
    }
  },
})
</script>

<style scoped src="../../styles/dashboard.css"></style>
