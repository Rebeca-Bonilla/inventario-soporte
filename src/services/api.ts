const API_BASE_URL = 'http://localhost:3000'

export interface EquipoData {
  categoria: string
  usuario: string
  centro_trabajo: string
  marca: string
  modelo: string
  numero_serie: string
  ram?: string
  almacenamiento?: string
  procesador?: string
  estado?: string
  colaborador?: string
  ubicacion?: string
  observaciones?: string
}

export const apiService = {
  async getEquipos(categoria?: string) {
    try {
      const url = categoria
        ? `${API_BASE_URL}/api/equipos?categoria=${encodeURIComponent(categoria)}`
        : `${API_BASE_URL}/api/equipos`

      console.log('🔍 Fetching URL:', url)

      const response = await fetch(url)
      const data = await response.json()

      console.log('📨 API Response:', data)
      return data
    } catch (error) {
      console.error('Error fetching equipos:', error)
      throw error
    }
  },

  async crearEquipo(equipoData: EquipoData) {
    try {
      console.log('Enviando equipo:', equipoData)

      const response = await fetch(`${API_BASE_URL}/api/equipos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipoData),
      })

      const data = await response.json()
      console.log('Respuesta creación:', data)
      return data
    } catch (error) {
      console.error('Error creating equipo:', error)
      throw error
    }
  },

  async actualizarEquipo(id: number, equipoData: Partial<EquipoData>) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/equipos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipoData),
      })
      return response.json()
    } catch (error) {
      console.error('Error updating equipo:', error)
      throw error
    }
  },

  async eliminarEquipo(id: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/equipos/${id}`, {
        method: 'DELETE',
      })
      return response.json()
    } catch (error) {
      console.error('Error deleting equipo:', error)
      throw error
    }
  },
}
