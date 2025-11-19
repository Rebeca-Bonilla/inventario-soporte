import { Elysia } from 'elysia'

export const importacionRoutes = new Elysia().get('/importacion', () => {
  return { message: 'Importación' }
})
