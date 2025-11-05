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
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-body {
  display: flex;
  flex: 1;
  height: calc(100vh - 70px);
}

.main-content {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
  overflow-y: auto;
}
</style>
