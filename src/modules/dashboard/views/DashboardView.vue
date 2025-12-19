<template>
  <div class="dashboard">
    <h1>Dashboard de Inventario</h1>
    
    <!-- Timer de sesión -->
    <div class="session-timer" v-if="user">
      <small>Usuario: {{ user.nombre_completo }} ({{ user.rol }}) | Tiempo restante: {{ formatTime(timeLeft) }}</small>
    </div>
    
    <div class="dashboard-grid">
      <!-- Tarjetas de resumen -->
      <div class="summary-card" v-for="stat in stats" :key="stat.label">
        <h3>{{ stat.label }}</h3>
        <p class="number">{{ stat.value }}</p>
        <small>{{ stat.change }} vs último mes</small>
      </div>
    </div>
    
    <!-- Sección de cambios recientes -->
    <div class="recent-changes">
      <h2>📋 Cambios Recientes</h2>
      <div v-if="loading">Cargando cambios...</div>
      <div v-else-if="recentChanges.length === 0" class="empty-state">
        No hay cambios recientes
      </div>
      <div v-else class="table-container">
        <table>
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
            <tr v-for="change in recentChanges" :key="change.id">
              <td>{{ change.id }}</td>
              <td>{{ change.descripcion }}</td>
              <td>{{ change.usuario }}</td>
              <td>{{ formatDate(change.fecha) }}</td>
              <td>{{ change.hora }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Próximos antivirus por expirar -->
    <div class="antivirus-section" v-if="antivirusExpiring.length > 0">
      <h2>⚠️ Próximos antivirus por expirar</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipo</th>
              <th>Usuario</th>
              <th>N/S</th>
              <th>Fecha expiración</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in antivirusExpiring" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.equipo }}</td>
              <td>{{ item.usuario }}</td>
              <td>{{ item.serial }}</td>
              <td :class="{ 'expiring-soon': isExpiringSoon(item.fecha) }">
                {{ formatDate(item.fecha) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/modules/auth/services/authService'

const router = useRouter()

// Estado reactivo
const loading = ref(true)
const user = ref(null)
const timeLeft = ref(30 * 60) // 30 minutos en segundos
const stats = ref([])
const recentChanges = ref([])
const antivirusExpiring = ref([])

// Timer de sesión
let timerInterval = null

// Formatear tiempo (MM:SS)
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  } catch {
    return dateString
  }
}

// Verificar si expira pronto (menos de 30 días)
const isExpiringSoon = (dateString) => {
  const expiryDate = new Date(dateString)
  const today = new Date()
  const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
  return diffDays <= 30
}

// Cargar datos del dashboard
const loadDashboardData = async () => {
  try {
    loading.value = true
    
    // Obtener usuario actual
    const authState = await authService.checkAuth()
    user.value = authState.user
    
    // Datos mock para desarrollo
    // TODO: Reemplazar con llamadas reales a la API
    
    stats.value = [
      { label: 'Equipos de cómputo', value: '42', change: '+3' },
      { label: 'Monitores', value: '15', change: '+1' },
      { label: 'Teclados', value: '18', change: '0' },
      { label: 'Teléfonos', value: '24', change: '+2' },
      { label: 'Cámaras', value: '8', change: '+1' },
      { label: 'Tablets', value: '12', change: '0' }
    ]
    
    recentChanges.value = [
      { id: 1, descripcion: 'Ingreso de equipo nuevo: Laptop Dell XPS', usuario: 'admin', fecha: '2024-12-19', hora: '10:30:00' },
      { id: 2, descripcion: 'Actualización de ubicación: Monitor Samsung 27"', usuario: 'maria.garcia', fecha: '2024-12-18', hora: '14:20:00' },
      { id: 3, descripcion: 'Equipo archivado: iPhone 8 (dañado)', usuario: 'admin', fecha: '2024-12-17', hora: '09:15:00' },
      { id: 4, descripcion: 'Asignación: Laptop HP a Juan Pérez', usuario: 'carlos.lopez', fecha: '2024-12-16', hora: '16:45:00' },
      { id: 5, descripcion: 'Reparación completada: Tablet Samsung', usuario: 'tecnico.soporte', fecha: '2024-12-15', hora: '11:10:00' }
    ]
    
    antivirusExpiring.value = [
      { id: 'PC-001', equipo: 'Laptop Dell Latitude', usuario: 'Ana Rodríguez', serial: 'SN-DELL-001', fecha: '2025-01-15' },
      { id: 'PC-003', equipo: 'Desktop HP Elite', usuario: 'Carlos Méndez', serial: 'SN-HP-003', fecha: '2025-01-20' },
      { id: 'PC-007', equipo: 'Laptop Lenovo ThinkPad', usuario: 'Luisa Fernández', serial: 'SN-LEN-007', fecha: '2025-01-25' }
    ]
    
  } catch (error) {
    console.error('Error cargando dashboard:', error)
    // En caso de error, mostrar datos mínimos
    stats.value = [
      { label: 'Equipos de cómputo', value: '--', change: 'N/A' },
      { label: 'Monitores', value: '--', change: 'N/A' },
      { label: 'Teclados', value: '--', change: 'N/A' },
      { label: 'Teléfonos', value: '--', change: 'N/A' }
    ]
  } finally {
    loading.value = false
  }
}

// Iniciar timer de sesión
const startSessionTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval)
      // Cerrar sesión automáticamente
      authService.logout()
      router.push('/login')
    } else {
      timeLeft.value--
    }
  }, 1000)
}

// Resetear timer en interacción
const resetSessionTimer = () => {
  timeLeft.value = 30 * 60 // Reset a 30 minutos
}

// Configurar eventos de interacción
const setupActivityListeners = () => {
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
  events.forEach(event => {
    window.addEventListener(event, resetSessionTimer)
  })
}

// Ciclo de vida
onMounted(() => {
  loadDashboardData()
  startSessionTimer()
  setupActivityListeners()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
  // Remover listeners
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
  events.forEach(event => {
    window.removeEventListener(event, resetSessionTimer)
  })
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.session-timer {
  background: #f0f7ff;
  padding: 8px 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 4px solid #2196f3;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.summary-card h3 {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 14px;
  font-weight: 600;
}

.summary-card .number {
  margin: 0 0 5px 0;
  font-size: 32px;
  font-weight: bold;
  color: #2196f3;
}

.summary-card small {
  color: #666;
  font-size: 12px;
}

.recent-changes,
.antivirus-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.recent-changes h2,
.antivirus-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #888;
  font-style: italic;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #444;
}

tbody tr:hover {
  background-color: #f8f9fa;
}

.expiring-soon {
  color: #f44336;
  font-weight: bold;
}
</style>