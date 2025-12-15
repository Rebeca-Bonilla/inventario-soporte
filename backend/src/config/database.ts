import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Inventario_prueba',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Función para ejecutar queries
export const query = async (sql: string, params: any[] = []): Promise<any> => {
  const connection = await pool.getConnection()
  try {
    const [results] = await connection.execute(sql, params)
    return results
  } catch (error) {
    console.error('Error en query:', error)
    throw error
  } finally {
    connection.release()
  }
}

// Test de conexión
export const testConnection = async (): Promise<boolean> => {
  try {
    await query('SELECT 1')
    console.log('✅ Conexión a MariaDB establecida')
    return true
  } catch (error) {
    console.error('❌ Error conectando a MariaDB:', error)
    return false
  }
}

export default pool
