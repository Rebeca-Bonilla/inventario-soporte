import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { AuthService } from './services/authService'

dotenv.config()

const app = express()
const authService = new AuthService()

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
)
app.use(express.json())

// Ruta de login (Paso 7 completo)
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body

  console.log(`🔐 Login attempt: ${username}`)

  try {
    const user = await authService.validateUser(username, password)

    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    res.json({
      token: 'jwt-token-simulado-' + Date.now(),
      usuario: user,
      mensaje: 'Login exitoso',
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// Ruta de verificación de token
app.get('/api/auth/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  // Simulación simple
  res.json({
    valid: true,
    usuario: {
      id: 1,
      username: 'admin',
      nombre_completo: 'Administrador del Sistema',
      rol: 'admin',
    },
  })
})

// Ruta de logout
app.post('/api/auth/logout', (req, res) => {
  res.json({ mensaje: 'Logout exitoso' })
})

// Ruta protegida de ejemplo
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    equipos_computo: 72,
    monitores: 42,
    teclados: 81,
    telefonos: 56,
    cambios_recientes: [
      {
        id: 1,
        cambio: 'Ingreso de equipo nuevo',
        usuario: 'admin',
        fecha: '2024-02-25',
        hora: '13:03:23',
      },
      {
        id: 2,
        cambio: 'Archivamiento',
        usuario: 'usuario',
        fecha: '2024-02-25',
        hora: '13:13:21',
      },
    ],
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'Inventario_prueba',
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`)
  console.log(`✅ CORS configurado para: http://localhost:5173 y http://localhost:5174`)
})
