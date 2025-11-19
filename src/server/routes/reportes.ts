import { Elysia } from 'elysia'

export const reportesRoutes = new Elysia().get('/reportes', () => {
  return { message: 'Reportes' }
})
