export interface Usuario {
  id: number
  username: string
  password: string
  nombre_completo: string
  rol: 'admin' | 'usuario'
  activo: boolean
}

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
  procesador?: string
  ram_gb?: number
  almacenamiento_gb?: number
  tipo_almacenamiento?: string
  direccion_ip?: string
  direccion_mac?: string
  sistema_operativo?: string
  numero_telefono?: string
  imei?: string
  extension?: string
  plan_datos?: string
  tamaño_pulgadas?: number
  resolucion?: string
  puertos?: string
  tipo_camara?: string
  resolucion_mp?: number
  direccion_ip_camara?: string
  dimension_pulgadas?: number
  capacidad_gb?: number
  version_android?: string
  version_android_terminal?: string
  tipo_especifico?: string
  campo_extra?: string
  fecha_compra?: string
  costo?: number
  fecha_fin_garantia?: string
  observaciones?: string
  creado_por?: number
  fecha_registro?: string
  colaborador_nombre?: string
  centro_trabajo_nombre?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
