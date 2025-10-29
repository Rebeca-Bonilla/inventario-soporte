import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api' // Cambia por tu backend

export interface Equipo {
  id?: number
  codigo: string
  usuario: string
  centroTrabajo: string
  marca: string
  modelo: string
  nSerie: string
  ram: string
  almacenamiento: string
  procesador: string
  numeroCelular: string
  dimension: string
  puertosDisponibles: string
  tipoCamara: string
  direccionMacIp: string
  estado: string
  colaborador: string
  ubicacion: string
  observaciones: string
  tipo: string
  fechaRegistro: string
}

export const equiposService = {
  // Guardar equipo en BD
  async guardarEquipo(equipo: Equipo): Promise<Equipo> {
    try {
      const response = await axios.post(`${API_BASE_URL}/equipos`, equipo)
      return response.data
    } catch (error) {
      console.error('Error guardando equipo:', error)
      throw new Error('No se pudo guardar el equipo')
    }
  },

  // Obtener todos los equipos (para consulta)
  async obtenerEquipos(): Promise<Equipo[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/equipos`)
      return response.data
    } catch (error) {
      console.error('Error obteniendo equipos:', error)
      throw new Error('No se pudieron obtener los equipos')
    }
  },

  // Actualizar equipo
  async actualizarEquipo(id: number, equipo: Equipo): Promise<Equipo> {
    try {
      const response = await axios.put(`${API_BASE_URL}/equipos/${id}`, equipo)
      return response.data
    } catch (error) {
      console.error('Error actualizando equipo:', error)
      throw new Error('No se pudo actualizar el equipo')
    }
  },

  // Eliminar equipo
  async eliminarEquipo(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/equipos/${id}`)
    } catch (error) {
      console.error('Error eliminando equipo:', error)
      throw new Error('No se pudo eliminar el equipo')
    }
  },
}
