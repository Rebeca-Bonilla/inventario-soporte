<template>
  <AppLayout>
    <div class="consulta-wireframe">
      <div class="titulo-pagina">CONSULTA</div>

      <div class="barra-herramientas">
        <button class="btn-herramienta" @click="aplicarFiltros">Filtrar</button>
        <button class="btn-herramienta" @click="exportarDatos">Exportar</button>
        <button class="btn-herramienta" @click="modoEdicion = !modoEdicion">
          {{ modoEdicion ? 'Cancelar' : 'Editar' }}
        </button>

        <div class="tabs-consulta">
          <div
            v-for="cat in categorias"
            :key="cat"
            :class="['tab-consulta', categoriaActiva === cat ? 'activa' : '']"
            @click="categoriaActiva = cat"
          >
            {{ cat }}
          </div>
        </div>
      </div>

      <!-- Contador de resultados -->
      <div class="contador-resultados">
        Mostrando {{ equiposFiltrados.length }} de {{ equipos.length }} equipos
      </div>

      <div class="tabla-consulta-container">
        <table class="tabla-wireframe">
          <thead>
            <tr>
              <th>Código</th>
              <th>Usuario</th>
              <th>Centro Trabajo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>N/S</th>
              <th v-if="mostrarCampo('ram')">RAM</th>
              <th v-if="mostrarCampo('almacenamiento')">Almacenamiento</th>
              <th v-if="mostrarCampo('procesador')">Procesador</th>
              <th v-if="mostrarCampo('numeroCelular')">Núm. Celular</th>
              <th v-if="mostrarCampo('dimension')">Dimensión</th>
              <th v-if="mostrarCampo('puertosDisponibles')">Puertos</th>
              <th v-if="mostrarCampo('tipoCamara')">Tipo Cámara</th>
              <th v-if="mostrarCampo('direccionMacIp')">MAC/IP</th>
              <th>Estado</th>
              <th>Colaborador</th>
              <th>Ubicación</th>
              <th>Observaciones</th>
              <th v-if="modoEdicion">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Datos REALES de la BD -->
            <tr v-for="equipo in equiposFiltrados" :key="equipo.id">
              <!-- Campos editables o estáticos -->
              <td>
                <span v-if="!modoEdicion">{{ equipo.codigo }}</span>
                <input v-else v-model="equipo.codigo" class="input-edicion" />
              </td>
              <td>
                <span v-if="!modoEdicion">{{ equipo.usuario }}</span>
                <input v-else v-model="equipo.usuario" class="input-edicion" />
              </td>
              <td>{{ equipo.centroTrabajo }}</td>
              <td>{{ equipo.marca }}</td>
              <td>{{ equipo.modelo }}</td>
              <td>{{ equipo.nSerie }}</td>

              <!-- Campos específicos dinámicos -->
              <td v-if="mostrarCampo('ram')">{{ equipo.ram }}</td>
              <td v-if="mostrarCampo('almacenamiento')">{{ equipo.almacenamiento }}</td>
              <td v-if="mostrarCampo('procesador')">{{ equipo.procesador }}</td>
              <td v-if="mostrarCampo('numeroCelular')">{{ equipo.numeroCelular }}</td>
              <td v-if="mostrarCampo('dimension')">{{ equipo.dimension }}</td>
              <td v-if="mostrarCampo('puertosDisponibles')">{{ equipo.puertosDisponibles }}</td>
              <td v-if="mostrarCampo('tipoCamara')">{{ equipo.tipoCamara }}</td>
              <td v-if="mostrarCampo('direccionMacIp')">{{ equipo.direccionMacIp }}</td>

              <td>
                <span :class="`estado-${equipo.estado.toLowerCase()}`">
                  {{ equipo.estado }}
                </span>
              </td>
              <td>{{ equipo.colaborador }}</td>
              <td>{{ equipo.ubicacion }}</td>
              <td>{{ equipo.observaciones }}</td>

              <!-- Acciones en modo edición -->
              <td v-if="modoEdicion">
                <button @click="guardarCambios(equipo)" class="btn-guardar">💾</button>
                <button @click="eliminarEquipo(equipo.id!)" class="btn-eliminar">🗑️</button>
              </td>
            </tr>

            <!-- Mensaje si no hay datos -->
            <tr v-if="equiposFiltrados.length === 0">
              <td :colspan="modoEdicion ? 19 : 18" class="sin-datos">
                📝 No hay equipos registrados en {{ categoriaActiva }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'

interface Equipo {
  id?: number
  codigo: string
  usuario: string
  centroTrabajo: string
  marca: string
  modelo: string
  nSerie: string
  ram: string
  almacenamiento: string
  procesador: string
  numeroCelular: string
  dimension: string
  puertosDisponibles: string
  tipoCamara: string
  direccionMacIp: string
  estado: string
  colaborador: string
  ubicacion: string
  observaciones: string
  tipo: string
  fechaRegistro: string
}

export default defineComponent({
  name: 'ConsultaEquipos',
  components: {
    AppLayout,
  },
  data() {
    return {
      categoriaActiva: 'Cómputo',
      categorias: [
        'Cómputo',
        'Teléfonos',
        'Monitores',
        'Cámaras',
        'Tablets',
        'Terminales',
        'otros',
      ],
      equipos: [] as Equipo[],
      equiposFiltrados: [] as Equipo[],
      modoEdicion: false,
    }
  },
  mounted() {
    this.cargarEquipos()
  },
  watch: {
    categoriaActiva() {
      this.filtrarEquipos()
    },
  },
  methods: {
    cargarEquipos() {
      // 🔥 Cargar datos REALES de localStorage
      const equiposGuardados = JSON.parse(localStorage.getItem('equipos') || '[]')
      this.equipos = equiposGuardados
      this.filtrarEquipos()
    },

    filtrarEquipos() {
      if (this.categoriaActiva === 'todos') {
        this.equiposFiltrados = this.equipos
      } else {
        this.equiposFiltrados = this.equipos.filter(
          (equipo) => equipo.tipo === this.categoriaActiva,
        )
      }
    },

    mostrarCampo(campo: string): boolean {
      // Mostrar campos según el tipo de equipo seleccionado
      const camposPorTipo: { [key: string]: string[] } = {
        Cómputo: ['ram', 'almacenamiento', 'procesador'],
        Teléfonos: ['numeroCelular'],
        Monitores: ['dimension', 'puertosDisponibles'],
        Cámaras: ['tipoCamara', 'direccionMacIp'],
        Tablets: [], // Agregar campos específicos si los tienes
        Terminales: [], // Agregar campos específicos si los tienes
        otros: [],
      }

      return camposPorTipo[this.categoriaActiva]?.includes(campo) || false
    },

    aplicarFiltros() {
      // Aquí puedes agregar más filtros avanzados
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

    guardarCambios(equipo: Equipo) {
      // Actualizar en localStorage
      const index = this.equipos.findIndex((e) => e.id === equipo.id)
      if (index !== -1) {
        this.equipos[index] = { ...equipo }
        localStorage.setItem('equipos', JSON.stringify(this.equipos))
        alert('✅ Cambios guardados exitosamente')
        this.modoEdicion = false
      }
    },

    eliminarEquipo(id: number) {
      if (confirm('¿Está seguro de eliminar este equipo?')) {
        this.equipos = this.equipos.filter((equipo) => equipo.id !== id)
        localStorage.setItem('equipos', JSON.stringify(this.equipos))
        this.filtrarEquipos()
        alert('✅ Equipo eliminado')
      }
    },
  },
})
</script>

<style scoped>
.consulta-wireframe {
  padding: 20px;
}

.titulo-pagina {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.barra-herramientas {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn-herramienta {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
}

.btn-herramienta:hover {
  background: #e9ecef;
}

.tabs-consulta {
  display: flex;
  border-bottom: 2px solid #ddd;
  flex-grow: 1;
  flex-wrap: wrap;
}

.tab-consulta {
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-bottom: none;
  margin-right: 5px;
  border-radius: 5px 5px 0 0;
  background: #f5f5f5;
  font-size: 14px;
}

.tab-consulta.activa {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.contador-resultados {
  margin: 10px 0;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.tabla-consulta-container {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-x: auto;
}

.tabla-wireframe {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.tabla-wireframe th,
.tabla-wireframe td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size: 12px;
}

.tabla-wireframe th {
  background: #f8f9fa;
  font-weight: bold;
  white-space: nowrap;
}

.tabla-wireframe td {
  background: white;
}

.sin-datos {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.estado-activo {
  color: #28a745;
  font-weight: bold;
}

.estado-inactivo {
  color: #6c757d;
}

.estado-mantenimiento {
  color: #ffc107;
  font-weight: bold;
}

.estado-dañado {
  color: #dc3545;
  font-weight: bold;
}

.input-edicion {
  width: 100%;
  padding: 4px;
  border: 1px solid #007bff;
  border-radius: 3px;
  font-size: 12px;
}

.btn-guardar,
.btn-eliminar {
  padding: 4px 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 2px;
}

.btn-guardar {
  background: #28a745;
  color: white;
}

.btn-eliminar {
  background: #dc3545;
  color: white;
}
</style>
