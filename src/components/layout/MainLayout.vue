<template>
  <div class="main-layout">
    <!-- Header horizontal -->
    <AppHeader />

    <div class="layout-body">
      <!-- Sidebar lateral -->
      <AppSidebar />

      <!-- Contenido principal -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<style scoped>
@import '@/styles/layout.css';
</style>
