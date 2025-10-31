<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <strong>Sistema de Inventario</strong>
      </div>
      <div class="nav-menu">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/oficina" class="nav-link">Oficina</router-link>
        <router-link to="/forma" class="nav-link">Forma</router-link>
        <router-link to="/registro" class="nav-link">Registro</router-link>
        <router-link to="/importacion" class="nav-link">Importación</router-link>
        <router-link to="/reportes" class="nav-link">Reportes</router-link>
        <router-link to="/fidencial" class="nav-link">Fidencial</router-link>
        <router-link to="/autoridades" class="nav-link">Autoridades</router-link>
      </div>
      <div class="nav-user">
        <span class="user-info">{{ session.userName }}</span>
        <button @click="handleLogout" class="logout-btn">Salir</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useSessionStore } from '../../stores/session'
import { useRouter } from 'vue-router'

const session = useSessionStore()
const router = useRouter()

const handleLogout = () => {
  session.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: var(--color-primary-mint);
  color: var(--color-text-dark);
  padding: 0.8rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-bottom: 3px solid var(--color-primary-lila);
  box-shadow: 0 2px 10px rgba(44, 62, 80, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-brand {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-text-dark);
}

.nav-menu {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.nav-link {
  color: var(--color-text-dark);
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: var(--color-primary-lila);
  color: var(--color-white);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: var(--color-accent-green);
  color: var(--color-white);
  box-shadow: 0 2px 8px rgba(93, 138, 127, 0.3);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--color-white);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  background: var(--color-accent-raspberry);
  color: var(--color-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #794370;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(138, 79, 125, 0.3);
}
</style>
