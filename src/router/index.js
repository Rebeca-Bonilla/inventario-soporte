import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/registro',
    component: () => import('../views/RegistroEquipos.vue'),
  },
  {
    path: '/consulta',
    component: () => import('../views/ConsultaEquipos.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
