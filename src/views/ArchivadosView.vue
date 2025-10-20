<template>
  <AppLayout>
    <div class="archivados-wireframe">
      <div class="titulo-pagina">ARCHIVADOS</div>

      <div class="tabla-archivados-container">
        <table class="tabla-wireframe">
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipo</th>
              <th>Usuario</th>
              <th>N/S</th>
              <th>Fecha Archivado</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 10" :key="i">
              <td>{{ i }}</td>
              <td></td>
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
  name: 'ArchivadosView',
  components: {
    AppLayout,
  },
})
</script>

<style scoped src="../styles/archivados.css"></style>
