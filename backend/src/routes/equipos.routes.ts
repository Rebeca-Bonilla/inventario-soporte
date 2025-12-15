import { Elysia, t } from 'elysia'
import { EquiposController } from '../controllers/equipos.controller'
import { authMiddleware } from '../middleware/auth'

const equiposController = new EquiposController()

export const equiposRoutes = new Elysia({ prefix: '/equipos' })
  .use(authMiddleware)

  .get(
    '/',
    async ({ query, user }) => {
      const filters = {
        tipo: query.tipo as string,
        estado: query.estado as string,
        archivado:
          query.archivado === 'true' ? true : query.archivado === 'false' ? false : undefined,
        search: query.search as string,
      }

      try {
        const equipos = await equiposController.getEquipos(filters)
        return {
          success: true,
          data: equipos,
          user: user.username, // Para debug
        }
      } catch (error: any) {
        return {
          success: false,
          error: error.message,
        }
      }
    },
    {
      query: t.Object({
        tipo: t.Optional(t.String()),
        estado: t.Optional(t.String()),
        archivado: t.Optional(t.String()),
        search: t.Optional(t.String()),
      }),
    },
  )

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

  .post(
    '/',
    async ({ body, user }) => {
      return await equiposController.createEquipo(body as any, user.id)
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
        observaciones: t.Optional(t.String()),
      }),
    },
  )

  .put(
    '/:id',
    async ({ params, body }) => {
      return await equiposController.updateEquipo(parseInt(params.id), body as any)
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
        observaciones: t.Optional(t.String()),
        en_uso: t.Optional(t.Boolean()),
        archivado: t.Optional(t.Boolean()),
      }),
    },
  )
