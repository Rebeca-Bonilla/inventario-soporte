<!-- src/modules/dashboard/views/DashboardView.vue -->
<template>
  <MainLayout>
    <div class="dashboard-container">
      <!-- Header con título -->
      <div class="dashboard-header">
        <h1>HOME</h1>
        <div class="user-welcome">
          <span>Bienvenido, {{ user?.nombre_completo || user?.username }}</span>
          <span class="user-cargo">{{ user?.cargo }}</span>
        </div>
      </div>

      <!-- Menú principal (duplicado de AppHeader para contexto) -->
      <div class="dashboard-menu">
        <router-link to="/registro" class="menu-item">📝 Registro</router-link>
        <router-link to="/consulta" class="menu-item">🔍 Consulta</router-link>
        <router-link to="/archivados" class="menu-item">📁 Archivados</router-link>
        <router-link to="/importacion" class="menu-item">📤 Importación</router-link>
        <router-link to="/reportes" class="menu-item">📊 Reportes</router-link>
        <router-link to="/historial" class="menu-item">🕐 Historial</router-link>
      </div>

      <!-- Contenido principal del dashboard -->
      <div class="dashboard-content">
        <!-- Sección de Resumen -->
        <div class="summary-section">
          <h2>Resumen</h2>
          <div class="summary-grid">
            <SummaryCard title="Equipos de cómputo" :value="stats.equipos_computo" icon="💻" />
            <SummaryCard title="Monitores" :value="stats.monitores" icon="🖥️" />
            <SummaryCard title="Teclados" :value="stats.teclados" icon="⌨️" />
            <SummaryCard title="Teléfonos" :value="stats.telefonos" icon="📱" />
          </div>
        </div>

        <!-- Dos columnas: Cambios recientes y Antivirus -->
        <div class="dashboard-columns">
          <!-- Columna izquierda: Cambios recientes -->
          <div class="column-left">
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
                    <tr v-for="change in cambiosRecientes" :key="change.id">
                      <td>{{ change.id }}</td>
                      <td>{{ change.cambio }}</td>
                      <td>{{ change.usuario }}</td>
                      <td>{{ formatDate(change.fecha) }}</td>
                      <td>{{ change.hora }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Columna derecha: Antivirus por expirar -->
          <div class="column-right">
            <div class="antivirus-section">
              <div class="section-header">
                <h2>Próximos antivirus por expirar:</h2>
                <div class="time-indicator">
                  <span class="time-label">Próximos</span>
                  <span class="time-value">{{ proximosMeses }} meses</span>
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
                    <tr v-for="item in antivirusExpirando" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.equipo }}</td>
                      <td>{{ item.usuario }}</td>
                      <td>{{ item.ns }}</td>
                      <td>{{ formatDate(item.fecha) }}</td>
                    </tr>
                    <!-- Filas vacías para mantener diseño -->
                    <tr v-for="i in 4 - antivirusExpirando.length" :key="`empty-${i}`">
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
        <!-- Fin de dashboard-columns -->
      </div>
      <!-- Fin de dashboard-content -->
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '@/shared/components/layout/MainLayout.vue'
import SummaryCard from '@/shared/components/summaryCard.vue'
import { AuthService } from '@/services/authService'

const router = useRouter()
const authService = new AuthService()
const user = ref(authService.getCurrentUser())

// Datos del dashboard (simulados por ahora)
const stats = ref({
  equipos_computo: 72,
  monitores: 42,
  teclados: 81,
  telefonos: 56,
})

const cambiosRecientes = ref([
  {
    id: 1,
    cambio: 'Ingreso de equipo nuevo',
    usuario: 'Fulano_Perez',
    fecha: '2024-02-25',
    hora: '13:03:23',
  },
  {
    id: 2,
    cambio: 'Archivamiento',
    usuario: 'Mengano_Gutierrez',
    fecha: '2024-02-25',
    hora: '13:13:21',
  },
  {
    id: 3,
    cambio: 'Actualización de estado',
    usuario: 'admin',
    fecha: '2024-02-24',
    hora: '09:45:10',
  },
  {
    id: 4,
    cambio: 'Asignación de equipo',
    usuario: 'usuario',
    fecha: '2024-02-24',
    hora: '15:30:45',
  },
  {
    id: 5,
    cambio: 'Registro de mantenimiento',
    usuario: 'admin',
    fecha: '2024-02-23',
    hora: '11:20:33',
  },
  {
    id: 6,
    cambio: 'Baja de equipo',
    usuario: 'Mengano_Gutierrez',
    fecha: '2024-02-23',
    hora: '16:55:12',
  },
  { id: 7, cambio: 'Importación masiva', usuario: 'admin', fecha: '2024-02-22', hora: '14:10:05' },
  {
    id: 8,
    cambio: 'Cambio de ubicación',
    usuario: 'usuario',
    fecha: '2024-02-22',
    hora: '10:25:30',
  },
  {
    id: 9,
    cambio: 'Actualización de software',
    usuario: 'Fulano_Perez',
    fecha: '2024-02-21',
    hora: '08:40:15',
  },
  { id: 10, cambio: 'Reasignación', usuario: 'admin', fecha: '2024-02-21', hora: '17:05:22' },
  {
    id: 11,
    cambio: 'Reparación completada',
    usuario: 'Mengano_Gutierrez',
    fecha: '2024-02-20',
    hora: '12:15:40',
  },
  {
    id: 12,
    cambio: 'Inventario físico',
    usuario: 'usuario',
    fecha: '2024-02-20',
    hora: '09:30:18',
  },
])

const antivirusExpirando = ref([
  {
    id: 1,
    equipo: 'Laptop Dell XPS',
    usuario: 'Juan Pérez',
    ns: 'SN-DELL001',
    fecha: '2024-05-15',
  },
  { id: 2, equipo: 'PC HP Elite', usuario: 'María García', ns: 'SN-HP002', fecha: '2024-05-20' },
  { id: 3, equipo: 'MacBook Pro', usuario: 'Carlos López', ns: 'SN-MAC003', fecha: '2024-06-01' },
  {
    id: 4,
    equipo: 'Lenovo ThinkPad',
    usuario: 'Ana Rodríguez',
    ns: 'SN-LEN004',
    fecha: '2024-06-10',
  },
])

const proximosMeses = ref(3)

onMounted(() => {
  console.log('Dashboard montado para usuario:', user.value)

  if (!user.value) {
    console.log('Usuario no autenticado, redirigiendo...')
    router.push('/login')
  }

  // Aquí cargaríamos datos reales del backend
  fetchDashboardData()
})

const fetchDashboardData = async () => {
  try {
    // En el futuro, llamar al backend
    // const response = await api.get('/dashboard/stats');
    // stats.value = response.data;
  } catch (error) {
    console.error('Error cargando datos del dashboard:', error)
  }
}

const formatDate = (dateString: string) => {
  if (!dateString || dateString === '-') return '-'
  const date = new Date(dateString)
  return date
    .toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-')
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.dashboard-header {
  padding: 1.5rem 2rem;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-primary);
  font-weight: 600;
}

.user-welcome {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-welcome span:first-child {
  font-weight: 500;
  color: var(--text-primary);
}

.user-cargo {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: capitalize;
}

/* Menú del dashboard */
.dashboard-menu {
  display: flex;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 2rem;
  gap: 0;
  overflow-x: auto;
}

.menu-item {
  padding: 0.75rem 1.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-item:hover {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

.menu-item.router-link-active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background-color: var(--bg-secondary);
}

/* Contenido principal */
.dashboard-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Sección de resumen */
.summary-section {
  margin-bottom: 2rem;
}

.summary-section h2 {
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-size: 1.4rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Columnas del dashboard */
.dashboard-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.column-left,
.column-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Tablas */
.recent-changes,
.antivirus-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.recent-changes h2,
.antivirus-section h2 {
  padding: 1rem 1.5rem;
  margin: 0;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  font-size: 1.2rem;
  color: var(--text-primary);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
}

.section-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.time-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.time-value {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table thead {
  background: var(--bg-tertiary);
  border-bottom: 2px solid var(--border-color);
}

.data-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
  border-right: 1px solid var(--border-color);
}

.data-table th:last-child {
  border-right: none;
}

.data-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.data-table tbody tr:hover {
  background: var(--bg-hover);
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
  }

  .user-welcome {
    align-items: flex-start;
  }

  .dashboard-menu {
    padding: 0.5rem 1rem;
    gap: 0.25rem;
  }

  .menu-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  .dashboard-content {
    padding: 1rem;
  }

  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-menu {
    flex-direction: column;
  }

  .menu-item {
    justify-content: center;
  }
}
</style>
