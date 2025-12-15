import { Elysia } from 'elysia'
import { AuthController } from '../controllers/auth.controller'

const authController = new AuthController()

export const authMiddleware = new Elysia().derive(async ({ headers, set }) => {
  const authHeader = headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    set.status = 401
    throw new Error('Token no proporcionado')
  }

  const token = authHeader.substring(7)
  const result = await authController.verifyToken(token)

  if (!result.success) {
    set.status = 401
    throw new Error(result.error || 'No autorizado')
  }

  return {
    user: result.user,
  }
})
