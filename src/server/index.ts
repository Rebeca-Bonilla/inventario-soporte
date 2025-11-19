import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'

// Interfaces para TypeScript
interface User {
  id: number
  username: string
  password: string
  name: string
  email: string
  role: string
}

interface Equipo {
  id: number
  tipo: string
  marca: string
  modelo: string
  serial: string
  estado: string
  archivo: boolean
  fechaRegistro: string
}

// Datos en memoria - mantener como const pero usar métodos inmutables
const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
    email: 'admin@empresa.com',
    role: 'admin',
  },
  {
    id: 2,
    username: 'usuario',
    password: 'usuario123',
    name: 'Usuario Prueba',
    email: 'usuario@empresa.com',
    role: 'user',
  },
]

const equipos: Equipo[] = [
  {
    id: 1,
    tipo: 'computo',
    marca: 'Dell',
    modelo: 'Latitude 5400',
    serial: 'DL001',
    estado: 'activo',
    archivo: false,
    fechaRegistro: new Date().toISOString(),
  },
  {
    id: 2,
    tipo: 'telefono',
    marca: 'Samsung',
    modelo: 'Galaxy S20',
    serial: 'SG001',
    estado: 'activo',
    archivo: false,
    fechaRegistro: new Date().toISOString(),
  },
  {
    id: 3,
    tipo: 'monitor',
    marca: 'HP',
    modelo: '24fw',
    serial: 'HP001',
    estado: 'activo',
    archivo: false,
    fechaRegistro: new Date().toISOString(),
  },
]

// ✅ SOLO UNA DEFINICIÓN DE app
const app = new Elysia()
  // Configuración CORS más permisiva
  .use(
    cors({
      origin: true, // Permite todos los origenes
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )

  // Agregar logger para debug
  .onRequest(({ request }) => {
    console.log(`➡️ ${request.method} ${request.url}`)
  })
  .onResponse(({ request, response }) => {
    console.log(`⬅️ ${request.method} ${request.url} - ${response.status}`)
  })

  // ========== API ROUTES ==========

  // 🔐 AUTH
  .post(
    '/api/auth/login',
    ({ body }) => {
      const { username, password } = body as { username: string; password: string }

      const user = users.find((u) => u.username === username && u.password === password)

      if (!user) {
        return { success: false, error: 'Credenciales inválidas' }
      }

      const { password: _, ...userWithoutPassword } = user
      const token = `token-${user.id}-${Date.now()}`

      return {
        success: true,
        user: userWithoutPassword,
        token,
        message: 'Login exitoso',
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  )

  // 📊 DASHBOARD
  .get('/api/dashboard/stats', () => {
    const totalEquipos = equipos.length
    const equiposActivos = equipos.filter((e) => e.estado === 'activo').length
    const equiposArchivados = equipos.filter((e) => e.archivo).length
    const totalTipos = new Set(equipos.map((e) => e.tipo)).size

    return {
      stats: {
        totalEquipos,
        equiposActivos,
        equiposArchivados,
        totalTipos,
      },
      recentActivities: [
        { id: 1, description: 'Sistema en línea', timestamp: new Date().toISOString() },
      ],
    }
  })

  // 🖥️ EQUIPOS CRUD
  .get('/api/equipos', () => {
    return { success: true, equipos }
  })

  .post('/api/equipos', ({ body }) => {
    const equipoData = body as Omit<Equipo, 'id' | 'fechaRegistro'>

    const newId = equipos.length > 0 ? Math.max(...equipos.map((e) => e.id)) + 1 : 1

    const newEquipo: Equipo = {
      id: newId,
      ...equipoData,
      fechaRegistro: new Date().toISOString(),
    }

    // Usar métodos inmutables en lugar de modificar el array directamente
    equipos.push(newEquipo)
    return {
      success: true,
      equipo: newEquipo,
      message: 'Equipo agregado correctamente',
    }
  })

  .put('/api/equipos/:id', ({ params, body }) => {
    const id = parseInt(params.id)
    const index = equipos.findIndex((e) => e.id === id)

    if (index === -1) {
      return { success: false, error: 'Equipo no encontrado' }
    }

    // Extraer solo las propiedades permitidas para actualizar
    const bodyData = body as any
    const equipoActual = equipos[index]

    // Crear NUEVO objeto con las actualizaciones (en lugar de modificar)
    const equipoActualizado: Equipo = {
      id: equipoActual.id,
      tipo: bodyData.tipo !== undefined ? bodyData.tipo : equipoActual.tipo,
      marca: bodyData.marca !== undefined ? bodyData.marca : equipoActual.marca,
      modelo: bodyData.modelo !== undefined ? bodyData.modelo : equipoActual.modelo,
      serial: bodyData.serial !== undefined ? bodyData.serial : equipoActual.serial,
      estado: bodyData.estado !== undefined ? bodyData.estado : equipoActual.estado,
      archivo: bodyData.archivo !== undefined ? bodyData.archivo : equipoActual.archivo,
      fechaRegistro: equipoActual.fechaRegistro, // Mantener la fecha original
    }

    // Reemplazar el elemento en el array (esto es permitido con const)
    equipos[index] = equipoActualizado

    return {
      success: true,
      equipo: equipos[index],
      message: 'Equipo actualizado',
    }
  })

  // 🗂️ ARCHIVAR EQUIPO
  .patch('/api/equipos/:id/archivar', ({ params }) => {
    const id = parseInt(params.id)
    const index = equipos.findIndex((e) => e.id === id)

    if (index === -1) {
      return { success: false, error: 'Equipo no encontrado' }
    }

    const equipoActual = equipos[index]

    // Crear NUEVO objeto archivado
    const equipoArchivado: Equipo = {
      ...equipoActual,
      archivo: true,
      estado: 'archivado',
    }

    equipos[index] = equipoArchivado

    return {
      success: true,
      message: 'Equipo archivado',
    }
  })

  // 🔓 DESARCHIVAR EQUIPO (solo admin)
  .patch('/api/equipos/:id/desarchivar', ({ params }) => {
    const id = parseInt(params.id)
    const index = equipos.findIndex((e) => e.id === id)

    if (index === -1) {
      return { success: false, error: 'Equipo no encontrado' }
    }

    const equipoActual = equipos[index]

    // Crear NUEVO objeto desarchivado
    const equipoDesarchivado: Equipo = {
      ...equipoActual,
      archivo: false,
      estado: 'activo',
    }

    equipos[index] = equipoDesarchivado

    return {
      success: true,
      message: 'Equipo desarchivado',
    }
  })

  // ❌ ELIMINAR EQUIPO
  .delete('/api/equipos/:id', ({ params }) => {
    const id = parseInt(params.id)
    const index = equipos.findIndex((e) => e.id === id)

    if (index === -1) {
      return { success: false, error: 'Equipo no encontrado' }
    }

    equipos.splice(index, 1)
    return {
      success: true,
      message: 'Equipo eliminado',
    }
  })

  // 📝 OBTENER EQUIPOS ARCHIVADOS
  .get('/api/equipos/archivados', () => {
    const archivados = equipos.filter((e) => e.archivo)
    return { success: true, equipos: archivados }
  })

  // 🌐 HEALTH CHECK
  .get('/api/health', () => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      totalEquipos: equipos.length,
      totalUsers: users.length,
    }
  })

  .listen(3000)

console.log('🚀 Servidor de Inventario corriendo en:')
console.log('📍 http://localhost:3000')
console.log('📧 Los usuarios pueden acceder desde cualquier navegador en la red')
console.log('💾 BD en memoria - Los datos persisten mientras el servidor esté activo')
