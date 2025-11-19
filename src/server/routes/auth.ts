import { Elysia, t } from 'elysia'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'inventario-secret'

interface User {
  id: number
  username: string
  name: string
  email: string
  role: string
}

export const authRoutes = new Elysia().post(
  '/auth/login',
  async ({ body, set, store }: any) => {
    const { username, password } = body
    const db = store.db

    try {
      // Buscar usuario en la base de datos
      const user = db.prepare('SELECT * FROM usuarios WHERE username = ?').get(username) as User & {
        password_hash: string
      }

      if (!user) {
        set.status = 401
        return { success: false, error: 'Usuario o contraseña incorrectos' }
      }

      // Verificar contraseña
      const passwordMatch = await bcrypt.compare(password, user.password_hash)
      if (!passwordMatch) {
        set.status = 401
        return { success: false, error: 'Usuario o contraseña incorrectos' }
      }

      // Generar token JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name || user.username,
        },
        JWT_SECRET,
        { expiresIn: '30m' },
      )

      // Devolver respuesta sin password
      const { password_hash, ...userWithoutPassword } = user

      return {
        success: true,
        user: userWithoutPassword,
        token,
        message: 'Login exitoso',
      }
    } catch (error) {
      console.error('Login error:', error)
      set.status = 500
      return { success: false, error: 'Error interno del servidor' }
    }
  },
  {
    body: t.Object({
      username: t.String({ minLength: 1 }),
      password: t.String({ minLength: 1 }),
    }),
  },
)
