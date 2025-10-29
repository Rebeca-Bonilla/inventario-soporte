// src/types/equipos.ts

// Interfaz base que todos los equipos comparten
export interface EquipoBase {
  id?: string
  tipo: string
  usuario: string
  codigo: string
  centroTrabajo: string
  marca: string
  modelo: string
  nSerie: string
  estado: string
  colaborador: string
  ubicacion: string
  observaciones: string
  fechaRegistro: string
}

// Equipo de cómputo (Laptops, PCs)
export interface Computo extends EquipoBase {
  ram: string
  almacenamiento: string
  procesador: string
  direccionMac?: string
}

// Teléfonos
export interface Telefono extends EquipoBase {
  numeroCelular: string
}

// Monitores
export interface Monitor extends EquipoBase {
  dimension: string
  puertosDisponibles: string
}

// Cámaras
export interface Camara extends EquipoBase {
  tipoCamara: string
  lente: string
  conectividad: string
  direccionMacIp: string
}

// Tablets
export interface Tablet extends EquipoBase {
  versionAndroid: string
}

// Terminales
export interface Terminal extends EquipoBase {
  tipoTerminal: string
}

// Otros equipos
export interface Otro extends EquipoBase {
  tipoEquipo: string
}

// Unión de todos los tipos posibles
export type Equipo = Computo | Telefono | Monitor | Camara | Tablet | Terminal | Otro

// Tipo para el selector de equipos
export type TipoEquipo =
  | 'computo'
  | 'telefono'
  | 'monitor'
  | 'camara'
  | 'tablet'
  | 'terminal'
  | 'otro'
