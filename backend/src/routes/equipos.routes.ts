import { Elysia, t } from 'elysia'
import { EquiposController } from '../controllers/equipos.controller'
import { authMiddleware } from '../middleware/auth'

const equiposController = new EquiposController()

export const equiposRoutes = new Elysia({ prefix: '/equipos' })
  .use(authMiddleware)

  // GET /equipos - Obtener todos los equipos
  .get(
    '/',
    async ({ query, user }) => {
      const filters = {
        tipo: query.tipo as string,
        estado: query.estado as string,
        archivado:
          query.archivado === 'true' ? true : query.archivado === 'false' ? false : undefined,
        search: query.search as string,
        limit: query.limit ? parseInt(query.limit as string) : undefined,
        page: query.page ? parseInt(query.page as string) : undefined,
      }

      const equipos = await equiposController.getEquipos(filters)
      return {
        success: true,
        data: equipos,
        user: user, // Para debugging
      }
    },
    {
      query: t.Object({
        tipo: t.Optional(t.String()),
        estado: t.Optional(t.String()),
        archivado: t.Optional(t.String()),
        search: t.Optional(t.String()),
        limit: t.Optional(t.String()),
        page: t.Optional(t.String()),
      }),
    },
  )

  // GET /equipos/activos - Solo equipos activos
  .get('/activos', async () => {
    const equipos = await equiposController.getEquipos({ archivado: false })
    return { success: true, data: equipos }
  })

  // GET /equipos/archivados - Solo equipos archivados
  .get('/archivados', async () => {
    const equipos = await equiposController.getEquipos({ archivado: true })
    return { success: true, data: equipos }
  })

  // GET /equipos/:id - Obtener equipo por ID
  .get(
    '/:id',
    async ({ params }) => {
      const equipo = await equiposController.getEquipoById(parseInt(params.id))

      if (!equipo) {
        return {
          success: false,
          error: 'Equipo no encontrado',
        }
      }

      return {
        success: true,
        data: equipo,
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )

  // POST /equipos - Crear nuevo equipo
  .post(
    '/',
    async ({ body, user }) => {
      try {
        const id = await equiposController.createEquipo(body as any, user.id)
        return {
          success: true,
          message: 'Equipo creado exitosamente',
          data: { id },
        }
      } catch (error: any) {
        console.error('Error creando equipo:', error)
        return {
          success: false,
          error: error.message || 'Error al crear equipo',
        }
      }
    },
    {
      body: t.Object({
        tipo: t.String(),
        marca: t.String(),
        modelo: t.String(),
        ubicacion: t.String(),
        etiqueta_inventario: t.Optional(t.String()),
        numero_serie: t.Optional(t.String()),
        estado: t.Optional(t.String()),
        colaborador_id: t.Optional(t.Number()),
        centro_trabajo_id: t.Optional(t.Number()),
        en_uso: t.Optional(t.Boolean()),
        observaciones: t.Optional(t.String()),
      }),
    },
  )

  // PUT /equipos/:id - Actualizar equipo
  .put(
    '/:id',
    async ({ params, body, user }) => {
      try {
        const updated = await equiposController.updateEquipo(parseInt(params.id), body as any)

        if (!updated) {
          return {
            success: false,
            error: 'No se realizaron cambios',
          }
        }

        return {
          success: true,
          message: 'Equipo actualizado exitosamente',
        }
      } catch (error: any) {
        console.error('Error actualizando equipo:', error)
        return {
          success: false,
          error: error.message || 'Error al actualizar equipo',
        }
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        marca: t.Optional(t.String()),
        modelo: t.Optional(t.String()),
        estado: t.Optional(t.String()),
        ubicacion: t.Optional(t.String()),
        colaborador_id: t.Optional(t.Number()),
        centro_trabajo_id: t.Optional(t.Number()),
        en_uso: t.Optional(t.Boolean()),
        observaciones: t.Optional(t.String()),
        archivado: t.Optional(t.Boolean()),
      }),
    },
  )

  // PUT /equipos/:id/archive - Archivar equipo (solo admin)
  .put(
    '/:id/archive',
    async ({ params, user }) => {
      if (user.rol !== 'admin') {
        return {
          success: false,
          error: 'Solo administradores pueden archivar equipos',
        }
      }

      const archived = await equiposController.archiveEquipo(parseInt(params.id))

      if (!archived) {
        return {
          success: false,
          error: 'Error al archivar equipo',
        }
      }

      return {
        success: true,
        message: 'Equipo archivado exitosamente',
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )

  // GET /equipos/stats/dashboard - Estadísticas
  .get('/stats/dashboard', async () => {
    try {
      const stats = await equiposController.getDashboardStats()
      const byType = await equiposController.getEquiposByType()
      const tipos = await equiposController.getTiposEquipo()
      const estados = await equiposController.getEstadosEquipo()

      return {
        success: true,
        data: {
          stats,
          byType,
          tipos,
          estados,
        },
      }
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error)
      return {
        success: false,
        error: 'Error al obtener estadísticas',
      }
    }
  })
