import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/database'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'secreto-temporal-cambiar-en-produccion'

// Login con tu BD
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Buscar usuario en BD
    const [rows]: any = await pool.execute(
      'SELECT * FROM usuarios WHERE username = ? AND activo = 1',
      [username],
    )

    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Usuario o contraseña incorrectos',
      })
    }

    const usuario = rows[0]

    // Verificar contraseña (TEXT plana en tu BD - temporal)
    // IMPORTANTE: En producción, cambiar password por hash
    if (password !== usuario.password) {
      return res.status(401).json({
        error: 'Usuario o contraseña incorrectos',
      })
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        username: usuario.username,
        rol: usuario.rol,
        nombre: usuario.nombre_completo,
      },
      JWT_SECRET,
      { expiresIn: '8h' },
    )

    // NO devolver la contraseña
    const { password: _, ...usuarioSinPassword } = usuario

    res.json({
      token,
      usuario: usuarioSinPassword,
      mensaje: 'Login exitoso',
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Crear usuario (solo admin)
router.post('/usuarios/crear', async (req, res) => {
  const { username, password, nombre_completo, rol } = req.body

  try {
    // Validaciones
    if (!username || !password || !nombre_completo || !rol) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
    }

    // Verificar si el usuario ya existe
    const [existing]: any = await pool.execute('SELECT id FROM usuarios WHERE username = ?', [
      username,
    ])

    if (existing.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' })
    }

    // Insertar nuevo usuario
    const [result]: any = await pool.execute(
      `INSERT INTO usuarios
       (username, password, nombre_completo, rol, activo)
       VALUES (?, ?, ?, ?, 1)`,
      [username, password, nombre_completo, rol],
    )

    // Obtener usuario creado
    const [newUser]: any = await pool.execute(
      'SELECT id, username, nombre_completo, rol, creado_en FROM usuarios WHERE id = ?',
      [result.insertId],
    )

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: newUser[0],
    })
  } catch (error) {
    console.error('Error creando usuario:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

// Listar usuarios (solo admin)
router.get('/usuarios/listar', async (req, res) => {
  try {
    const [usuarios]: any = await pool.execute(
      'SELECT id, username, nombre_completo, rol, activo, creado_en FROM usuarios ORDER BY id DESC',
    )

    res.json(usuarios)
  } catch (error) {
    console.error('Error listando usuarios:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

export default router
