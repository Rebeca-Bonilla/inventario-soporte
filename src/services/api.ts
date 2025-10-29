const API_BASE_URL = 'http://localhost/inventario-soporte-api'

// Interface para los datos del equipo
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
    const url = categoria
      ? `${API_BASE_URL}/api.php?categoria=${categoria}`
      : `${API_BASE_URL}/api.php`

    const response = await fetch(url)
    return await response.json()
  },

  async crearEquipo(equipoData: EquipoData) {
    const response = await fetch(`${API_BASE_URL}/api.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipoData),
    })

    return await response.json()
  },
}
