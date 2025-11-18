import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        requiresAuth: false,
        noLayout: true,
        public: true,
      },
    },
    {
      path: '/',
      component: () => import('@/components/layout/MainLayout.vue'),
      meta: {
        requiresAuth: true,
        requiresSessionCheck: true,
      },
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: {
            title: 'Dashboard',
            requiresSessionCheck: true,
          },
        },
        {
          path: '/registro',
          name: 'registro',
          component: () => import('@/views/RegistroEquipos.vue'),
          meta: {
            title: 'Registro de Equipos',
            requiresSessionCheck: true,
          },
        },
        {
          path: '/consulta',
          name: 'consulta',
          component: () => import('@/views/ConsultaEquipos.vue'),
          meta: {
            title: 'Consulta de Equipos',
            requiresSessionCheck: true,
          },
        },
        {
          path: '/archivados',
          name: 'archivados',
          component: () => import('@/views/ArchivadosView.vue'),
          meta: {
            title: 'Equipos Archivados',
            requiresAdmin: true,
            requiresSessionCheck: true,
          },
        },
        {
          path: '/importacion',
          name: 'importacion',
          component: () => import('@/views/ImportacionView.vue'),
          meta: {
            title: 'Importación de Equipos',
            requiresSessionCheck: true,
          },
        },
        {
          path: '/reportes',
          name: 'reportes',
          component: () => import('@/views/ReportesView.vue'),
          meta: {
            title: 'Reportes',
            requiresSessionCheck: true,
          },
        },
        {
          path: '/historial',
          name: 'historial',
          component: () => import('@/views/HistorialView.vue'),
          meta: {
            title: 'Historial',
            requiresSessionCheck: true,
          },
        },
      ],
    },
    // Ruta de fallback
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
  ],
})

// Guard de navegación SIMPLIFICADO - enfoque más directo
router.beforeEach(async (to: RouteLocationNormalized, from, next) => {
  // Importar el store dentro del guard para evitar ciclos de dependencia
  const { useSessionStore } = await import('@/stores/session')
  const sessionStore = useSessionStore()

  // DEBUG: Verificar estado de autenticación
  console.log('🔐 Navegando a:', to.path)
  console.log('🔐 Usuario autenticado:', sessionStore.isAuthenticated)
  console.log('🔐 Ruta requiere auth:', to.meta.requiresAuth)

  // Si la ruta requiere autenticación Y el usuario NO está autenticado
  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    console.log('🔐 Redirigiendo al login - No autenticado')
    next('/login')
    return
  }

  // Si el usuario está autenticado Y trata de ir al login
  if (to.name === 'login' && sessionStore.isAuthenticated) {
    console.log('🔐 Redirigiendo al dashboard - Ya autenticado')
    next('/dashboard')
    return
  }

  // Resetear timer de actividad para rutas que lo requieran
  if (to.meta.requiresSessionCheck) {
    sessionStore.resetTimer()
  }

  next()
})

export default router
