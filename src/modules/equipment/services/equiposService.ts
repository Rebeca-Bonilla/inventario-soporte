import api from '@/services/api'

export interface Equipo {
  id?: number
  tipo: string
  etiqueta_inventario?: string
  marca: string
  modelo: string
  numero_serie?: string
  estado: string
  en_uso: boolean
  archivado: boolean
  colaborador_id?: number
  ubicacion: string
  centro_trabajo_id?: number
  observaciones?: string
  fecha_registro?: string
  colaborador_nombre?: string
  centro_trabajo_nombre?: string
}

export interface FiltrosEquipos {
  tipo?: string
  estado?: string
  archivado?: boolean
  search?: string
}

export const equiposService = {
  // Obtener equipos
  async getEquipos(filtros: FiltrosEquipos = {}) {
    const params: Record<string, any> = {}

    if (filtros.tipo) params.tipo = filtros.tipo
    if (filtros.estado) params.estado = filtros.estado
    if (filtros.archivado !== undefined) params.archivado = filtros.archivado
    if (filtros.search) params.search = filtros.search

    return await api.get('/equipos', { params })
  },

  // Obtener equipo por ID
  async getEquipoById(id: number) {
    return await api.get(`/equipos/${id}`)
  },

  // Crear nuevo equipo
  async createEquipo(equipo: Equipo) {
    return await api.post('/equipos', equipo)
  },

  // Actualizar equipo
  async updateEquipo(id: number, equipo: Partial<Equipo>) {
    return await api.put(`/equipos/${id}`, equipo)
  },

  // Archivar equipo (solo admin)
  async archiveEquipo(id: number) {
    return await api.put(`/equipos/${id}/archive`)
  },

  // Obtener estadÃ­sticas
  async getDashboardStats() {
    return {
      success: true,
      data: {
        stats: {
          'Total Equipos': 2,
          'Equipos Activos': 2,
          'En ReparaciÃ³n': 0,
          Asignados: 1,
          'Sin Asignar': 1,
        },
        porTipo: [
          { tipo: 'computadora', total: 1 },
          { tipo: 'monitor', total: 1 },
        ],
      },
    }
  },
}
