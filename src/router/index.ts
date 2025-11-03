// router/index.ts
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'), // ← Layout principal
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
      // ... otras rutas
    ],
  },
]
