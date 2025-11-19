import { Elysia } from 'elysia'

interface DashboardStats {
  totalEquipos: number
  equiposActivos: number
  equiposArchivados: number
  totalTipos: number
}

interface RecentActivity {
  id: number
  description: string
  timestamp: string
}

export const dashboardRoutes = new Elysia().get('/dashboard/stats', ({ store }: any) => {
  try {
    const db = store.db

    const totalEquipos = db.prepare('SELECT COUNT(*) as count FROM equipos').get().count
    const equiposActivos = db
      .prepare('SELECT COUNT(*) as count FROM equipos WHERE estado = "activo"')
      .get().count
    const equiposArchivados = db
      .prepare('SELECT COUNT(*) as count FROM equipos WHERE archivo = TRUE')
      .get().count
    const totalTipos = db.prepare('SELECT COUNT(DISTINCT tipo) as count FROM equipos').get().count

    const recentActivities: RecentActivity[] = [
      { id: 1, description: 'Sistema iniciado', timestamp: new Date().toISOString() },
      { id: 2, description: 'Dashboard cargado', timestamp: new Date().toISOString() },
    ]

    const stats: DashboardStats = {
      totalEquipos,
      equiposActivos,
      equiposArchivados,
      totalTipos,
    }

    return {
      stats,
      recentActivities,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)

    const defaultStats: DashboardStats = {
      totalEquipos: 0,
      equiposActivos: 0,
      equiposArchivados: 0,
      totalTipos: 0,
    }

    return {
      stats: defaultStats,
      recentActivities: [] as RecentActivity[],
    }
  }
})
