<!-- src/App.vue -->
<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const router = useRouter()

onMounted(() => {
  // Inicializar la sesión y redirigir si no está autenticado
  sessionStore.initializeAuth()

  if (!sessionStore.isAuthenticated) {
    console.log('🔐 No autenticado, redirigiendo a login...')
    router.push('/login')
  } else {
    console.log('✅ Usuario autenticado:', sessionStore.userInfo())
  }
})
</script>

<style>
@import '@/styles/global.css';
</style>
