<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">*LOGO*</div>
      <div class="user-info" v-if="user">
        <span class="user-name">{{ user.nombre_completo || user.username }}</span>
        <span class="user-role">{{ user.rol }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AuthService } from '@/services/authService'

const authService = new AuthService()
const user = computed(() => authService.getCurrentUser())
</script>

<style scoped>
.app-header {
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.user-role {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: capitalize;
}
</style>
