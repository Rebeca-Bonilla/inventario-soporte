import { api } from './api'
import type { Equipo } from '../types/equipos'

export const equiposService = {
  // Guardar en localStorage (guardado temporal)
  saveToLocal(equipo: Equipo): void {
    const localEquipos = this.getLocalEquipos()
    localEquipos.push(equipo)
    localStorage.setItem('temp_equipos', JSON.stringify(localEquipos))
  },

  // Obtener equipos guardados localmente
  getLocalEquipos(): Equipo[] {
    const stored = localStorage.getItem('temp_equipos')
    return stored ? JSON.parse(stored) : []
  },

  // Limpiar equipos locales
  clearLocalEquipos(): void {
    localStorage.removeItem('temp_equipos')
  },

  // Guardar en BD
  async saveToDatabase(equipo: Equipo): Promise<void> {
    try {
      await api.post('/equipos', equipo)
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error)
      throw new Error('Error al guardar en la base de datos')
    }
  },

  // Archivar equipo (solo admin)
  async archiveEquipo(id: string): Promise<void> {
    try {
      await api.patch(`/equipos/${id}/archive`)
    } catch (error) {
      console.error('Error al archivar equipo:', error)
      throw new Error('Error al archivar equipo')
    }
  },

  // Obtener equipos de la BD
  async getEquipos(): Promise<Equipo[]> {
    try {
      const response = await api.get('/equipos')
      return response.data
    } catch (error) {
      console.error('Error al obtener equipos:', error)
      throw new Error('Error al obtener equipos')
    }
  },

  // Actualizar equipo
  async updateEquipo(id: string, equipo: Partial<Equipo>): Promise<void> {
    try {
      await api.put(`/equipos/${id}`, equipo)
    } catch (error) {
      console.error('Error al actualizar equipo:', error)
      throw new Error('Error al actualizar equipo')
    }
  },
}
