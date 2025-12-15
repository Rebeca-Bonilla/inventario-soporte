import api from './api'

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
  page?: number
  limit?: number
}

export const equiposService = {
  // Obtener equipos con filtros
  async getEquipos(filtros: FiltrosEquipos = {}) {
    const params: Record<string, any> = {}

    if (filtros.tipo) params.tipo = filtros.tipo
    if (filtros.estado) params.estado = filtros.estado
    if (filtros.archivado !== undefined) params.archivado = filtros.archivado
    if (filtros.search) params.search = filtros.search
    if (filtros.page) params.page = filtros.page
    if (filtros.limit) params.limit = filtros.limit

    return await api.get('/equipos', { params })
  },

  // Obtener solo equipos activos
  async getEquiposActivos() {
    return await api.get('/equipos/activos')
  },

  // Obtener solo equipos archivados
  async getEquiposArchivados() {
    return await api.get('/equipos/archivados')
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

  // Archivar equipo
  async archiveEquipo(id: number) {
    return await api.put(`/equipos/${id}/archive`)
  },

  // Obtener estadísticas para dashboard
  async getDashboardStats() {
    return await api.get('/equipos/stats/dashboard')
  },

  // Tipos de equipo disponibles
  async getTiposEquipo() {
    const response = await this.getDashboardStats()
    return response.data.tipos || []
  },

  // Estados disponibles
  async getEstadosEquipo() {
    const response = await this.getDashboardStats()
    return response.data.estados || []
  },
}
