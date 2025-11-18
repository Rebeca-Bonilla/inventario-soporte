<template>
  <div
    class="main-layout"
    :class="{ 'dark-mode': themeStore.isDarkMode, 'light-mode': !themeStore.isDarkMode }"
  >
    <AppHeader />
    <AppSidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const themeStore = useThemeStore()
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  transition: all 0.3s ease;
}

.main-content {
  margin-left: 300px;
  min-height: calc(100vh - 80px);
  background: var(--bg-primary);
  color: var(--text-primary);
}
</style>
