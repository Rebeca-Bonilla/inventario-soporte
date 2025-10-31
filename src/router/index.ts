import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/equipos',
    name: 'Equipos',
    component: () => import('../views/ConsultaEquipos.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/RegistroEquipos.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/importacion',
    name: 'Importacion',
    component: () => import('../views/ImportacionView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: () => import('../views/ReportesView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/historial',
    name: 'Historial',
    component: () => import('../views/HistorialView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/archivados',
    name: 'Archivados',
    component: () => import('../views/ArchivadosView.vue'),
    meta: { requiresAuth: true },
  }, // <--- AQUÍ FALTABA ESTA COMA
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard de navegación simplificado
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
