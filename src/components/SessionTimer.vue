<template>
  <div class="session-timer">
    <div class="timer-header">
      <span class="timer-icon">⏰</span>
      <span class="timer-label">Tiempo restante:</span>
    </div>
    <div class="timer-display">
      {{ formattedTime }}
    </div>
    <div class="timer-progress">
      <div
        class="timer-progress-bar"
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
const timeLeft = ref(30 * 60) // 30 minutos en segundos

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const progressPercentage = computed(() => {
  return (timeLeft.value / (30 * 60)) * 100
})

let interval: number

onMounted(() => {
  interval = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      sessionStore.logout()
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.session-timer {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
}

.timer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.timer-icon {
  font-size: 1.25rem;
}

.timer-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.timer-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.timer-progress {
  height: 4px;
  background-color: var(--border-light);
  border-radius: 2px;
  overflow: hidden;
}

.timer-progress-bar {
  height: 100%;
  background-color: var(--primary-color);
  transition: width 1s linear;
}
</style>
