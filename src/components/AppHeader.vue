<template>
  <header class="app-header">
    <!-- Parte superior con logo y usuario -->
    <div class="header-top">
      <div class="logo-section">
        <h1 class="app-title">Sistema de Inventario</h1>
      </div>

      <div class="header-actions">
        <!-- Botón de tema oscuro/claro -->
        <button @click="toggleTheme" class="theme-toggle">
          <span v-if="themeStore.isDark">🌙</span>
          <span v-else>☀️</span>
        </button>

        <!-- Información del usuario -->
        <div class="user-info" v-if="sessionStore.user">
          <span class="user-name">{{ sessionStore.user.name }}</span>
          <span class="user-role">{{ sessionStore.user.role }}</span>
        </div>
      </div>
    </div>

    <!-- Menú de navegación horizontal -->
    <nav class="main-nav">
      <div class="nav-container">
        <router-link to="/registro" class="nav-item"> Registro </router-link>
        <router-link to="/consulta" class="nav-item"> Consulta </router-link>
        <router-link v-if="sessionStore.isAdmin" to="/archivados" class="nav-item">
          Archivados
        </router-link>
        <router-link to="/importacion" class="nav-item"> Importación </router-link>
        <router-link to="/reportes" class="nav-item"> Reportes </router-link>
        <router-link to="/historial" class="nav-item"> Historial </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { useThemeStore } from '@/stores/theme'

const sessionStore = useSessionStore()
const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.app-header {
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-light);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-title {
  color: var(--text-primary);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: var(--button-secondary-bg);
  color: var(--button-secondary-text);
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.2s;
  font-size: 1.2rem;
}

.theme-toggle:hover {
  background: var(--button-secondary-hover);
  transform: scale(1.05);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  color: var(--text-primary);
  font-weight: 500;
}

.user-role {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: capitalize;
}

/* Menú de navegación horizontal */
.main-nav {
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-item {
  padding: 1rem 2rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-item:hover {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

.nav-item.router-link-active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background-color: var(--bg-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-container {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .nav-item {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
