import express from 'express'
import pool from '../config/database'

const router = express.Router()

// Obtener todos los equipos (con filtros)
router.get('/', async (req, res) => {
  try {
    const { tipo, estado, archivado, centro_trabajo_id } = req.query
    let query = `
      SELECT e.*,
             c.nombre_completo as colaborador_nombre,
             ct.nombre as centro_trabajo_nombre
      FROM equipos e
      LEFT JOIN colaboradores c ON e.colaborador_id = c.id
      LEFT JOIN centros_trabajo ct ON e.centro_trabajo_id = ct.id
      WHERE 1=1
    `

    const params: any[] = []

    if (tipo) {
      query += ' AND e.tipo = ?'
      params.push(tipo)
    }

    if (estado) {
      query += ' AND e.estado = ?'
      params.push(estado)
    }

    if (archivado !== undefined) {
      query += ' AND e.archivado = ?'
      params.push(archivado === 'true' ? 1 : 0)
    }

    if (centro_trabajo_id) {
      query += ' AND e.centro_trabajo_id = ?'
      params.push(centro_trabajo_id)
    }

    query += ' ORDER BY e.fecha_registro DESC'

    const [equipos]: any = await pool.execute(query, params)
    res.json(equipos)
  } catch (error) {
    console.error('Error obteniendo equipos:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Crear nuevo equipo
router.post('/', async (req, res) => {
  try {
    const equipo = req.body
    const usuarioId = req.user?.id // Asumiendo middleware de autenticación

    // Construir query dinámica basada en tipo de equipo
    const campos = []
    const valores = []
    const placeholders = []

    // Campos comunes
    const camposComunes = [
      'tipo',
      'etiqueta_inventario',
      'marca',
      'modelo',
      'numero_serie',
      'estado',
      'en_uso',
      'colaborador_id',
      'ubicacion',
      'centro_trabajo_id',
      'observaciones',
      'creado_por',
    ]

    camposComunes.forEach((campo) => {
      if (equipo[campo] !== undefined) {
        campos.push(campo)
        valores.push(equipo[campo])
        placeholders.push('?')
      }
    })

    // Campos específicos por tipo
    const camposPorTipo: Record<string, string[]> = {
      computadora: [
        'procesador',
        'ram_gb',
        'almacenamiento_gb',
        'tipo_almacenamiento',
        'direccion_ip',
        'direccion_mac',
        'sistema_operativo',
      ],
      telefono_fijo: ['extension'],
      celular: ['numero_telefono', 'imei', 'plan_datos'],
      monitor: ['tamaño_pulgadas', 'resolucion', 'puertos'],
      camara: ['tipo_camara', 'resolucion_mp', 'direccion_ip_camara'],
      tablet: ['dimension_pulgadas', 'capacidad_gb', 'version_android'],
      terminal: ['version_android_terminal'],
      otro: ['tipo_especifico', 'campo_extra'],
    }

    const camposEspecificos = camposPorTipo[equipo.tipo] || []
    camposEspecificos.forEach((campo) => {
      if (equipo[campo] !== undefined) {
        campos.push(campo)
        valores.push(equipo[campo])
        placeholders.push('?')
      }
    })

    const query = `INSERT INTO equipos (${campos.join(', ')}) VALUES (${placeholders.join(', ')})`
    const [result]: any = await pool.execute(query, valores)

    // Obtener equipo creado
    const [nuevoEquipo]: any = await pool.execute('SELECT * FROM equipos WHERE id = ?', [
      result.insertId,
    ])

    res.status(201).json({
      mensaje: 'Equipo creado exitosamente',
      equipo: nuevoEquipo[0],
    })
  } catch (error) {
    console.error('Error creando equipo:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Actualizar equipo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const equipo = req.body

    // Construir query dinámica
    const updates = []
    const valores = []

    Object.keys(equipo).forEach((key) => {
      if (key !== 'id') {
        updates.push(`${key} = ?`)
        valores.push(equipo[key])
      }
    })

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay datos para actualizar' })
    }

    valores.push(id)

    const query = `UPDATE equipos SET ${updates.join(', ')} WHERE id = ?`
    await pool.execute(query, valores)

    res.json({ mensaje: 'Equipo actualizado exitosamente' })
  } catch (error) {
    console.error('Error actualizando equipo:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Archivar equipo
router.patch('/:id/archivar', async (req, res) => {
  try {
    const { id } = req.params

    await pool.execute(
      'UPDATE equipos SET archivado = 1, actualizado_en = CURRENT_TIMESTAMP WHERE id = ?',
      [id],
    )

    res.json({ mensaje: 'Equipo archivado exitosamente' })
  } catch (error) {
    console.error('Error archivando equipo:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

export default router
