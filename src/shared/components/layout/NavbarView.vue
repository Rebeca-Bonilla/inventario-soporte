<!-- src/components/layout/NavbarView.vue -->
<template>
  <nav class="navbar" :style="{ backgroundColor: 'var(--color-primary)' }">
    <div class="navbar-header">
      <div class="user-info">
        <div class="user-avatar"></div>
        <div class="user-details">
          <span class="username">{{ user.username }}</span>
          <span class="user-role">{{ user.role }}</span>
        </div>
      </div>

      <div class="session-timer">
        <div class="timer-display">
          <span>Tiempo: {{ currentTime }}</span>
          <span>Límite: 30:00</span>
        </div>
      </div>
    </div>

    <ul class="nav-menu">
      <li
        v-for="item in menuItems"
        :key="item.key"
        :class="{ active: isActive(item.route) }"
        @click="navigateTo(item.route)"
      >
        {{ item.label }}
      </li>
    </ul>

    <div class="navbar-actions">
      <button @click="goHome" class="btn-secondary">Home</button>
      <button @click="goBack" class="btn-secondary">Atrás</button>
      <button @click="$emit('logout')" class="btn-danger">Cerrar sesión</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { UserBasicInfo } from '@/core/types/auth'

interface MenuItem {
  key: string
  label: string
  route: string
}

interface Props {
  user: UserBasicInfo
  currentTime: string
  remainingTime: number
}

interface Emits {
  (e: 'navigate', route: string): void
  (e: 'logout'): void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const router = useRouter()
const route = useRoute()

const menuItems: MenuItem[] = [
  { key: 'registro', label: 'Registro', route: 'registro' },
  { key: 'consulta', label: 'Consulta', route: 'consulta' },
  { key: 'archivados', label: 'Archivados', route: 'archivados' },
  { key: 'importacion', label: 'Importación', route: 'importacion' },
  { key: 'reportes', label: 'Reportes', route: 'reportes' },
  { key: 'historial', label: 'Historial', route: 'historial' },
]

const isActive = (routeName: string) => {
  return route.name === routeName
}

const navigateTo = (routeName: string) => {
  emit('navigate', routeName)
}

const goHome = () => {
  emit('navigate', 'dashboard')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.navbar {
  width: 250px;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);
}

.navbar-header {
  margin-bottom: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-white);
  margin-right: 0.5rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  color: var(--color-dark-text);
}

.user-role {
  font-size: 0.8rem;
  color: var(--color-dark-text);
  opacity: 0.7;
}

.session-timer {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 6px;
}

.timer-display {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: var(--color-dark-text);
}

.nav-menu {
  list-style: none;
  flex-grow: 1;
}

.nav-menu li {
  padding: 0.75rem 1rem;
  margin: 0.25rem 0;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s;
  color: var(--color-dark-text);
}

.nav-menu li:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-menu li.active {
  background-color: var(--color-success);
  color: white;
}

.navbar-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
