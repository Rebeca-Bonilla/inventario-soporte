// REEMPLAZA TODO EL ARCHIVO con esto:
export interface User {
  id: number
  username: string
  nombre_completo: string
  rol: 'admin' | 'usuario'
  cargo?: string
  activo: boolean
}

export class AuthService {
  async validateUser(username: string, password: string): Promise<User | null> {
    console.log('=== VALIDANDO LOGIN ===')
    console.log('Username recibido:', username)
    console.log('Password recibido:', password)
    console.log('Tipo de username:', typeof username)
    console.log('Tipo de password:', typeof password)

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Usuarios SIMULADOS (iguales a tu SQL)
    const users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        nombre_completo: 'Administrador del Sistema',
        rol: 'admin' as const,
        cargo: 'Administrador TI',
        activo: true,
      },
      {
        id: 2,
        username: 'usuario',
        password: 'usuario123',
        nombre_completo: 'Usuario de Prueba',
        rol: 'usuario' as const,
        cargo: 'Analista de Soporte',
        activo: true,
      },
    ]

    console.log(
      `🔍 Buscando usuario "${username}" en:`,
      users.map((u) => u.username),
    )

    const user = users.find((u) => u.username === username.trim())

    if (!user) {
      console.log('❌ Usuario no encontrado')
      return null
    }

    console.log(`✅ Usuario encontrado: ${user.username}`)
    console.log(`🔐 Comparando passwords:`)
    console.log(`   BD: "${user.password}" (${typeof user.password})`)
    console.log(`   Input: "${password}" (${typeof password})`)

    // Comparación EXACTA
    if (user.password !== password.trim()) {
      console.log('❌ Password NO coincide')
      return null
    }

    console.log('🎉 ¡LOGIN EXITOSO!')

    // Remover password antes de devolver
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async getUserById(id: number): Promise<User | null> {
    return null // No necesario por ahora
  }
}
