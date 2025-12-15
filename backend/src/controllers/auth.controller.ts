import { query } from '../config/database'
import { LoginRequest, Usuario, ApiResponse } from '../types'

export class AuthController {
  async login(
    data: LoginRequest,
  ): Promise<ApiResponse<{ token: string; user: Omit<Usuario, 'password'> }>> {
    try {
      // Buscar usuario
      const usuarios = (await query(
        'SELECT id, username, password, nombre_completo, rol, activo FROM usuarios WHERE username = ?',
        [data.username],
      )) as Usuario[]

      if (usuarios.length === 0) {
        return {
          success: false,
          error: 'Usuario no encontrado',
        }
      }

      const usuario = usuarios[0]

      // Verificar contraseña
      if (usuario.password !== data.password) {
        return {
          success: false,
          error: 'Contraseña incorrecta',
        }
      }

      if (!usuario.activo) {
        return {
          success: false,
          error: 'Usuario inactivo',
        }
      }

      // Crear sesión
      const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
      await query(`INSERT INTO sesiones (id, usuario_id, ip_address) VALUES (?, ?, ?)`, [
        sessionId,
        usuario.id,
        'localhost',
      ])

      // Crear token
      const token = Buffer.from(`${usuario.id}:${sessionId}`).toString('base64')

      // Remover password
      const { password, ...userWithoutPassword } = usuario

      return {
        success: true,
        data: {
          token,
          user: userWithoutPassword,
        },
      }
    } catch (error: any) {
      console.error('Error en login:', error)
      return {
        success: false,
        error: 'Error interno del servidor',
      }
    }
  }

  async verifyToken(token: string): Promise<ApiResponse<Usuario>> {
    try {
      // Decodificar token
      const decoded = Buffer.from(token, 'base64').toString('ascii')
      const [userId, sessionId] = decoded.split(':')

      // Verificar sesión
      const sesiones = (await query(
        `SELECT u.id, u.username, u.nombre_completo, u.rol, u.activo
                 FROM sesiones s
                 JOIN usuarios u ON s.usuario_id = u.id
                 WHERE s.id = ? AND s.usuario_id = ? AND s.activa = 1
                 AND TIMESTAMPDIFF(MINUTE, s.ultima_actividad, NOW()) < 30`,
        [sessionId, userId],
      )) as any[]

      if (sesiones.length === 0) {
        return {
          success: false,
          error: 'Sesión expirada',
        }
      }

      const usuario = sesiones[0]

      // Actualizar actividad
      await query('UPDATE sesiones SET ultima_actividad = NOW() WHERE id = ?', [sessionId])

      return {
        success: true,
        data: usuario,
      }
    } catch (error: any) {
      console.error('Error verificando token:', error)
      return {
        success: false,
        error: 'Token inválido',
      }
    }
  }

  async logout(token: string): Promise<ApiResponse> {
    try {
      const decoded = Buffer.from(token, 'base64').toString('ascii')
      const [userId, sessionId] = decoded.split(':')

      await query('UPDATE sesiones SET activa = 0 WHERE id = ? AND usuario_id = ?', [
        sessionId,
        userId,
      ])

      return {
        success: true,
        message: 'Sesión cerrada',
      }
    } catch (error: any) {
      console.error('Error en logout:', error)
      return {
        success: false,
        error: 'Error al cerrar sesión',
      }
    }
  }
}
