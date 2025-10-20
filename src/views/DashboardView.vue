<template>
  <AppLayout>
    <div class="dashboard-wireframe">
      <!-- Sección izquierda -->
      <div class="seccion-equipos">
        <div class="titulo-seccion">Equipos de cómputo</div>
        <table class="tabla-wireframe">
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipo</th>
              <th>Usuario</th>
              <th>N/S</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 3" :key="i">
              <td>{{ i }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="lista-categorias">
          <div>- Monitores</div>
          <div>- Teclados</div>
          <div>- Teléfonos</div>
        </div>
      </div>

      <!-- Sección derecha -->
      <div class="seccion-derecha">
        <div class="alerta-antivirus">Próximos antivirus por expirar:</div>
        <div class="resumen-wireframe">
          <div class="linea-resumen">
            <span>Resumen</span>
            <span>Próximos meses</span>
          </div>
          <div class="linea-usuario">
            <span>Usuario</span>
            <span>Cargo</span>
          </div>
        </div>
        <div class="tabla-cambios">
          <table class="tabla-wireframe compacta">
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
              <tr v-for="i in 12" :key="i">
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
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'

export default defineComponent({
  name: 'DashboardView',
  components: {
    AppLayout,
  },
})
</script>

<style scoped src="../styles/dashboard.css"></style>
