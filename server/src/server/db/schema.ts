import bcrypt from 'bcryptjs'

export const initDatabase = (db: any) => {
  // Tabla de usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      email TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Tabla de equipos
  db.exec(`
    CREATE TABLE IF NOT EXISTS equipos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      marca TEXT,
      modelo TEXT,
      serial TEXT UNIQUE,
      estado TEXT DEFAULT 'activo',
      archivo BOOLEAN DEFAULT FALSE,
      datos TEXT,
      creado_por INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creado_por) REFERENCES usuarios (id)
    )
  `)

  // Insertar usuario admin por defecto
  const adminExists = db.prepare('SELECT id FROM usuarios WHERE username = ?').get('admin')
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10)
    db.prepare(
      `
      INSERT INTO usuarios (username, password_hash, name, email, role)
      VALUES (?, ?, ?, ?, 'admin')
    `,
    ).run('admin', hashedPassword, 'Administrador', 'admin@empresa.com')
  }

  // Insertar usuario de prueba
  const userExists = db.prepare('SELECT id FROM usuarios WHERE username = ?').get('usuario')
  if (!userExists) {
    const hashedPassword = bcrypt.hashSync('usuario123', 10)
    db.prepare(
      `
      INSERT INTO usuarios (username, password_hash, name, email, role)
      VALUES (?, ?, ?, ?, 'user')
    `,
    ).run('usuario', hashedPassword, 'Usuario Prueba', 'usuario@empresa.com')
  }

  // Insertar algunos equipos de ejemplo
  const equiposCount = db.prepare('SELECT COUNT(*) as count FROM equipos').get().count
  if (equiposCount === 0) {
    const equipos = [
      {
        tipo: 'computo',
        marca: 'Dell',
        modelo: 'Latitude 5400',
        serial: 'DL001',
        estado: 'activo',
      },
      {
        tipo: 'telefono',
        marca: 'Samsung',
        modelo: 'Galaxy S20',
        serial: 'SG001',
        estado: 'activo',
      },
      { tipo: 'monitor', marca: 'HP', modelo: '24fw', serial: 'HP001', estado: 'activo' },
      {
        tipo: 'computo',
        marca: 'Lenovo',
        modelo: 'ThinkPad T480',
        serial: 'LN001',
        estado: 'archivado',
      },
    ]

    const insertEquipo = db.prepare(`
      INSERT INTO equipos (tipo, marca, modelo, serial, estado, archivo)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    equipos.forEach((equipo) => {
      insertEquipo.run(
        equipo.tipo,
        equipo.marca,
        equipo.modelo,
        equipo.serial,
        equipo.estado,
        equipo.estado === 'archivado',
      )
    })
  }
}
