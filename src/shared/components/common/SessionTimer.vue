<template>
  <div class="session-timer">
    <span>Tiempo restante: {{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { timerService } from '@/services/timerService';

const timeLeft = ref(30 * 60); // 30 minutos en segundos
const formattedTime = ref('30:00');

let interval: number;

onMounted(() => {
  timerService.resetTimer();

  interval = setInterval(() => {
    timeLeft.value = timerService.getTimeLeft();

    if (timeLeft.value <= 0) {
      handleTimeout();
      return;
    }

    // Formatear tiempo
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    formattedTime.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  }, 1000);

  // Resetear timer en eventos de usuario
  ['click', 'keypress', 'mousemove'].forEach(event => {
    document.addEventListener(event, timerService.resetTimer);
  });
});

onUnmounted(() => {
  clearInterval(interval);
  ['click', 'keypress', 'mousemove'].forEach(event => {
    document.removeEventListener(event, timerService.resetTimer);
  });
});

function handleTimeout() {
  clearInterval(interval);
  timerService.logout();
}
</script>

<style scoped>
.session-timer {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  font-weight: bold;
}
</style>
