const API_BASE_URL = 'http://localhost/inventario-soporte-api'

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
        ? `${API_BASE_URL}/api.php?categoria=${encodeURIComponent(categoria)}`
        : `${API_BASE_URL}/api.php`

      console.log('🔍 Fetching URL:', url)

      const response = await fetch(url)
      const data = await response.json()

      console.log('📨 API Response:', data)

      if (!data.success) {
        throw new Error(data.error || 'Error al obtener equipos')
      }

      return data.data
    } catch (error) {
      console.error('❌ Error fetching equipos:', error)
      throw error
    }
  },

  async crearEquipo(equipoData: EquipoData) {
    try {
      console.log('🚀 Enviando equipo:', equipoData)

      const response = await fetch(`${API_BASE_URL}/api.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipoData),
      })

      const data = await response.json()
      console.log('📨 Respuesta creación:', data)

      if (!data.success) {
        throw new Error(data.error || 'Error al crear equipo')
      }

      return data
    } catch (error) {
      console.error('❌ Error creating equipo:', error)
      throw error
    }
  },
}
