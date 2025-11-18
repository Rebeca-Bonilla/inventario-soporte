<template>
  <div class="main-layout">
    <AppSidebar />
    <div class="main-content">
      <AppHeader />
      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
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
  min-width: 0;
}

.content-area {
  flex: 1;
  padding: 2rem;
  background-color: var(--bg-secondary);
  overflow-y: auto;
}
</style>
