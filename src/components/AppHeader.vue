<template>
  <header class="app-header">
    <div class="header-left">
      <h1 class="logo" @click="goHome">Sistema Equipos</h1>
    </div>

    <nav class="header-nav">
      <router-link to="/registro" class="nav-item">Registro</router-link>
      <router-link to="/consulta" class="nav-item">Consulta</router-link>
      <router-link to="/archivados" class="nav-item">Archivados</router-link>
      <router-link to="/importacion" class="nav-item">Importación</router-link>
      <router-link to="/reportes" class="nav-item">Reportes</router-link>
      <router-link to="/historial" class="nav-item">Historial</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e40af;
  color: white;
  padding: 0 40px;
  height: 90px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-left .logo {
  margin: 0;
  font-size: 1.8em; /* Tamaño normal pero visible */
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
}

.header-left .logo:hover {
  opacity: 0.9;
  transform: scale(1.03);
}

.header-nav {
  display: flex;
  gap: 40px; /* ESPACIADO MANTENIDO */
  flex: 1;
  justify-content: center;
  margin: 0 40px;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 15px 25px; /* PADDIG MANTENIDO para espaciado */
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1.1em; /* Tamaño normal */
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.5px;
  min-width: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item:hover {
  background: #3b82f6;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.nav-item.router-link-active {
  background: #60a5fa;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

/* Efecto sutil para item activo */
.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 30%;
  width: 40%;
  height: 2px;
  background: white;
  border-radius: 1px;
}
</style>
