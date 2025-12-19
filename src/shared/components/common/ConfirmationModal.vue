<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button @click="confirm(false)" class="btn-secondary">Cancelar</button>
        <button @click="confirm(true)" class="btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  confirmed: [value: boolean]
}>()

const confirm = (value: boolean) => {
  emit('confirmed', value)
}
</script>
