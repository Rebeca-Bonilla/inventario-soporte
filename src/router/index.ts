import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useSessionStore } from '@/modules/auth/stores/session'

const routes: Array<RouteRecordRaw> = [
  // ========== LOGIN (sin layout) ==========
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/auth/views/LoginView.vue'),
    meta: {
      requiresAuth: false,
      hideLayout: true, // ¡NUEVO! Para que App.vue sepa no usar layout
    },
  },

  // ========== RUTAS PROTEGIDAS (CON LAYOUT) ==========
  {
    path: '/',
    // ¡RUTA CORRECTA! Tu MainLayout está en shared/components/layout/
    component: () => import('@/shared/components/layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // Ruta vacía '/'
        redirect: '/dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/modules/dashboard/views/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },
      // ========== AÑADE AQUÍ TODAS TUS VISTAS ==========
      {
        path: 'equipos/registro',
        name: 'RegistroEquipos',
        component: () => import('@/modules/equipment/views/RegistroEquipos.vue'),
        meta: { title: 'Registrar Equipo' },
      },
      {
        path: 'equipos/consulta',
        name: 'ConsultaEquipos',
        component: () => import('@/modules/equipment/views/ConsultaEquipos.vue'),
        meta: { title: 'Consultar Equipos' },
      },
      {
        path: 'equipos/archivados',
        name: 'Archivados',
        component: () => import('@/modules/equipment/views/ArchivadosView.vue'),
        meta: { title: 'Equipos Archivados' },
      },
      {
        path: 'reportes',
        name: 'Reportes',
        component: () => import('@/modules/reports/views/ReportesView.vue'),
        meta: { title: 'Reportes' },
      },
      {
        path: 'historial',
        name: 'Historial',
        component: () => import('@/modules/history/views/HistorialView.vue'),
        meta: { title: 'Historial' },
      },
      {
        path: 'importacion',
        name: 'Importacion',
        component: () => import('@/modules/equipment/views/ImportacionView.vue'),
        meta: { title: 'Importación' },
      },
      // ... añade más rutas cuando las crees
    ],
  },

  // ========== 404 ==========
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ========== NAVIGATION GUARD ==========
router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()

  // Verificar autenticación DE FORMA SEGURA
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const isAuthenticated = !!(token && user)

  console.log('🛡️ Router Guard:', {
    to: to.path,
    requiresAuth: to.meta.requiresAuth,
    isAuthenticated,
    hasToken: !!token,
    hasUser: !!user,
  })

  // Si NO hay token pero el store dice que está autenticado → limpiar
  if (!token && sessionStore.isAuthenticated) {
    console.log('⚠️ Token perdido pero store dice autenticado. Limpiando...')
    sessionStore.logout()
    localStorage.removeItem('user')
  }

  // Lógica de navegación
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('🚫 Redirigiendo a login (no autenticado)')
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    console.log('✅ Ya autenticado, redirigiendo a dashboard')
    next('/dashboard')
  } else {
    console.log('➡️ Navegación permitida')
    next()
  }
})

export default router
