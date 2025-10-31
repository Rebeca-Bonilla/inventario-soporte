<template>
  <div class="app-layout">
    <NavbarView v-if="session.isAuthenticated" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../../stores/session'
import NavbarView from './NavbarView.vue'

const session = useSessionStore()
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: var(--color-white);
}
</style>
