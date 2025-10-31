<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard">
    <!-- Header con título -->
    <div class="dashboard-header">
      <h1>HOME</h1>
    </div>

    <div class="dashboard-content">
      <!-- Sidebar con menú -->
      <div class="sidebar tech-border">
        <div class="user-info">
          <div class="user-avatar">
            <span>{{ userInitials }}</span>
          </div>
          <div class="user-details">
            <h3>{{ sessionStore.userInfo().username }}</h3>
            <p>{{ sessionStore.userInfo().role }}</p>
          </div>
        </div>

        <div class="session-timer tech-border">
          <div class="timer-display">
            <span><strong>Tiempo:</strong> {{ currentTime }}</span>
            <span><strong>Límite:</strong> 30:00</span>
          </div>
        </div>

        <nav class="sidebar-menu">
          <h4>Navegación</h4>
          <ul>
            <li
              v-for="item in menuItems"
              :key="item.key"
              :class="{ active: $route.name === item.route }"
              @click="navigateTo(item.route)"
            >
              {{ item.label }}
            </li>
          </ul>
        </nav>

        <div class="sidebar-actions">
          <button @click="goHome" class="btn-secondary">🏠 Home</button>
          <button @click="goBack" class="btn-secondary">↩️ Atrás</button>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="main-content">
        <!-- Resumen de equipos -->
        <div class="summary-section tech-border tech-shadow">
          <h2>Resumen</h2>
          <div class="summary-grid">
            <div class="summary-card" v-for="item in summaryItems" :key="item.name">
              <div class="summary-icon">{{ item.icon }}</div>
              <div class="summary-info">
                <h3>{{ item.name }}</h3>
                <span class="summary-count">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cambios recientes -->
        <div class="changes-section tech-border tech-shadow">
          <div class="section-header">
            <h2>Cambios recientes</h2>
            <button class="btn-secondary" @click="viewAllChanges">Ver todos</button>
          </div>
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
                <tr v-for="i in 10" :key="i">
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

        <!-- Antivirus por expirar -->
        <div class="antivirus-section tech-border tech-shadow">
          <div class="section-header">
            <h2>Próximos antivirus por expirar:</h2>
            <div class="antivirus-period">
              <strong>Próximos</strong>
              <strong>meses</strong>
            </div>
          </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()

// Datos del resumen
const summaryItems = ref([
  { name: 'Equipos de cómputo', count: '-', icon: '💻' },
  { name: 'Monitores', count: '-', icon: '🖥️' },
  { name: 'Teclados', count: '-', icon: '⌨️' },
  { name: 'Teléfonos', count: '-', icon: '📱' },
])

// Menú de navegación
const menuItems = ref([
  { key: 'registro', label: '📝 Registro', route: 'registro' },
  { key: 'consulta', label: '🔍 Consulta', route: 'consulta' },
  { key: 'archivados', label: '📁 Archivados', route: 'archivados' },
  { key: 'importacion', label: '📤 Importación', route: 'importacion' },
  { key: 'reportes', label: '📊 Reportes', route: 'reportes' },
  { key: 'historial', label: '🕐 Historial', route: 'historial' },
])

// Tiempo actual
const currentTime = ref('00:00')

// Iniciales del usuario
const userInitials = computed(() => {
  const username = sessionStore.userInfo().username
  return username
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

// Navegación
const navigateTo = (route: string) => {
  router.push(`/${route}`)
}

const goHome = () => {
  router.push('/dashboard')
}

const goBack = () => {
  router.go(-1)
}

const viewAllChanges = () => {
  router.push('/historial')
}

// Actualizar hora actual
let timeInterval: number

onMounted(() => {
  updateCurrentTime()
  timeInterval = setInterval(updateCurrentTime, 60000) // Actualizar cada minuto
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.dashboard {
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--color-light-gray);
}

.dashboard-header h1 {
  color: var(--color-dark-text);
  margin-bottom: 1.5rem;
  font-size: 2rem;
  border-bottom: 3px solid var(--color-primary);
  padding-bottom: 0.5rem;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 120px);
}

/* Sidebar Styles */
.sidebar {
  background: var(--color-white);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-light-gray);
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-info));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: bold;
  color: var(--color-white);
  font-size: 1.2rem;
}

.user-details h3 {
  margin: 0;
  color: var(--color-dark-text);
  font-size: 1.1rem;
}

.user-details p {
  margin: 0;
  color: var(--color-secondary);
  font-size: 0.9rem;
}

.session-timer {
  background: var(--color-light-gray);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.timer-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-dark-text);
}

.sidebar-menu {
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.sidebar-menu h4 {
  color: var(--color-dark-text);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: var(--color-dark-text);
  border: 1px solid transparent;
}

.sidebar-menu li:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateX(5px);
}

.sidebar-menu li.active {
  background-color: var(--color-success);
  color: var(--color-white);
  border-color: var(--color-success);
}

.sidebar-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Main Content Styles */
.main-content {
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  gap: 1.5rem;
  overflow-y: auto;
}

.summary-section,
.changes-section,
.antivirus-section {
  background: var(--color-white);
  padding: 1.5rem;
  border-radius: 12px;
}

.summary-section h2,
.changes-section h2,
.antivirus-section h2 {
  color: var(--color-dark-text);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--color-secondary);
  padding-bottom: 0.5rem;
}

/* Summary Grid */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.summary-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: var(--color-light-gray);
  border-radius: 8px;
  border-left: 4px solid var(--color-success);
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.summary-info h3 {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-dark-text);
  opacity: 0.8;
}

.summary-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-success);
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.antivirus-period {
  display: flex;
  gap: 2rem;
  color: var(--color-dark-text);
}

/* Tables */
.table-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background-color: var(--color-primary);
  color: var(--color-dark-text);
  font-weight: 600;
  padding: 0.75rem;
  text-align: left;
  position: sticky;
  top: 0;
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-light-gray);
  color: var(--color-dark-text);
}

.data-table tr:hover {
  background-color: var(--color-light-gray);
}

.data-table tr:last-child td {
  border-bottom: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }

  .sidebar {
    order: 2;
  }

  .main-content {
    order: 1;
  }
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
