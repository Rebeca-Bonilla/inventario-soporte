<template>
  <header class="app-header">
    <div class="header-left">
      <h1 class="logo">🏢 Sistema Equipos</h1>
    </div>

    <nav class="header-nav">
      <router-link to="/dashboard" class="nav-item">📊 Dashboard</router-link>
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
// Solo el menú de navegación aquí
</script>

<style scoped>
@import '@/styles/header.css';
</style>
