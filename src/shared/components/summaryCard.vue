<!-- src/modules/dashboard/components/SummaryCard.vue -->
<template>
  <div class="summary-card" :class="variant">
    <div class="card-content">
      <div class="card-icon">{{ icon }}</div>
      <div class="card-text">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-value">{{ formattedValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number
  icon: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const formattedValue = computed(() => {
  return props.value.toLocaleString('es-ES')
})
</script>

<style scoped>
.summary-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: 8px;
}

.card-text {
  flex: 1;
}

.card-title {
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* Variantes de color */
.summary-card.primary {
  border-left: 4px solid #3498db;
}

.summary-card.secondary {
  border-left: 4px solid #95a5a6;
}

.summary-card.success {
  border-left: 4px solid #2ecc71;
}

.summary-card.warning {
  border-left: 4px solid #f39c12;
}

.summary-card.danger {
  border-left: 4px solid #e74c3c;
}
</style>
