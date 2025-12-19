<!-- src/components/layout/SidebarView.vue -->
<template>
  <div class="sidebar">
    <!-- Logo -->
    <div class="logo" @click="goHome">*LOGO*</div>

    <!-- Información del usuario -->
    <div class="user-info">
      <span class="username">{{ user.username }}</span>
      <span class="user-role">{{ user.role }}</span>
    </div>

    <!-- Timer -->
    <div class="timer">
      <span>Tiempo: {{ currentTime }}</span>
      <span>Límite: {{ remainingTime }}</span>
    </div>

    <!-- Menú de navegación -->
    <nav class="nav-menu">
      <div
        v-for="item in menuItems"
        :key="item.key"
        class="nav-btn"
        :class="{ active: currentRoute === item.route }"
        @click="navigateTo(item.route)"
      >
        {{ item.label }}
      </div>
    </nav>

    <!-- Botones de acción -->
    <div class="sidebar-buttons">
      <button class="sidebar-btn" @click="goHome">Home</button>
      <button class="sidebar-btn" @click="goBack">Atrás</button>
      <button class="sidebar-btn logout" @click="handleLogout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/modules/auth/stores/session'

const emit = defineEmits<{
  navigate: [route: string]
  logout: []
}>()

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

// Computed para el usuario actual
const user = computed(() => sessionStore.userInfo())

// Computed para la ruta actual
const currentRoute = computed(() => route.name as string)

// Computed para el tiempo
const currentTime = computed(() => sessionStore.currentTime)
const remainingTime = computed(() => sessionStore.formattedRemainingTime)

// Menú de navegación
const menuItems = [
  { key: 'registro', label: 'Registro', route: 'registro' },
  { key: 'consulta', label: 'Consulta', route: 'consulta' },
  { key: 'archivados', label: 'Archivados', route: 'archivados' },
  { key: 'importacion', label: 'Importación', route: 'importacion' },
  { key: 'reportes', label: 'Reportes', route: 'reportes' },
  { key: 'historial', label: 'Historial', route: 'historial' },
]

// Navegación - registrar actividad en cada click
const navigateTo = (route: string) => {
  sessionStore.registerActivity()
  emit('navigate', route)
}

const goHome = () => {
  sessionStore.registerActivity()
  emit('navigate', 'dashboard')
}

const goBack = () => {
  sessionStore.registerActivity()
  router.go(-1)
}

const handleLogout = () => {
  emit('logout')
}
</script>

<style scoped>
@import '@/shared/styles/layout.css';

/* Estilos específicos del componente que no están en layout.css */
.nav-btn.active {
  background: #0056b3;
}

.sidebar-btn.logout {
  background: #dc3545;
}

.sidebar-btn.logout:hover {
  background: #c82333;
}
</style>
