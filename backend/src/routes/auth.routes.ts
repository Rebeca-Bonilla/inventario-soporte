import { Elysia, t } from 'elysia'
import { AuthController } from '../controllers/auth.controller'

const authController = new AuthController()

export const authRoutes = new Elysia({ prefix: '/auth' })
  // Login
  .post(
    '/login',
    async ({ body, set }) => {
      const result = await authController.login(body as any)

      if (!result.success) {
        set.status = 401
      }

      return result
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  )

  // Logout
  .post(
    '/logout',
    async ({ body, set }) => {
      const result = await authController.logout((body as any).token)

      if (!result.success) {
        set.status = 400
      }

      return result
    },
    {
      body: t.Object({
        token: t.String(),
      }),
    },
  )

  // Verify token
  .get('/verify', async ({ headers, set }) => {
    const authHeader = headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      set.status = 401
      return { success: false, error: 'Token requerido' }
    }

    const token = authHeader.substring(7)
    const result = await authController.verifyToken(token)

    if (!result.success) {
      set.status = 401
    }

    return result
  })
