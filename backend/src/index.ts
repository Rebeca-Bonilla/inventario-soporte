import { Elysia } from 'elysia'
import dotenv from 'dotenv'
import http from 'http'

dotenv.config()

// Crear app Elysia
const app = new Elysia()

  // Health check
  .get('/health', () => ({
    status: 'OK',
    message: 'API Sistema de Inventario',
    timestamp: new Date().toISOString(),
  }))

  // Ruta raíz
  .get('/', () => ({
    message: 'API Sistema de Inventario',
    version: '1.0.0',
  }))

  // Login simple
  .post('/auth/login', ({ body }) => {
    console.log('Login attempt:', body)
    return {
      success: true,
      token: 'test-jwt-token-123',
      user: {
        id: 1,
        username: 'admin',
        nombre_completo: 'Administrador del Sistema',
        rol: 'admin',
      },
    }
  })

  // Equipos (protegido)
  .get('/equipos', ({ headers }) => {
    const auth = headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      throw new Error('No autorizado')
    }

    return {
      success: true,
      data: [
        {
          id: 1,
          tipo: 'computadora',
          etiqueta_inventario: 'INV-PC-001',
          marca: 'Dell',
          modelo: 'OptiPlex 7070',
        },
        {
          id: 2,
          tipo: 'monitor',
          etiqueta_inventario: 'INV-MON-001',
          marca: 'HP',
          modelo: '24f',
        },
      ],
    }
  })

  // Error handler
  .onError(({ code, error }) => {
    console.error(`Error ${code}:`, error)
    return { error: error.message }
  })

// Crear servidor HTTP manual CON SOPORTE COMPLETO PARA CORS
const server = http.createServer(async (req, res) => {
  try {
    // ========== MANEJAR CORS MANUALMENTE ==========
    const origin = req.headers.origin
    const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin',
    )
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Max-Age', '86400')

    // Manejar preflight OPTIONS
    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }
    // ========== FIN CORS ==========

    // Crear URL
    const base = `http://${req.headers.host}`
    const url = new URL(req.url || '/', base)

    // Crear headers
    const headers = new Headers()
    if (req.headers) {
      Object.entries(req.headers).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => headers.append(key, v))
          } else {
            headers.set(key, value)
          }
        }
      })
    }

    // Leer body
    let body: Buffer | null = null
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks: Buffer[] = []
      req.on('data', (chunk) => chunks.push(chunk))
      body = await new Promise<Buffer>((resolve) => {
        req.on('end', () => resolve(Buffer.concat(chunks)))
      })
    }

    // Crear Request
    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body: body ? body.toString() : null,
    })

    // Procesar con Elysia
    const response = await app.handle(request)

    // Escribir respuesta
    res.statusCode = response.status
    res.statusMessage = response.statusText

    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    if (response.body) {
      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(value)
      }
    }

    res.end()
  } catch (error: any) {
    console.error('Server error:', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Error interno del servidor' }))
  }
})

const PORT = parseInt(process.env.PORT || '3000')
server.listen(PORT, () => {
  console.log(`🚀 Servidor Elysia en Node.js: http://localhost:${PORT}`)
  console.log(`🩺 Health check: http://localhost:${PORT}/health`)
  console.log(`🔑 Login: POST http://localhost:${PORT}/auth/login`)
  console.log(`📋 Equipos: GET http://localhost:${PORT}/equipos`)
  console.log('\n✅ CORS habilitado para: http://localhost:5173')
  console.log('\nPara probar:')
  console.log('curl http://localhost:3000/health')
  console.log(
    'curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d \'{"username":"admin","password":"admin123"}\'',
  )
  console.log(
    'curl -X GET http://localhost:3000/equipos -H "Authorization: Bearer test-jwt-token-123"',
  )
})

// Mantener el proceso corriendo
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servidor...')
  server.close()
  process.exit(0)
})
