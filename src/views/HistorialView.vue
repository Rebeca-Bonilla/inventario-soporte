<template>
  <AppLayout>
    <div class="historial-wireframe">
      <div class="titulo-pagina">HISTORIAL</div>

      <div class="tabla-historial-container">
        <table class="tabla-wireframe">
          <thead>
            <tr>
              <th>#</th>
              <th>Cambio realizado</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 15" :key="i">
              <td>{{ i }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'

export default defineComponent({
  name: 'HistorialView',
  components: {
    AppLayout,
  },
})
</script>

<style scoped src="../styles/historial.css"></style>
