import { Elysia } from 'elysia'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'inventario-secret'

export const authMiddleware = new Elysia().derive({ as: 'global' }, ({ headers, set }) => {
  const authHeader = headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    set.status = 401
    throw new Error('Token requerido')
  }

  const token = authHeader.substring(7) // Remover "Bearer "

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return { user: decoded }
  } catch (error) {
    set.status = 401
    throw new Error('Token inválido')
  }
})
