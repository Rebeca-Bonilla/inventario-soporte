<!-- src/App.vue -->
<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

onMounted(() => {
  // Inicializar autenticación cuando la app se monta
  sessionStore.initializeAuth()
})
</script>

<style>
@import '@/styles/global.css';
</style>
