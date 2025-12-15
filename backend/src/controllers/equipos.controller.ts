import { query } from '../config/database'
import { Equipo } from '../types'

export class EquiposController {
  // Obtener equipos con filtros
  async getEquipos(filters?: {
    tipo?: string
    estado?: string
    archivado?: boolean
    search?: string
    limit?: number
    page?: number
  }) {
    let sql = `
            SELECT e.*,
                   c.nombre_completo as colaborador_nombre,
                   ct.nombre as centro_trabajo_nombre
            FROM vista_equipos_activos e
            WHERE 1=1
        `
    const params: any[] = []

    if (filters) {
      if (filters.tipo) {
        sql += ' AND e.tipo = ?'
        params.push(filters.tipo)
      }
      if (filters.estado) {
        sql += ' AND e.estado = ?'
        params.push(filters.estado)
      }
      if (filters.archivado !== undefined) {
        sql = `
                    SELECT e.*,
                           c.nombre_completo as colaborador_nombre,
                           ct.nombre as centro_trabajo_nombre
                    FROM equipos e
                    LEFT JOIN colaboradores c ON e.colaborador_id = c.id
                    LEFT JOIN centros_trabajo ct ON e.centro_trabajo_id = ct.id
                    WHERE e.archivado = ?
                `
        params.unshift(filters.archivado ? 1 : 0)
      }
      if (filters.search) {
        sql +=
          ' AND (e.etiqueta_inventario LIKE ? OR e.marca LIKE ? OR e.modelo LIKE ? OR e.numero_serie LIKE ?)'
        const searchTerm = `%${filters.search}%`
        params.push(searchTerm, searchTerm, searchTerm, searchTerm)
      }
    }

    sql += ' ORDER BY e.fecha_registro DESC'

    // Paginación
    if (filters?.limit) {
      sql += ' LIMIT ?'
      params.push(filters.limit)

      if (filters?.page) {
        const offset = (filters.page - 1) * filters.limit
        sql += ' OFFSET ?'
        params.push(offset)
      }
    }

    return await query(sql, params)
  }

  // Obtener equipo por ID
  async getEquipoById(id: number) {
    const resultados = (await query(
      `SELECT e.*,
                    c.nombre_completo as colaborador_nombre,
                    ct.nombre as centro_trabajo_nombre
             FROM equipos e
             LEFT JOIN colaboradores c ON e.colaborador_id = c.id
             LEFT JOIN centros_trabajo ct ON e.centro_trabajo_id = ct.id
             WHERE e.id = ?`,
      [id],
    )) as any[]

    return resultados[0] || null
  }

  // Crear nuevo equipo
  async createEquipo(equipo: Equipo, usuarioId: number): Promise<number> {
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
    const camposOpcionales: Record<string, any> = {
      etiqueta_inventario: equipo.etiqueta_inventario,
      numero_serie: equipo.numero_serie,
      colaborador_id: equipo.colaborador_id,
      centro_trabajo_id: equipo.centro_trabajo_id,
      en_uso: equipo.en_uso ? 1 : 0,
      procesador: equipo.procesador,
      ram_gb: equipo.ram_gb,
      almacenamiento_gb: equipo.almacenamiento_gb,
      tipo_almacenamiento: equipo.tipo_almacenamiento,
      direccion_ip: equipo.direccion_ip,
      observaciones: equipo.observaciones,
    }

    Object.entries(camposOpcionales).forEach(([campo, valor]) => {
      if (valor !== undefined && valor !== null && valor !== '') {
        campos.push(campo)
        valores.push(valor)
        placeholders.push('?')
      }
    })

    const sql = `INSERT INTO equipos (${campos.join(', ')}) VALUES (${placeholders.join(', ')})`
    const result = (await query(sql, valores)) as any

    return result.insertId
  }

  // Actualizar equipo
  async updateEquipo(id: number, equipo: Partial<Equipo>): Promise<boolean> {
    const updates: string[] = []
    const valores: any[] = []

    const camposPermitidos: Record<string, any> = {
      marca: equipo.marca,
      modelo: equipo.modelo,
      estado: equipo.estado,
      ubicacion: equipo.ubicacion,
      colaborador_id: equipo.colaborador_id,
      centro_trabajo_id: equipo.centro_trabajo_id,
      en_uso: equipo.en_uso !== undefined ? (equipo.en_uso ? 1 : 0) : undefined,
      procesador: equipo.procesador,
      ram_gb: equipo.ram_gb,
      observaciones: equipo.observaciones,
      archivado: equipo.archivado !== undefined ? (equipo.archivado ? 1 : 0) : undefined,
    }

    Object.entries(camposPermitidos).forEach(([campo, valor]) => {
      if (valor !== undefined && valor !== null) {
        updates.push(`${campo} = ?`)
        valores.push(valor)
      }
    })

    if (updates.length === 0) {
      return false
    }

    valores.push(id)
    const sql = `UPDATE equipos SET ${updates.join(', ')}, actualizado_en = NOW() WHERE id = ?`

    const result = (await query(sql, valores)) as any
    return result.affectedRows > 0
  }

  // Archivar equipo (solo admin)
  async archiveEquipo(id: number): Promise<boolean> {
    const result = (await query(
      'UPDATE equipos SET archivado = 1, actualizado_en = NOW() WHERE id = ?',
      [id],
    )) as any

    return result.affectedRows > 0
  }

  // Obtener estadísticas para dashboard
  async getDashboardStats() {
    const stats = (await query(`
            SELECT categoria, valor FROM vista_dashboard
        `)) as any[]

    // Convertir a objeto
    const statsObj: Record<string, number> = {}
    stats.forEach((stat) => {
      statsObj[stat.categoria] = parseInt(stat.valor)
    })

    return statsObj
  }

  // Obtear equipos por tipo para gráficos
  async getEquiposByType() {
    return await query(`
            SELECT
                tipo,
                COUNT(*) as total
            FROM equipos
            WHERE archivado = 0
            GROUP BY tipo
            ORDER BY total DESC
        `)
  }

  // Obtener tipos de equipo únicos
  async getTiposEquipo() {
    const resultados = (await query('SELECT DISTINCT tipo FROM equipos ORDER BY tipo')) as any[]

    return resultados.map((r) => r.tipo)
  }

  // Obtener estados únicos
  async getEstadosEquipo() {
    const resultados = (await query('SELECT DISTINCT estado FROM equipos ORDER BY estado')) as any[]

    return resultados.map((r) => r.estado)
  }
}
