<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard-page">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>HOME</h1>
    </div>

    <!-- Contenido principal -->
    <div class="dashboard-content">
      <!-- Resumen -->
      <div class="summary-section">
        <h2>Resumen</h2>
        <div class="summary-table">
          <div class="summary-row" v-for="item in summaryItems" :key="item.name">
            <span class="summary-label">{{ item.name }}</span>
            <span class="summary-value">{{ item.count }}</span>
          </div>
        </div>
      </div>

      <!-- Cambios recientes -->
      <div class="changes-section">
        <h2>Cambios recientes</h2>
        <div class="changes-table-container">
          <table class="changes-table">
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
                <td>-</td>
                <td>-</td>
                <td>D-M-A</td>
                <td>00:00:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Antivirus -->
      <div class="antivirus-section">
        <div class="antivirus-header">
          <h2>Próximos antivirus por expirar:</h2>
          <div class="antivirus-periods">
            <strong>Próximos</strong>
            <strong>meses</strong>
          </div>
        </div>
        <div class="antivirus-table-container">
          <table class="antivirus-table">
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
              <tr v-for="i in 4" :key="i">
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Datos del resumen
const summaryItems = ref([
  { name: 'Equipos de cómputo', count: '-' },
  { name: 'Monitores', count: '-' },
  { name: 'Teclados', count: '-' },
  { name: 'Teléfonos', count: '-' },
])
</script>

<style scoped>
@import '@/styles/dashboard.css';

.dashboard-page {
  height: 100%;
}

.dashboard-header h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.dashboard-content {
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  gap: 20px;
  height: calc(100% - 60px);
}
</style>
