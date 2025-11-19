<template>
  <div class="dashboard">
    <h1>Dashboard de Inventario</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Equipos</h3>
        <p class="stat-number">{{ stats.totalEquipos }}</p>
      </div>

      <div class="stat-card">
        <h3>Equipos Activos</h3>
        <p class="stat-number">{{ stats.equiposActivos }}</p>
      </div>

      <div class="stat-card">
        <h3>Equipos Archivados</h3>
        <p class="stat-number">{{ stats.equiposArchivados }}</p>
      </div>

      <div class="stat-card">
        <h3>Tipos de Equipo</h3>
        <p class="stat-number">{{ stats.totalTipos }}</p>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Actividad Reciente</h3>
      <ul>
        <li v-for="activity in recentActivities" :key="activity.id">
          {{ activity.description }} - {{ activity.timestamp }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { equiposService } from '@/services/equiposService'

const stats = ref({
  totalEquipos: 0,
  equiposActivos: 0,
  equiposArchivados: 0,
  totalTipos: 0,
})

const recentActivities = ref([])

onMounted(async () => {
  await loadDashboardData()
})

async function loadDashboardData() {
  try {
    const dashboardData = await equiposService.getDashboardStats()
    stats.value = dashboardData.stats
    recentActivities.value = dashboardData.recentActivities
  } catch (error) {
    console.error('Error cargando dashboard:', error)
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
}

.recent-activity {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
