<!-- src/components/SessionTimer.vue -->
<template>
  <div class="session-timer" v-if="sessionStore.isAuthenticated">
    <div class="timer-display">
      <span class="timer-label">Tiempo:</span>
      <span class="timer-value">{{ sessionStore.formattedRemainingTime }}</span>
    </div>
    <div class="timer-limit">
      <span class="limit-label">Límite:</span>
      <span class="limit-value">30:00</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
</script>

<style scoped>
.session-timer {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--color-light-gray);
  border-radius: 8px;
  border: 1px solid var(--color-secondary);
}

.timer-display,
.timer-limit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.timer-label,
.limit-label {
  font-size: 0.75rem;
  color: var(--color-dark-text);
  opacity: 0.7;
}

.timer-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-success);
}

.limit-value {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-dark-text);
}
</style>
