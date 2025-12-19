<template>
  <!-- Layout dinámico basado en meta.hideLayout -->
  <template v-if="route.meta?.hideLayout">
    <router-view />
  </template>
  <template v-else>
    <MainLayout>
      <router-view />
    </MainLayout>
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import MainLayout from '@/shared/components/layout/MainLayout.vue' // ¡RUTA CORRECTA!

const route = useRoute()
</script>

<style>
/* Estilos globales mínimos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
}

/* Estilos para transiciones de router */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
