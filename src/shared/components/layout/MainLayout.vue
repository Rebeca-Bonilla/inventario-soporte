<!-- src/shared/components/layout/MainLayout.vue -->
<template>
  <div class="main-layout">
    <!-- Sidebar (izquierda) -->
    <AppSidebar />

    <!-- Contenido principal (derecha) -->
    <div class="main-content">
      <!-- Header superior -->
      <AppHeader />

      <!-- Contenido de la página -->
      <main class="page-content">
        <slot />
      </main>

      <!-- Timer de sesión flotante -->
      <SessionTimer v-if="showSessionTimer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import SessionTimer from '../common/SessionTimer.vue'

const showSessionTimer = ref(true)

onMounted(() => {
  console.log('MainLayout montado')
})
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Para evitar desbordamiento */
}

.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background-color: var(--bg-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }

  .main-content {
    width: 100%;
  }
}
</style>
