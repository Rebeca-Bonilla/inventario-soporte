<template>
  <header class="app-header">
    <div class="header-left">
      <h1 class="logo" @click="goHome">🏢 Sistema Equipos</h1>
    </div>

    <nav class="header-nav">
      <router-link to="/registro" class="nav-item">➕ Registro</router-link>
      <router-link to="/consulta" class="nav-item">🔍 Consulta</router-link>
      <router-link to="/archivados" class="nav-item">📁 Archivados</router-link>
      <router-link to="/importacion" class="nav-item">📥 Importación</router-link>
      <router-link to="/reportes" class="nav-item">📈 Reportes</router-link>
      <router-link to="/historial" class="nav-item">🕒 Historial</router-link>
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
@import '@/styles/colors.css';

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e40af;
  color: white;
  padding: 0 20px;
  height: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-left .logo {
  margin: 0;
  font-size: 1.4em;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.3s;
}

.header-left .logo:hover {
  opacity: 0.8;
}

.header-nav {
  display: flex;
  gap: 5px;
  flex: 1;
  justify-content: center;
  margin: 0 20px;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 0.9em;
  white-space: nowrap;
}

.nav-item:hover {
  background: #3b82f6;
  transform: translateY(-2px);
}

.nav-item.router-link-active {
  background: #60a5fa;
  color: white;
  font-weight: bold;
}
</style>
