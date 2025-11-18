import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const equipos = sqliteTable('equipos', {
  id: text('id').primaryKey(),
  tipo: text('tipo').notNull(),
  centroTrabajo: text('centro_trabajo').notNull(),
  marca: text('marca').notNull(),
  modelo: text('modelo').notNull(),
  numeroSerie: text('numero_serie').notNull(),
  codigoInventario: text('codigo_inventario'),
  ram: text('ram'),
  almacenamiento: text('almacenamiento'),
  procesador: text('procesador'),
  estado: text('estado').default('activo'),
  colaborador: text('colaborador'),
  ubicacion: text('ubicacion').notNull(),
  observaciones: text('observaciones'),
  archivido: integer('archivido', { mode: 'boolean' }).default(false),
  fechaRegistro: integer('fecha_registro', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  fechaActualizacion: integer('fecha_actualizacion', { mode: 'timestamp' }).$defaultFn(
    () => new Date(),
  ),
})
