import api from '@/services/api'

export const dashboardService = {
  async getSummary() {
    try {
      const response = await api.get('/dashboard/summary')
      return response
    } catch (error) {
      console.error('Error obteniendo resumen:', error)
      return {
        totalEquipos: 0,
        equiposActivos: 0,
        enReparacion: 0,
        asignados: 0
      }
    }
  },

  async getRecentChanges() {
    try {
      const response = await api.get('/dashboard/recent-changes')
      return response
    } catch (error) {
      console.error('Error obteniendo cambios recientes:', error)
      return []
    }
  },

  async getAntivirusExpiring() {
    try {
      const response = await api.get('/dashboard/antivirus-expiring')
      return response
    } catch (error) {
      console.error('Error obteniendo antivirus por expirar:', error)
      return []
    }
  }
}