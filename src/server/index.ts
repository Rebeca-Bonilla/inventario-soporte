import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { equipos } from './db/schema'
import { eq } from 'drizzle-orm'

// Configuración de la base de datos
const client = createClient({
  url: 'file:./inventario.db',
})

const db = drizzle(client)

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    }),
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Sistema de Inventario API',
          version: '1.0.0',
          description: 'API para gestión de inventario de equipos',
        },
      },
    }),
  )

// Schemas para validación
const equipoBodySchema = t.Object({
  tipo: t.String(),
  centroTrabajo: t.String(),
  marca: t.String(),
  modelo: t.String(),
  numeroSerie: t.String(),
  estado: t.Optional(t.String()),
  colaborador: t.Optional(t.String()),
  ubicacion: t.String(),
  observaciones: t.Optional(t.String()),
  ram: t.Optional(t.String()),
  almacenamiento: t.Optional(t.String()),
  procesador: t.Optional(t.String()),
})

const equipoUpdateSchema = t.Object({
  tipo: t.Optional(t.String()),
  centroTrabajo: t.Optional(t.String()),
  marca: t.Optional(t.String()),
  modelo: t.Optional(t.String()),
  numeroSerie: t.Optional(t.String()),
  estado: t.Optional(t.String()),
  colaborador: t.Optional(t.String()),
  ubicacion: t.Optional(t.String()),
  observaciones: t.Optional(t.String()),
  ram: t.Optional(t.String()),
  almacenamiento: t.Optional(t.String()),
  procesador: t.Optional(t.String()),
})

// Health check
app.get('/', () => ({
  message: '🚀 API Sistema de Inventario funcionando',
  timestamp: new Date().toISOString(),
}))

// Auth routes
app.post(
  '/auth/login',
  ({ body, set }) => {
    const { username, password } = body

    const users = [
      {
        id: '1',
        username: 'admin',
        password: 'admin123',
        name: 'Administrador',
        email: 'admin@empresa.com',
        role: 'admin',
      },
      {
        id: '2',
        username: 'user',
        password: 'user',
        name: 'Usuario Regular',
        email: 'user@empresa.com',
        role: 'user',
      },
    ]

    const user = users.find((u) => u.username === username && u.password === password)

    if (!user) {
      set.status = 401
      return { error: 'Usuario o contraseña incorrectos' }
    }

    const { password: _, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      token: `fake-jwt-token-${user.id}`,
      message: 'Login exitoso',
    }
  },
  {
    body: t.Object({
      username: t.String({ minLength: 1 }),
      password: t.String({ minLength: 1 }),
    }),
  },
)

app.post('/auth/logout', () => ({
  message: 'Sesión cerrada exitosamente',
}))

app.get('/auth/me', ({ headers }) => {
  const authHeader = headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer fake-jwt-token-')) {
    return { user: null }
  }

  const userId = authHeader.replace('Bearer fake-jwt-token-', '')
  const users = [
    {
      id: '1',
      username: 'admin',
      name: 'Administrador',
      email: 'admin@empresa.com',
      role: 'admin',
    },
    { id: '2', username: 'user', name: 'Usuario Regular', email: 'user@empresa.com', role: 'user' },
  ]

  const user = users.find((u) => u.id === userId)
  return { user: user || null }
})

// Equipos routes con BASE DE DATOS REAL
app.get('/equipos', async ({ query }) => {
  try {
    const { page = '1', limit = '50', tipo, estado, search } = query

    // Obtener equipos de la base de datos REAL
    const equiposReales = await db.select().from(equipos)

    // Filtrar datos
    let datosFiltrados = equiposReales

    if (tipo) {
      datosFiltrados = datosFiltrados.filter((e) => e.tipo === tipo)
    }

    if (estado) {
      datosFiltrados = datosFiltrados.filter((e) => e.estado === estado)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      datosFiltrados = datosFiltrados.filter(
        (e) =>
          e.modelo?.toLowerCase().includes(searchLower) ||
          e.marca?.toLowerCase().includes(searchLower) ||
          e.numeroSerie?.toLowerCase().includes(searchLower),
      )
    }

    // Paginación
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const datosPaginados = datosFiltrados.slice(startIndex, endIndex)

    return {
      data: datosPaginados,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: datosFiltrados.length,
        totalPages: Math.ceil(datosFiltrados.length / limitNum),
      },
    }
  } catch (error) {
    console.error('Error obteniendo equipos:', error)
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      },
    }
  }
})

app.get('/equipos/:id', async ({ params: { id } }) => {
  try {
    const [equipo] = await db.select().from(equipos).where(eq(equipos.id, id))

    if (!equipo) {
      throw new Error('Equipo no encontrado')
    }

    return equipo
  } catch (error) {
    console.error('Error obteniendo equipo:', error)
    throw new Error('Error al obtener el equipo')
  }
})

// CREATE - Crear nuevo equipo en BD REAL
app.post(
  '/equipos',
  async ({ body, set }) => {
    try {
      const [nuevoEquipo] = await db
        .insert(equipos)
        .values({
          id: crypto.randomUUID(),
          ...body,
          fechaRegistro: new Date(),
          archivido: false,
        })
        .returning()

      set.status = 201
      return {
        equipo: nuevoEquipo,
        message: 'Equipo creado exitosamente',
      }
    } catch (error) {
      console.error('Error creando equipo:', error)
      set.status = 500
      return { error: 'Error al crear el equipo' }
    }
  },
  {
    body: equipoBodySchema,
  },
)

// UPDATE - Actualizar equipo existente en BD REAL
app.put(
  '/equipos/:id',
  async ({ params: { id }, body }) => {
    try {
      const [equipoActualizado] = await db
        .update(equipos)
        .set({
          ...body,
          fechaActualizacion: new Date(),
        })
        .where(eq(equipos.id, id))
        .returning()

      if (!equipoActualizado) {
        throw new Error('Equipo no encontrado')
      }

      return {
        equipo: equipoActualizado,
        message: 'Equipo actualizado exitosamente',
      }
    } catch (error) {
      console.error('Error actualizando equipo:', error)
      throw new Error('Error al actualizar el equipo')
    }
  },
  {
    body: equipoUpdateSchema,
  },
)

// ARCHIVE - Archivar equipo en BD REAL
app.patch('/equipos/:id/archive', async ({ params: { id } }) => {
  try {
    const [equipoArchivado] = await db
      .update(equipos)
      .set({
        archivido: true,
        fechaActualizacion: new Date(),
      })
      .where(eq(equipos.id, id))
      .returning()

    if (!equipoArchivado) {
      throw new Error('Equipo no encontrado')
    }

    return {
      equipo: equipoArchivado,
      message: 'Equipo archivado exitosamente',
    }
  } catch (error) {
    console.error('Error archivando equipo:', error)
    throw new Error('Error al archivar el equipo')
  }
})

// Manejo de errores
app.onError(({ code, error, set }) => {
  console.error('Error:', error)

  if (code === 'VALIDATION') {
    set.status = 400
    return { error: 'Datos inválidos', detalles: error.message }
  }

  if (code === 'NOT_FOUND') {
    set.status = 404
    return { error: 'Recurso no encontrado' }
  }

  set.status = 500
  return { error: 'Error interno del servidor' }
})

app.listen(3000)

console.log('🚀 Backend ejecutándose en http://localhost:3000')
console.log('📚 Documentación en http://localhost:3000/swagger')
console.log('🏠 Health check en http://localhost:3000/')

export type App = typeof app
