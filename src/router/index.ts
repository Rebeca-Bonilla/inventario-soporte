// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('@/views/RegistroEquipos.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/consulta',
      name: 'consulta',
      component: () => import('@/views/ConsultaEquipos.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/archivados',
      name: 'archivados',
      component: () => import('@/views/ArchivadosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/importacion',
      name: 'importacion',
      component: () => import('@/views/ImportacionView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: () => import('@/views/ReportesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('@/views/HistorialView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Guard de navegación
router.beforeEach(async (to, from, next) => {
  // Importación dinámica del store para evitar problemas de ciclo
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
