import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'secreto-temporal'

// Base de datos temporal (reemplazar con BD real)
const usuarios = [
  {
    id: 1,
    username: 'admin',
    // Contraseña: "admin123" hasheada
    password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.Kn1k2qz1LqG6QY6YJ7Yb8e9qGZJjW6',
    nombre: 'Administrador Principal',
    rol: 'admin',
    activo: true,
  },
]

// 1. Endpoint para CREAR usuarios (solo admin)
router.post('/crear', (req, res) => {
  const { username, password, nombre, rol } = req.body

  // Validaciones
  if (!username || !password || !nombre || !rol) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
  }

  // Verificar si el usuario ya existe
  if (usuarios.find((u) => u.username === username)) {
    return res.status(400).json({ error: 'El nombre de usuario ya existe' })
  }

  // Hashear la contraseña
  const salt = bcrypt.genSaltSync(10)
  const password_hash = bcrypt.hashSync(password, salt)

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: usuarios.length + 1,
    username,
    password_hash,
    nombre,
    rol: ['admin', 'tecnico', 'consulta'].includes(rol) ? rol : 'tecnico',
    activo: true,
  }

  usuarios.push(nuevoUsuario)

  // NO devolver el hash en la respuesta
  const { password_hash: _, ...usuarioSinPassword } = nuevoUsuario
  res.status(201).json({
    mensaje: 'Usuario creado exitosamente',
    usuario: usuarioSinPassword,
  })
})

// 2. Endpoint para LISTAR usuarios (solo admin)
router.get('/listar', (req, res) => {
  // En producción, verificar token de admin aquí
  const usuariosSinPassword = usuarios.map((u) => {
    const { password_hash, ...usuarioSinPassword } = u
    return usuarioSinPassword
  })
  res.json(usuariosSinPassword)
})

// 3. Login mejorado
router.post('/login', (req, res) => {
  const { username, password } = req.body

  const usuario = usuarios.find((u) => u.username === username && u.activo)

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales incorrectas' })
  }

  // Verificar contraseña
  const passwordValida = bcrypt.compareSync(password, usuario.password_hash)

  if (!passwordValida) {
    return res.status(401).json({ error: 'Credenciales incorrectas' })
  }

  // Crear token JWT
  const token = jwt.sign(
    {
      id: usuario.id,
      username: usuario.username,
      rol: usuario.rol,
      nombre: usuario.nombre,
    },
    JWT_SECRET,
    { expiresIn: '8h' },
  )

  // NO devolver el hash
  const { password_hash, ...usuarioSinPassword } = usuario

  res.json({
    token,
    usuario: usuarioSinPassword,
    mensaje: 'Login exitoso',
  })
})

export default router
