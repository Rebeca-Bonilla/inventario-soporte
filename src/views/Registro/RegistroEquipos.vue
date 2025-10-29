<template>
  <div class="registro-equipos">
    <nav class="tipo-equipo-nav">
      <button
        @click="tipoActivo = 'computadoras'"
        :class="{ active: tipoActivo === 'computadoras' }"
      >
        Computadoras
      </button>
      <button @click="tipoActivo = 'monitores'" :class="{ active: tipoActivo === 'monitores' }">
        Monitores
      </button>
      <button @click="tipoActivo = 'telefonos'" :class="{ active: tipoActivo === 'telefonos' }">
        Teléfonos
      </button>
    </nav>

    <div class="contenido-registro">
      <RegistroComputadoras v-if="tipoActivo === 'computadoras'" />
      <div v-else-if="tipoActivo === 'monitores'">
        <h2>Registro de Monitores</h2>
        <p>Formulario para monitores - Próximamente</p>
      </div>
      <div v-else>
        <h2>Registro de Teléfonos</h2>
        <p>Formulario para teléfonos - Próximamente</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RegistroComputadoras from '../Registro/RegistroComputadoras.vue'

const tipoActivo = ref('computadoras')
</script>

<style scoped>
.registro-equipos {
  padding: 20px;
}

.tipo-equipo-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tipo-equipo-nav button {
  padding: 12px 24px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
}

.tipo-equipo-nav button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.contenido-registro {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  min-height: 500px;
}
</style>
