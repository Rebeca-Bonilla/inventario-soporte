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
  {
    path: '/importacion',
    component: () => import('../views/ImportacionView.vue'),
  },
  {
    path: '/reportes',
    component: () => import('../views/ReportesView.vue'),
  },
  {
    path: '/historial',
    component: () => import('../views/HistorialView.vue'),
  },
  {
    path: '/archivados',
    component: () => import('../views/ArchivadosView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
