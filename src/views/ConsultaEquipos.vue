<script lang="ts">
import { defineComponent } from 'vue'
import { apiService } from '../services/api'
import '../styles/consulta.css'

interface Equipo {
  id?: number
  categoria: string
  usuario: string
  centro_trabajo: string
  marca: string
  modelo: string
  numero_serie: string
  ram?: string
  almacenamiento?: string
  procesador?: string
  estado?: string
  colaborador?: string
  ubicacion?: string
  observaciones?: string
}

export default defineComponent({
  name: 'ConsultaEquipos',
  data() {
    return {
      categoriaActiva: 'laptop',
      categorias: ['laptop', 'telefono', 'monitor', 'camara', 'tablet', 'terminal', 'otros'],
      equipos: [] as Equipo[],
      equiposFiltrados: [] as Equipo[],
      modoEdicion: false,
    }
  },
  async mounted() {
    await this.cargarEquipos()
  },
  watch: {
    categoriaActiva() {
      this.filtrarEquipos()
    },
  },
  methods: {
    async cargarEquipos() {
      try {
        console.log('🔄 1. Iniciando carga de equipos...')

        // Probar la API directamente
        console.log('🔍 2. Llamando a apiService.getEquipos()...')
        const equiposDesdeAPI = await apiService.getEquipos()

        console.log('📊 3. Respuesta de la API:', equiposDesdeAPI)
        console.log('🔢 4. Tipo de dato:', typeof equiposDesdeAPI)
        console.log('📏 5. Cantidad de equipos:', equiposDesdeAPI?.length || 0)

        this.equipos = equiposDesdeAPI || []
        console.log('✅ 6. Equipos asignados a this.equipos:', this.equipos)

        this.filtrarEquipos()
      } catch (error) {
        console.error('❌ ERROR en cargarEquipos:', error)
        alert('Error al cargar equipos desde el servidor: ' + (error as Error).message)
      }
    },

    filtrarEquipos() {
      console.log('🔍 Filtrando equipos...')
      console.log('📋 Equipos totales:', this.equipos)
      console.log('🎯 Categoría activa:', this.categoriaActiva)

      if (this.categoriaActiva === 'todos') {
        this.equiposFiltrados = this.equipos
      } else {
        this.equiposFiltrados = this.equipos.filter(
          (equipo) => equipo.categoria === this.categoriaActiva,
        )
      }

      console.log('📊 Equipos filtrados:', this.equiposFiltrados)
    },

    mostrarCampo(campo: string): boolean {
      const camposPorTipo: { [key: string]: string[] } = {
        laptop: ['ram', 'almacenamiento', 'procesador'],
        telefono: [],
        monitor: [],
        camara: [],
        tablet: ['ram', 'almacenamiento', 'procesador'],
        terminal: [],
        otros: [],
      }
      return camposPorTipo[this.categoriaActiva]?.includes(campo) || false
    },

    aplicarFiltros() {
      this.filtrarEquipos()
      alert(`Filtros aplicados - ${this.equiposFiltrados.length} equipos encontrados`)
    },

    exportarDatos() {
      const datosExportar = this.equiposFiltrados
      const blob = new Blob([JSON.stringify(datosExportar, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `equipos-${this.categoriaActiva}-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      alert(`Datos exportados: ${datosExportar.length} equipos`)
    },

    async guardarCambios(equipo: Equipo) {
      try {
        if (equipo.id) {
          await apiService.actualizarEquipo(equipo.id, equipo)
          alert('Cambios guardados exitosamente')
          await this.cargarEquipos()
          this.modoEdicion = false
        }
      } catch (error) {
        console.error('Error guardando cambios:', error)
        alert('Error al guardar cambios')
      }
    },

    async eliminarEquipo(id: number) {
      if (confirm('¿Está seguro de eliminar este equipo?')) {
        try {
    
          await apiService.eliminarEquipo(id)
          alert('Equipo eliminado')
          await this.cargarEquipos()
        } catch (error) {
          console.error('Error eliminando equipo:', error)
          alert('Error al eliminar equipo')
        }
      }
    },
  },
})
</script>
