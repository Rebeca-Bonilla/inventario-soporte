<template>
  <AppLayout>
    <div class="dashboard-content">
      <!-- Sección izquierda: Tabla de equipos -->
      <div class="left-section">
        <h3>Equipos de cómputo</h3>
        <table class="equipos-table">
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
            <tr v-for="equipo in equipos" :key="equipo.id">
              <td>{{ equipo.id }}</td>
              <td>{{ equipo.nombre }}</td>
              <td>{{ equipo.usuario }}</td>
              <td>{{ equipo.ns }}</td>
              <td>{{ equipo.fecha }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Categorías -->
        <div class="categorias">
          <div class="categoria">- Monitores</div>
          <div class="categoria">- Teclados</div>
          <div class="categoria">- Teléfonos</div>
        </div>
      </div>

      <!-- Sección derecha: Resumen y cambios -->
      <div class="right-section">
        <!-- Alertas de antivirus -->
        <div class="antivirus-alert">
          <h4>Próximos antivirus por expirar:</h4>
        </div>

        <!-- Resumen -->
        <div class="resumen-section">
          <div class="resumen-header">
            <span>Resumen</span>
            <span>Próximos meses</span>
          </div>
        </div>

        <!-- Tabla de cambios recientes -->
        <div class="cambios-recientes">
          <table class="cambios-table">
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
              <tr v-for="cambio in cambiosRecientes" :key="cambio.id">
                <td>{{ cambio.id }}</td>
                <td>{{ cambio.cambio }}</td>
                <td>{{ cambio.usuario }}</td>
                <td>{{ cambio.fecha }}</td>
                <td>{{ cambio.hora }}</td>
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
  data() {
    return {
      equipos: [
        { id: 1, nombre: 'Laptop Dell', usuario: 'Juan Pérez', ns: 'SN12345', fecha: '25-02-26' },
        { id: 2, nombre: 'PC HP', usuario: 'María García', ns: 'SN67890', fecha: '24-02-26' },
        {
          id: 3,
          nombre: 'Monitor Samsung',
          usuario: 'Carlos López',
          ns: 'SN11223',
          fecha: '23-02-26',
        },
      ],
      cambiosRecientes: [
        {
          id: 1,
          cambio: 'Ingreso de equipo nuevo',
          usuario: 'Fulano_Perez',
          fecha: '25-02-26',
          hora: '13:03:23',
        },
        {
          id: 2,
          cambio: 'Archivamiento',
          usuario: 'Mengano_Gutierrez',
          fecha: '25-02-26',
          hora: '13:13:21',
        },
        { id: 3, cambio: '-', usuario: '-', fecha: 'D-M-A', hora: '00:00:00' },
      ],
    }
  },
})
</script>

<style scoped>
/* Los estilos están en dashboard.css */
</style>
