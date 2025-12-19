import { Elysia } from 'elysia'

export const equiposRoutes = new Elysia().get('/equipos', () => {
  return { message: 'Lista de equipos' }
})
