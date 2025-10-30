<template>
  <AppLayout>
    <div class="registro-wireframe">
      <div class="titulo-pagina">REGISTRO</div>

      <!-- Pestañas idénticas a Consulta -->
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

      <!-- Formulario como tabla -->
      <div class="formulario-tabla-container">
        <table class="tabla-wireframe">
          <thead>
            <tr>
              <th>Código*</th>
              <th>Usuario</th>
              <th>Centro de Trabajo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>N/S*</th>
              <th v-if="categoriaActiva === 'Cómputo'">RAM</th>
              <th v-if="categoriaActiva === 'Cómputo'">Almacenamiento</th>
              <th v-if="categoriaActiva === 'Cómputo'">Procesador</th>
              <th v-if="categoriaActiva === 'Teléfonos'">Número Celular</th>
              <th v-if="categoriaActiva === 'Monitores'">Dimensión</th>
              <th v-if="categoriaActiva === 'Monitores'">Puertos</th>
              <th v-if="categoriaActiva === 'Cámaras'">Tipo Cámara</th>
              <th v-if="categoriaActiva === 'Cámaras'">MAC/IP</th>
              <th>Estado</th>
              <th>Colaborador</th>
              <th>Ubicación</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Fila editable -->
            <tr class="fila-editable">
              <td>
                <input
                  v-model="nuevoEquipo.codigo"
                  type="text"
                  class="input-tabla"
                  placeholder="Requerido"
                />
              </td>
              <td><input v-model="nuevoEquipo.usuario" type="text" class="input-tabla" /></td>
              <td><input v-model="nuevoEquipo.centroTrabajo" type="text" class="input-tabla" /></td>
              <td><input v-model="nuevoEquipo.marca" type="text" class="input-tabla" /></td>
              <td><input v-model="nuevoEquipo.modelo" type="text" class="input-tabla" /></td>
              <td>
                <input
                  v-model="nuevoEquipo.nSerie"
                  type="text"
                  class="input-tabla"
                  placeholder="Requerido"
                />
              </td>

              <!-- Campos específicos de CÓMPUTO -->
              <td v-if="categoriaActiva === 'Cómputo'">
                <input
                  v-model="nuevoEquipo.ram"
                  type="text"
                  class="input-tabla"
                  placeholder="8GB"
                />
              </td>
              <td v-if="categoriaActiva === 'Cómputo'">
                <input
                  v-model="nuevoEquipo.almacenamiento"
                  type="text"
                  class="input-tabla"
                  placeholder="SSD 256GB"
                />
              </td>
              <td v-if="categoriaActiva === 'Cómputo'">
                <input
                  v-model="nuevoEquipo.procesador"
                  type="text"
                  class="input-tabla"
                  placeholder="Intel i5"
                />
              </td>

              <!-- Campos específicos de TELÉFONOS -->
              <td v-if="categoriaActiva === 'Teléfonos'">
                <input
                  v-model="nuevoEquipo.numeroCelular"
                  type="text"
                  class="input-tabla"
                  placeholder="555-123-4567"
                />
              </td>

              <!-- Campos específicos de MONITORES -->
              <td v-if="categoriaActiva === 'Monitores'">
                <input
                  v-model="nuevoEquipo.dimension"
                  type="text"
                  class="input-tabla"
                  placeholder='24"'
                />
              </td>
              <td v-if="categoriaActiva === 'Monitores'">
                <input
                  v-model="nuevoEquipo.puertosDisponibles"
                  type="text"
                  class="input-tabla"
                  placeholder="HDMI, USB-C"
                />
              </td>

              <!-- Campos específicos de CÁMARAS -->
              <td v-if="categoriaActiva === 'Cámaras'">
                <input
                  v-model="nuevoEquipo.tipoCamara"
                  type="text"
                  class="input-tabla"
                  placeholder="DSLR, Webcam"
                />
              </td>
              <td v-if="categoriaActiva === 'Cámaras'">
                <input
                  v-model="nuevoEquipo.direccionMacIp"
                  type="text"
                  class="input-tabla"
                  placeholder="192.168.1.100"
                />
              </td>

              <!-- Campos comunes -->
              <td>
                <select v-model="nuevoEquipo.estado" class="input-tabla">
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Dañado">Dañado</option>
                </select>
              </td>
              <td><input v-model="nuevoEquipo.colaborador" type="text" class="input-tabla" /></td>
              <td><input v-model="nuevoEquipo.ubicacion" type="text" class="input-tabla" /></td>
              <td><input v-model="nuevoEquipo.observaciones" type="text" class="input-tabla" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Botones de acción -->
      <div class="botones-accion">
        <button @click="limpiarFormulario" class="btn-wireframe btn-borrar">Borrar todo</button>
        <button @click="guardarEquipo" class="btn-wireframe btn-guardar" :disabled="guardando">
          {{ guardando ? 'Guardando...' : 'Guardar' }}
        </button>
        <button
          @click="guardarYContinuar"
          class="btn-wireframe btn-continuar"
          :disabled="guardando"
        >
          {{ guardando ? 'Guardando...' : 'Guardar y continuar' }}
        </button>
      </div>

      <!-- Info de BD -->
      <div class="bd-info" v-if="totalEquipos > 0">
        <small>✅ BD: {{ totalEquipos }} equipos guardados</small>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import '../styles/registros.css' // ← Ruta relativa

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
  name: 'RegistroEquipos',
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
      nuevoEquipo: {
        codigo: '',
        usuario: '',
        centroTrabajo: '',
        marca: '',
        modelo: '',
        nSerie: '',
        ram: '',
        almacenamiento: '',
        procesador: '',
        numeroCelular: '',
        dimension: '',
        puertosDisponibles: '',
        tipoCamara: '',
        direccionMacIp: '',
        estado: 'Activo',
        colaborador: '',
        ubicacion: '',
        observaciones: '',
      } as Equipo,
      guardando: false,
      totalEquipos: 0,
    }
  },
  mounted() {
    this.actualizarContadorBD()
  },
  methods: {
    actualizarContadorBD() {
      const equipos = JSON.parse(localStorage.getItem('equipos') || '[]')
      this.totalEquipos = equipos.length
    },

    limpiarFormulario() {
      if (confirm('¿Está seguro de borrar todos los datos?')) {
        this.nuevoEquipo = {
          codigo: '',
          usuario: '',
          centroTrabajo: '',
          marca: '',
          modelo: '',
          nSerie: '',
          ram: '',
          almacenamiento: '',
          procesador: '',
          numeroCelular: '',
          dimension: '',
          puertosDisponibles: '',
          tipoCamara: '',
          direccionMacIp: '',
          estado: 'Activo',
          colaborador: '',
          ubicacion: '',
          observaciones: '',
        } as Equipo
      }
    },

    async guardarEquipo() {
      // Validar campos requeridos
      if (!this.nuevoEquipo.codigo.trim()) {
        alert('❌ El campo Código es requerido')
        return
      }
      if (!this.nuevoEquipo.nSerie.trim()) {
        alert('❌ El campo N/S es requerido')
        return
      }

      const confirmacion = confirm(
        `¿Guardar equipo de ${this.categoriaActiva}?\n\nRevise los datos antes de continuar.`,
      )

      if (confirmacion) {
        this.guardando = true

        try {
          // Simular delay de guardado
          await new Promise((resolve) => setTimeout(resolve, 500))

          // 🔥 GUARDAR EN BD (localStorage)
          const equiposGuardados: Equipo[] = JSON.parse(localStorage.getItem('equipos') || '[]')

          const nuevoEquipoBD: Equipo = {
            id: Date.now(), // ID único basado en timestamp
            ...this.nuevoEquipo,
            tipo: this.categoriaActiva,
            fechaRegistro: new Date().toLocaleDateString('es-MX'),
          }

          equiposGuardados.push(nuevoEquipoBD)
          localStorage.setItem('equipos', JSON.stringify(equiposGuardados))

          alert(
            `✅ Equipo guardado exitosamente!\n\nTipo: ${this.categoriaActiva}\nCódigo: ${nuevoEquipoBD.codigo}\nN/S: ${nuevoEquipoBD.nSerie}`,
          )

          // Actualizar contador
          this.actualizarContadorBD()
        } catch (error) {
          alert('❌ Error al guardar equipo: ' + (error as Error).message)
          console.error('Error:', error)
        } finally {
          this.guardando = false
        }
      }
    },

    async guardarYContinuar() {
      await this.guardarEquipo()
      // Si no está guardando (ya terminó), limpiar formulario
      if (!this.guardando) {
        this.limpiarFormulario()
      }
    },
  },
})
</script>
