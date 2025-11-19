import { Equipo } from '@/types/equipos';

const equiposMock: Equipo[] = [
  {
    id: 1,
    tipo: 'computo',
    marca: 'Dell',
    modelo: 'Latitude 5400',
    serial: 'DL001',
    estado: 'activo',
    archivo: false,
    fechaRegistro: new Date().toISOString()
  },
  {
    id: 2,
    tipo: 'telefono',
    marca: 'Samsung',
    modelo: 'Galaxy S20',
    serial: 'SG001',
    estado: 'activo',
    archivo: false,
    fechaRegistro: new Date().toISOString()
  },
  {
    id: 3,
    tipo: 'monitor',
    marca: 'HP',
    modelo: '24fw',
    serial: 'HP001',
    estado: 'activo',
    archivo: false,
    fechaRegistro: new Date().toISOString()
  },
];

export const equiposService = {
  async getDashboardStats() {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      stats: {
        totalEquipos: 15,
        equiposActivos: 12,
        equiposArchivados: 3,
        totalTipos: 4
      },
      recentActivities: [
        { id: 1, description: 'Nuevo equipo registrado', timestamp: new Date().toISOString() },
        { id: 2, description: 'Usuario admin inició sesión', timestamp: new Date().toISOString() }
      ]
    };
  },

  async getEquipos(): Promise<{ success: boolean; equipos: Equipo[] }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, equipos: equiposMock };
  },

  async getArchivados(): Promise<{ success: boolean; equipos: Equipo[] }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const archivados = equiposMock.filter(e => e.archivo);
    return { success: true, equipos: archivados };
  },

  async addEquipo(equipo: Omit<Equipo, 'id' | 'fechaRegistro'>): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Equipo agregado (simulado)' };
  },

  async updateEquipo(id: number, updates: Partial<Equipo>): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Equipo actualizado (simulado)' };
  },

  async archivarEquipo(id: number): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Equipo archivado (simulado)' };
  }
};
