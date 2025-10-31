<template>
  <nav class="navbar">
    <div class="nav-left">
      <strong>Sistema de Inventario</strong>
    </div>
    <div class="nav-center">
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
      <router-link to="/equipos" class="nav-link">Equipos</router-link>
      <router-link to="/registro" class="nav-link">Registro</router-link>
    </div>
    <div class="nav-right">
      <span class="user-greeting">Hola, {{ session.userName }}</span>
      <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  font-family: Arial, sans-serif;
}

.nav-left {
  font-size: 1.2rem;
  color: #333;
}

.nav-center {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  font-weight: normal;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav-link.router-link-active {
  color: #0056b3;
  font-weight: bold;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  color: #333;
  font-size: 0.9rem;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: #c82333;
}
</style>
