<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

onMounted(() => {
  console.log('🚀 App montada - Estado inicial:', {
    isAuthenticated: sessionStore.isAuthenticated,
    user: sessionStore.user,
  })
})
</script>
