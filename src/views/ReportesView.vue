<template>
  <AppLayout>
    <div class="reportes-wireframe">
      <div class="titulo-pagina">REPORTES</div>

      <div class="opciones-reportes">
        <button class="btn-reporte">PDF</button>
        <button class="btn-reporte">CSV</button>
        <button class="btn-reporte">XLSX</button>
      </div>

      <div class="filtros-reportes">
        <div class="filtro">
          <label>Historial de cambios hechos</label>
          <select class="input-wireframe">
            <option>Equipos de cómputo</option>
            <option>Teléfonos</option>
            <option>Monitores</option>
            <option>Cámaras</option>
            <option>Tablets</option>
            <option>Terminales</option>
            <option>Otros</option>
          </select>
        </div>

        <div class="filtro">
          <label>De</label>
          <input type="date" class="input-wireframe" />
        </div>

        <div class="filtro">
          <label>A</label>
          <input type="date" class="input-wireframe" />
        </div>

        <button class="btn-generar">Generar</button>
        <button class="btn-descargar">Descargar</button>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'

export default defineComponent({
  name: 'ReportesView',
  components: {
    AppLayout,
  },
})
</script>

<style scoped src="../styles/reportes.css"></style>
