export interface Equipo {
  id?: string
  tipo: 'computo' | 'telefonos' | 'monitores' | 'camaras' | 'tablets' | 'terminales' | 'otros'
  marca: string
  modelo: string
  numeroSerie: string
  codigoInventario: string
  estado: 'activo' | 'mantenimiento' | 'baja'
  ubicacion: string
  fechaAdquisicion: string
  usuarioAsignado?: string
  departamento: string
  archivido: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface EquipoFilters {
  tipo?: string
  estado?: string
  departamento?: string
  usuarioAsignado?: string
}
