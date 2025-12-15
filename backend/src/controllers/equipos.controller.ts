import { query } from '../config/database'
import { Equipo, ApiResponse } from '../types'

export class EquiposController {
  async getEquipos(filters?: {
    tipo?: string
    estado?: string
    archivado?: boolean
    search?: string
  }): Promise<Equipo[]> {
    let sql = `
            SELECT e.*,
                   c.nombre_completo as colaborador_nombre,
                   ct.nombre as centro_trabajo_nombre
            FROM equipos e
            LEFT JOIN colaboradores c ON e.colaborador_id = c.id
            LEFT JOIN centros_trabajo ct ON e.centro_trabajo_id = ct.id
            WHERE 1=1
        `

    const params: any[] = []

    if (filters?.archivado !== undefined) {
      sql += ' AND e.archivado = ?'
      params.push(filters.archivado ? 1 : 0)
    } else {
      sql += ' AND e.archivado = 0' // Por defecto solo activos
    }

    if (filters?.tipo) {
      sql += ' AND e.tipo = ?'
      params.push(filters.tipo)
    }

    if (filters?.estado) {
      sql += ' AND e.estado = ?'
      params.push(filters.estado)
    }

    if (filters?.search) {
      sql +=
        ' AND (e.etiqueta_inventario LIKE ? OR e.marca LIKE ? OR e.modelo LIKE ? OR e.numero_serie LIKE ?)'
      const searchTerm = `%${filters.search}%`
      params.push(searchTerm, searchTerm, searchTerm, searchTerm)
    }

    sql += ' ORDER BY e.fecha_registro DESC'

    return (await query(sql, params)) as Equipo[]
  }

  async getEquipoById(id: number): Promise<Equipo | null> {
    const resultados = (await query(
      `SELECT e.*,
                    c.nombre_completo as colaborador_nombre,
                    ct.nombre as centro_trabajo_nombre
             FROM equipos e
             LEFT JOIN colaboradores c ON e.colaborador_id = c.id
             LEFT JOIN centros_trabajo ct ON e.centro_trabajo_id = ct.id
             WHERE e.id = ?`,
      [id],
    )) as Equipo[]

    return resultados[0] || null
  }

  async createEquipo(equipo: Equipo, usuarioId: number): Promise<ApiResponse<{ id: number }>> {
    try {
      const campos: string[] = []
      const valores: any[] = []
      const placeholders: string[] = []

      // Campos obligatorios
      const camposBase = ['tipo', 'marca', 'modelo', 'estado', 'ubicacion', 'creado_por']

      camposBase.forEach((campo) => {
        campos.push(campo)
        placeholders.push('?')
      })

      valores.push(
        equipo.tipo,
        equipo.marca,
        equipo.modelo,
        equipo.estado || 'Activo',
        equipo.ubicacion,
        usuarioId,
      )

      // Campos opcionales
      if (equipo.etiqueta_inventario) {
        campos.push('etiqueta_inventario')
        valores.push(equipo.etiqueta_inventario)
        placeholders.push('?')
      }

      if (equipo.numero_serie) {
        campos.push('numero_serie')
        valores.push(equipo.numero_serie)
        placeholders.push('?')
      }

      if (equipo.colaborador_id) {
        campos.push('colaborador_id')
        valores.push(equipo.colaborador_id)
        placeholders.push('?')
      }

      if (equipo.centro_trabajo_id) {
        campos.push('centro_trabajo_id')
        valores.push(equipo.centro_trabajo_id)
        placeholders.push('?')
      }

      if (equipo.observaciones) {
        campos.push('observaciones')
        valores.push(equipo.observaciones)
        placeholders.push('?')
      }

      const sql = `INSERT INTO equipos (${campos.join(', ')}) VALUES (${placeholders.join(', ')})`
      const result = (await query(sql, valores)) as any

      return {
        success: true,
        data: { id: result.insertId },
        message: 'Equipo creado exitosamente',
      }
    } catch (error: any) {
      console.error('Error creando equipo:', error)
      return {
        success: false,
        error: error.message || 'Error al crear equipo',
      }
    }
  }

  async updateEquipo(id: number, equipo: Partial<Equipo>): Promise<ApiResponse> {
    try {
      const updates: string[] = []
      const valores: any[] = []

      const camposPermitidos = [
        'marca',
        'modelo',
        'estado',
        'ubicacion',
        'colaborador_id',
        'centro_trabajo_id',
        'observaciones',
        'en_uso',
        'archivado',
      ]

      camposPermitidos.forEach((campo) => {
        if (equipo[campo as keyof Equipo] !== undefined) {
          updates.push(`${campo} = ?`)

          // Convertir booleanos a 0/1 para MariaDB
          const valor = equipo[campo as keyof Equipo]
          if (typeof valor === 'boolean') {
            valores.push(valor ? 1 : 0)
          } else {
            valores.push(valor)
          }
        }
      })

      if (updates.length === 0) {
        return {
          success: false,
          error: 'No hay campos para actualizar',
        }
      }

      valores.push(id)

      const sql = `UPDATE equipos SET ${updates.join(', ')}, actualizado_en = NOW() WHERE id = ?`
      const result = (await query(sql, valores)) as any

      if (result.affectedRows === 0) {
        return {
          success: false,
          error: 'Equipo no encontrado',
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
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    try {
      const stats = (await query('SELECT * FROM vista_dashboard')) as any[]
      const porTipo = (await query(
        'SELECT tipo, COUNT(*) as total FROM equipos WHERE archivado = 0 GROUP BY tipo',
      )) as any[]

      // Convertir a objeto
      const statsObj: Record<string, number> = {}
      stats.forEach((stat) => {
        statsObj[stat.categoria] = parseInt(stat.valor)
      })

      return {
        success: true,
        data: {
          stats: statsObj,
          porTipo,
        },
      }
    } catch (error: any) {
      console.error('Error obteniendo estadísticas:', error)
      return {
        success: false,
        error: 'Error al obtener estadísticas',
      }
    }
  }
}
