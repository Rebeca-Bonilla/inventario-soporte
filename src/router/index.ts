import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false, noLayout: true }, // ← Añade esto
    },
    {
      path: '/',
      component: () => import('@/components/layout/MainLayout.vue'), // ← Layout para rutas autenticadas
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/registro',
          name: 'registro',
          component: () => import('@/views/RegistroEquipos.vue'),
        },
        {
          path: '/consulta',
          name: 'consulta',
          component: () => import('@/views/ConsultaEquipos.vue'),
        },
        {
          path: '/archivados',
          name: 'archivados',
          component: () => import('@/views/ArchivadosView.vue'),
        },
        {
          path: '/importacion',
          name: 'importacion',
          component: () => import('@/views/ImportacionView.vue'),
        },
        {
          path: '/reportes',
          name: 'reportes',
          component: () => import('@/views/ReportesView.vue'),
        },
        {
          path: '/historial',
          name: 'historial',
          component: () => import('@/views/HistorialView.vue'),
        },
      ],
    },
    // Redirección por defecto
    {
      path: '/',
      redirect: '/dashboard',
    },
  ],
})

// Guard de navegación
router.beforeEach(async (to, from, next) => {
  const { useSessionStore } = await import('@/stores/session')
  const sessionStore = useSessionStore()

  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next('/login')
  } else if (to.name === 'login' && sessionStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
