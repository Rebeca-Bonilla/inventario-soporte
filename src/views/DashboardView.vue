<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
    </div>

    <div class="dashboard-content">
      <!-- Resumen de equipos -->
      <div class="summary-section">
        <h2>Resumen</h2>
        <div class="summary-grid">
          <div class="summary-card">
            <h3>Equipos de cómputo</h3>
            <span class="summary-value">-</span>
          </div>
          <div class="summary-card">
            <h3>Monitores</h3>
            <span class="summary-value">-</span>
          </div>
          <div class="summary-card">
            <h3>Teclados</h3>
            <span class="summary-value">-</span>
          </div>
          <div class="summary-card">
            <h3>Teléfonos</h3>
            <span class="summary-value">-</span>
          </div>
        </div>
      </div>

      <!-- Cambios recientes -->
      <div class="recent-changes">
        <h2>Cambios recientes</h2>
        <div class="table-container">
          <table class="data-table">
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

      <!-- Próximos antivirus por expirar -->
      <div class="antivirus-section">
        <h2>Próximos antivirus por expirar:</h2>
        <div class="table-container">
          <table class="data-table">
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
// Lógica del dashboard aquí
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: var(--text-primary);
  font-size: 2rem;
  margin: 0;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.summary-section h2,
.recent-changes h2,
.antivirus-section h2 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.summary-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  text-align: center;
}

.summary-card h3 {
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.summary-value {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: bold;
}

.table-container {
  background: var(--card-bg);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.data-table th {
  background-color: var(--table-header-bg);
  font-weight: 600;
  color: var(--text-primary);
}

.data-table td {
  color: var(--text-secondary);
}

.data-table tbody tr:hover {
  background-color: var(--bg-tertiary);
}
</style>
