import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
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
  // ... otras rutas que tengas
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Necesitas importar el store aquí también
import { useSessionStore } from '../stores/session'

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()

  if (!sessionStore.isAuthenticated) {
    sessionStore.initializeAuth()
  }

  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && sessionStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
