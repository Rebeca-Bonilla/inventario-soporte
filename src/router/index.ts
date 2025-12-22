// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/auth/views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/modules/dashboard/views/DashboardView.vue'),
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('@/modules/equipment/views/RegistroEquipos.vue'),
  },
  // Agrega más rutas según necesites
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard de navegación opcional (comentar si da problemas)
/*
router.beforeEach((to, from, next) => {
  console.log(`🛡️ Navegando de ${from.path} a ${to.path}`);

  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const isAuthenticated = localStorage.getItem('token');

  if (authRequired && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});
*/

export default router
