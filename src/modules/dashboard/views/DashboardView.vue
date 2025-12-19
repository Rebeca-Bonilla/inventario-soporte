<template>
  <div class="dashboard">
    <h1>Dashboard de Inventario</h1>

    <!-- Timer de sesión -->
    <div class="session-timer" v-if="user">
      <small>
        Usuario: {{ user.nombre_completo }} ({{ user.rol }}) | Tiempo restante:
        {{ formatTime(timeLeft) }}
      </small>
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
      <div v-else-if="recentChanges.length === 0" class="empty-state">No hay cambios recientes</div>
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/modules/auth/services/authService'

// ==================== INTERFACES ====================
interface User {
  id: number
  username: string
  nombre_completo: string
  rol: string
}

interface Stat {
  label: string
  value: number | string
  change: string
}

interface RecentChange {
  id: number
  descripcion: string
  usuario: string
  fecha: string
  hora: string
}

interface AntivirusItem {
  id: string
  equipo: string
  usuario: string
  serial: string
  fecha: string
}

// ==================== INICIALIZACIÓN ====================
const router = useRouter()

// DEBUG: Verifica todo antes de cargar
onBeforeMount(() => {
  console.log('🔍 DEBUG DashboardView:')
  console.log('- Router:', router)
  console.log('- Ruta actual:', router.currentRoute.value)
  console.log('- Token en localStorage:', localStorage.getItem('token'))
  console.log('- User en localStorage:', localStorage.getItem('user'))
  console.log('- authService disponible:', !!authService)
})

// ==================== ESTADO REACTIVO ====================
const loading = ref<boolean>(true)
const user = ref<User | null>(null)
const timeLeft = ref<number>(30 * 60) // 30 minutos en segundos
const stats = ref<Stat[]>([])
const recentChanges = ref<RecentChange[]>([])
const antivirusExpiring = ref<AntivirusItem[]>([])

// Timer de sesión con tipo correcto
let timerInterval: ReturnType<typeof setInterval> | null = null

// ==================== FUNCIONES DE UTILIDAD ====================
// Formatear tiempo (MM:SS)
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Formatear fecha
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  } catch {
    return dateString
  }
}

// Verificar si expira pronto (menos de 30 días)
const isExpiringSoon = (dateString: string): boolean => {
  const expiryDate = new Date(dateString)
  const today = new Date()
  const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays <= 30
}

// ==================== LÓGICA PRINCIPAL ====================
// Cargar datos del dashboard
const loadDashboardData = async (): Promise<void> => {
  console.log('🟡 START loadDashboardData')

  try {
    loading.value = true

    // 1. Primero verifica autenticación LOCALMENTE
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No hay token, redirigiendo a login')
    }

    // 2. Obtener usuario actual (de localStorage primero)
    const userStr = localStorage.getItem('user')
    if (userStr) {
      user.value = JSON.parse(userStr)
    } else {
      // Si no hay usuario en localStorage, verificar con backend
      console.log('⚠️ No hay usuario en localStorage, verificando con backend...')
      const authState = await authService.checkAuth()
      user.value = authState.user
    }

    console.log('👤 Usuario cargado:', user.value)

    // 3. Cargar datos del dashboard (con timeout para evitar bloqueos)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout cargando datos')), 10000),
    )

    const dataPromise = Promise.resolve({
      // DATOS MOCK TEMPORALES - COMENTA ESTO CUANDO TU API ESTÉ LISTA
      totalEquipos: 42,
      equiposActivos: 35,
      enReparacion: 5,
      asignados: 28,
      totalMonitores: 15,
      totalTelefonos: 10,
      equiposComputo: 25,
      teclados: 8,
      tablets: 7,
      camaras: 5,
      terminales: 3,
    })

    // Si tienes API real, cambia dataPromise por:
    // const dataPromise = equiposService.getDashboardData()

    const data = await Promise.race([dataPromise, timeoutPromise])
    console.log('📊 Datos recibidos:', data)

    // 4. Actualizar stats
    stats.value = [
      {
        label: 'Equipos de cómputo',
        value: data.totalEquipos || data.equiposComputo || 0,
        change: '+3',
      },
      { label: 'Monitores', value: data.totalMonitores || 0, change: '+1' },
      { label: 'Teclados', value: data.teclados || 0, change: '0' },
      { label: 'Teléfonos', value: data.totalTelefonos || 0, change: '+2' },
      { label: 'Cámaras', value: data.camaras || 0, change: '+1' },
      { label: 'Tablets', value: data.tablets || 0, change: '0' },
    ]

    // 5. Cargar cambios recientes (también mock por ahora)
    recentChanges.value = [
      {
        id: 1,
        descripcion: 'Sistema funcionando correctamente',
        usuario: 'sistema',
        fecha: new Date().toISOString(),
        hora: '10:00:00',
      },
    ]

    // 6. Mock antivirus (opcional)
    antivirusExpiring.value = [
      {
        id: 'AV-001',
        equipo: 'Laptop Dell',
        usuario: 'Admin',
        serial: 'SN123',
        fecha: '2024-03-15',
      },
    ]

    console.log('🟢 FIN loadDashboardData - ÉXITO')
  } catch (error) {
    console.error('🔴 ERROR en loadDashboardData:', error)

    // Datos de emergencia
    stats.value = [
      { label: 'Equipos de cómputo', value: '--', change: 'N/A' },
      { label: 'Monitores', value: '--', change: 'N/A' },
      { label: 'Teclados', value: '--', change: 'N/A' },
    ]

    // Si el error es grave (no hay token), redirigir a login
    if (
      error instanceof Error &&
      (error.message.includes('token') || error.message.includes('autenticación'))
    ) {
      console.log('Redirigiendo a login por error de autenticación...')
      authService.logout()
      router.push('/login')
    }
  } finally {
    loading.value = false
    console.log('🏁 loadDashboardData completado (con o sin errores)')
  }
}

// Iniciar timer de sesión
const startSessionTimer = (): void => {
  console.log('⏰ Iniciando timer de sesión')

  // Limpiar timer anterior si existe
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }

  timerInterval = setInterval(() => {
    if (timeLeft.value <= 0) {
      console.log('⌛ Sesión expirada por timer')
      if (timerInterval) clearInterval(timerInterval)
      authService.logout()
      router.push('/login')
    } else {
      timeLeft.value--
      // Opcional: mostrar advertencia a los 5 minutos
      if (timeLeft.value === 5 * 60) {
        console.warn('⚠️ Sesión expira en 5 minutos')
      }
    }
  }, 1000)

  console.log('✅ Timer iniciado, tiempo restante:', formatTime(timeLeft.value))
}

// Resetear timer en interacción
const resetSessionTimer = (): void => {
  timeLeft.value = 30 * 60 // Reset a 30 minutos
}

// Configurar eventos de interacción
const setupActivityListeners = (): void => {
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
  events.forEach((event) => {
    window.addEventListener(event, resetSessionTimer)
  })
}

// ==================== CICLO DE VIDA ====================
onMounted(() => {
  console.log('🚀 Dashboard montado')
  loadDashboardData()
  startSessionTimer()
  setupActivityListeners()
})

onUnmounted(() => {
  console.log('🗑️ Dashboard desmontado')
  if (timerInterval) clearInterval(timerInterval)

  // Remover listeners
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
  events.forEach((event) => {
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

th,
td {
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
