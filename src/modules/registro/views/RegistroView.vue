<template>
  <div class="registro-container">
    <!-- Sidebar de tipos de equipos -->
    <div class="tipo-selector-sidebar">
      <h3>📦 Tipo de Equipo</h3>
      <div
        v-for="tipo in tiposEquipos"
        :key="tipo.value"
        class="tipo-option"
        :class="{ active: equipoForm.tipo === tipo.value }"
        @click="seleccionarTipo(tipo.value)"
      >
        <span class="tipo-icon">{{ tipo.icon }}</span>
        <span class="tipo-label">{{ tipo.label }}</span>
      </div>
    </div>

    <!-- Formulario principal -->
    <div class="formulario-container">
      <div class="form-header">
        <h1>➕ Registro de Equipo</h1>
        <div class="tipo-actual">
          <span class="tipo-icon-large">{{ tipoActual.icon }}</span>
          <h2>{{ tipoActual.label }}</h2>
        </div>
      </div>

      <form @submit.prevent="guardarEquipo" class="equipo-form">
        <!-- Sección: Información Básica -->
        <div class="form-section">
          <h3>📋 Información Básica</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="etiqueta">Etiqueta de Inventario *</label>
              <input
                id="etiqueta"
                v-model="equipoForm.etiqueta_inventario"
                type="text"
                placeholder="Ej: INV-PC-001"
                required
              />
              <small>Identificador único del equipo</small>
            </div>

            <div class="form-group">
              <label for="marca">Marca *</label>
              <input
                id="marca"
                v-model="equipoForm.marca"
                type="text"
                placeholder="Ej: Dell, HP, Lenovo"
                required
              />
            </div>

            <div class="form-group">
              <label for="modelo">Modelo *</label>
              <input
                id="modelo"
                v-model="equipoForm.modelo"
                type="text"
                placeholder="Ej: OptiPlex 7070"
                required
              />
            </div>

            <div class="form-group">
              <label for="serie">Número de Serie</label>
              <input
                id="serie"
                v-model="equipoForm.numero_serie"
                type="text"
                placeholder="Ej: SN-DELL001"
              />
            </div>
          </div>
        </div>

        <!-- Sección: Estado y Ubicación -->
        <div class="form-section">
          <h3>📍 Estado y Ubicación</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="estado">Estado *</label>
              <select id="estado" v-model="equipoForm.estado" required>
                <option value="">Seleccionar estado...</option>
                <option v-for="estado in estados" :key="estado" :value="estado">
                  {{ estado }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="ubicacion">Ubicación *</label>
              <input
                id="ubicacion"
                v-model="equipoForm.ubicacion"
                type="text"
                placeholder="Ej: Oficina 301, Almacén B"
                required
              />
            </div>

            <div class="form-group">
              <label>
                <input type="checkbox" v-model="equipoForm.en_uso" />
                ¿En uso actualmente?
              </label>
            </div>

            <div class="form-group">
              <label for="colaborador">Asignado a</label>
              <select id="colaborador" v-model="equipoForm.colaborador_id">
                <option value="">Sin asignar</option>
                <option value="1">Juan Pérez García</option>
                <!-- En producción, cargar colaboradores desde BD -->
              </select>
            </div>
          </div>
        </div>

        <!-- Sección: Campos ESPECÍFICOS por tipo -->
        <div v-if="mostrarCamposEspecificos" class="form-section">
          <h3>🔧 Especificaciones del {{ tipoActual.label }}</h3>

          <!-- CAMPOS para COMPUTADORAS -->
          <div v-if="equipoForm.tipo === 'computadora'" class="form-grid">
            <div class="form-group">
              <label for="procesador">Procesador</label>
              <input
                id="procesador"
                v-model="equipoForm.procesador"
                type="text"
                placeholder="Ej: Intel Core i7-10700"
              />
            </div>

            <div class="form-group">
              <label for="ram">RAM (GB)</label>
              <input
                id="ram"
                v-model="equipoForm.ram_gb"
                type="number"
                min="1"
                placeholder="Ej: 16"
              />
            </div>

            <div class="form-group">
              <label for="almacenamiento">Almacenamiento (GB)</label>
              <input
                id="almacenamiento"
                v-model="equipoForm.almacenamiento_gb"
                type="number"
                min="1"
                placeholder="Ej: 512"
              />
            </div>

            <div class="form-group">
              <label for="tipoAlmacenamiento">Tipo de Almacenamiento</label>
              <select id="tipoAlmacenamiento" v-model="equipoForm.tipo_almacenamiento">
                <option value="">Seleccionar...</option>
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
                <option value="NVMe">NVMe</option>
              </select>
            </div>

            <div class="form-group">
              <label for="ip">Dirección IP</label>
              <input
                id="ip"
                v-model="equipoForm.direccion_ip"
                type="text"
                placeholder="Ej: 192.168.1.100"
              />
            </div>

            <div class="form-group">
              <label for="mac">Dirección MAC</label>
              <input
                id="mac"
                v-model="equipoForm.direccion_mac"
                type="text"
                placeholder="Ej: 00:1A:2B:3C:4D:5E"
              />
            </div>

            <div class="form-group">
              <label for="so">Sistema Operativo</label>
              <input
                id="so"
                v-model="equipoForm.sistema_operativo"
                type="text"
                placeholder="Ej: Windows 10 Pro"
              />
            </div>
          </div>

          <!-- CAMPOS para TELÉFONOS FIJOS -->
          <div v-else-if="equipoForm.tipo === 'telefono_fijo'" class="form-grid">
            <div class="form-group">
              <label for="extension">Extensión</label>
              <input
                id="extension"
                v-model="equipoForm.extension"
                type="text"
                placeholder="Ej: 101"
              />
            </div>
          </div>

          <!-- CAMPOS para CELULARES -->
          <div v-else-if="equipoForm.tipo === 'celular'" class="form-grid">
            <div class="form-group">
              <label for="numeroTelefono">Número de Teléfono</label>
              <input
                id="numeroTelefono"
                v-model="equipoForm.numero_telefono"
                type="text"
                placeholder="Ej: 555-1234"
              />
            </div>

            <div class="form-group">
              <label for="imei">IMEI</label>
              <input
                id="imei"
                v-model="equipoForm.imei"
                type="text"
                placeholder="Ej: 123456789012345"
              />
            </div>

            <div class="form-group">
              <label for="planDatos">Plan de Datos</label>
              <input
                id="planDatos"
                v-model="equipoForm.plan_datos"
                type="text"
                placeholder="Ej: Plan Empresarial 5GB"
              />
            </div>
          </div>

          <!-- CAMPOS para MONITORES -->
          <div v-else-if="equipoForm.tipo === 'monitor'" class="form-grid">
            <div class="form-group">
              <label for="tamano">Tamaño (pulgadas)</label>
              <input
                id="tamano"
                v-model="equipoForm.tamaño_pulgadas"
                type="number"
                step="0.1"
                placeholder="Ej: 24.0"
              />
            </div>

            <div class="form-group">
              <label for="resolucion">Resolución</label>
              <input
                id="resolucion"
                v-model="equipoForm.resolucion"
                type="text"
                placeholder="Ej: 1920x1080"
              />
            </div>

            <div class="form-group">
              <label for="puertos">Puertos</label>
              <input
                id="puertos"
                v-model="equipoForm.puertos"
                type="text"
                placeholder="Ej: HDMI, DisplayPort, VGA"
              />
            </div>
          </div>

          <!-- CAMPOS para CÁMARAS -->
          <div v-else-if="equipoForm.tipo === 'camara'" class="form-grid">
            <div class="form-group">
              <label for="tipoCamara">Tipo de Cámara</label>
              <select id="tipoCamara" v-model="equipoForm.tipo_camara">
                <option value="">Seleccionar...</option>
                <option value="bala">Bala</option>
                <option value="domo">Domo</option>
                <option value="profesional">Profesional</option>
                <option value="compacta">Compacta</option>
                <option value="ip">IP</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div class="form-group">
              <label for="resolucionMP">Resolución (MP)</label>
              <input
                id="resolucionMP"
                v-model="equipoForm.resolucion_mp"
                type="number"
                step="0.1"
                placeholder="Ej: 4.0"
              />
            </div>

            <div class="form-group">
              <label for="ipCamara">Dirección IP Cámara</label>
              <input
                id="ipCamara"
                v-model="equipoForm.direccion_ip_camara"
                type="text"
                placeholder="Ej: 192.168.1.101"
              />
            </div>
          </div>

          <!-- CAMPOS para TABLETS -->
          <div v-else-if="equipoForm.tipo === 'tablet'" class="form-grid">
            <div class="form-group">
              <label for="dimensionTablet">Dimensión (pulgadas)</label>
              <input
                id="dimensionTablet"
                v-model="equipoForm.dimension_pulgadas"
                type="number"
                step="0.1"
                placeholder="Ej: 11.0"
              />
            </div>

            <div class="form-group">
              <label for="capacidadTablet">Capacidad (GB)</label>
              <input
                id="capacidadTablet"
                v-model="equipoForm.capacidad_gb"
                type="number"
                min="1"
                placeholder="Ej: 128"
              />
            </div>

            <div class="form-group">
              <label for="androidTablet">Versión Android</label>
              <input
                id="androidTablet"
                v-model="equipoForm.version_android"
                type="text"
                placeholder="Ej: Android 12"
              />
            </div>
          </div>

          <!-- CAMPOS para TERMINALES -->
          <div v-else-if="equipoForm.tipo === 'terminal'" class="form-grid">
            <div class="form-group">
              <label for="androidTerminal">Versión Android</label>
              <input
                id="androidTerminal"
                v-model="equipoForm.version_android_terminal"
                type="text"
                placeholder="Ej: Android 9"
              />
            </div>
          </div>

          <!-- CAMPOS para OTROS -->
          <div v-else-if="equipoForm.tipo === 'otro'" class="form-grid">
            <div class="form-group">
              <label for="tipoEspecifico">Tipo Específico</label>
              <input
                id="tipoEspecifico"
                v-model="equipoForm.tipo_especifico"
                type="text"
                placeholder="Ej: Router, Switch, Impresora"
              />
            </div>

            <div class="form-group full-width">
              <label for="campoExtra">Información Adicional</label>
              <textarea
                id="campoExtra"
                v-model="equipoForm.campo_extra"
                rows="3"
                placeholder="Describe el equipo..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Sección: Observaciones -->
        <div class="form-section">
          <h3>📝 Observaciones</h3>
          <div class="form-group full-width">
            <textarea
              v-model="equipoForm.observaciones"
              rows="4"
              placeholder="Notas adicionales sobre el equipo..."
            ></textarea>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button
            type="button"
            @click="limpiarFormulario"
            class="btn-secondary"
            :disabled="guardando"
          >
            🗑️ Borrar Todo
          </button>

          <button type="button" @click="guardarEnLocal" class="btn-warning" :disabled="guardando">
            💾 Guardar en Local
          </button>

          <button type="submit" class="btn-primary" :disabled="guardando || !formularioValido">
            <span v-if="!guardando">✅ Guardar en BD</span>
            <span v-else>⏳ Guardando...</span>
          </button>
        </div>

        <!-- Mensajes de estado -->
        <div v-if="mensajeExito" class="success-message">✅ {{ mensajeExito }}</div>

        <div v-if="error" class="error-message">❌ {{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const guardando = ref(false)
const mensajeExito = ref('')
const error = ref('')

// Formulario base según tu estructura SQL
const equipoForm = reactive({
  // Información básica
  tipo: 'computadora',
  etiqueta_inventario: '',
  marca: '',
  modelo: '',
  numero_serie: '',

  // Estado y ubicación
  estado: 'Activo',
  en_uso: false,
  archivado: false,
  colaborador_id: null as number | null,
  ubicacion: '',
  centro_trabajo_id: 1, // Por defecto

  // Campos específicos (se inicializan según tipo)
  procesador: '',
  ram_gb: null as number | null,
  almacenamiento_gb: null as number | null,
  tipo_almacenamiento: '',
  direccion_ip: '',
  direccion_mac: '',
  sistema_operativo: '',

  numero_telefono: '',
  imei: '',
  extension: '',
  plan_datos: '',

  tamaño_pulgadas: null as number | null,
  resolucion: '',
  puertos: '',

  tipo_camara: '',
  resolucion_mp: null as number | null,
  direccion_ip_camara: '',

  dimension_pulgadas: null as number | null,
  capacidad_gb: null as number | null,
  version_android: '',

  version_android_terminal: '',

  tipo_especifico: '',
  campo_extra: '',

  // Información administrativa
  fecha_compra: '',
  costo: null as number | null,
  fecha_fin_garantia: '',

  // Observaciones
  observaciones: '',

  // Auditoría (se llenará automáticamente)
  creado_por: 1, // ID del usuario actual
})

// Tipos de equipos según tu SQL
const tiposEquipos = [
  { value: 'computadora', label: '💻 Computadora', icon: '💻' },
  { value: 'telefono_fijo', label: '📞 Teléfono Fijo', icon: '📞' },
  { value: 'celular', label: '📱 Celular', icon: '📱' },
  { value: 'monitor', label: '🖥️ Monitor', icon: '🖥️' },
  { value: 'camara', label: '📷 Cámara', icon: '📷' },
  { value: 'tablet', label: '📟 Tablet', icon: '📟' },
  { value: 'terminal', label: '📲 Terminal', icon: '📲' },
  { value: 'otro', label: '🔧 Otro', icon: '🔧' },
]

// Estados según tu SQL
const estados = ['Activo', 'Inactivo', 'En reparación', 'Dañado', 'Baja', 'Prestado', 'Reservado']

// Computadas
const tipoActual = computed(
  () => tiposEquipos.find((t) => t.value === equipoForm.tipo) || tiposEquipos[0],
)

const mostrarCamposEspecificos = computed(
  () => equipoForm.tipo !== 'otro', // 'otro' ya tiene sus campos especiales
)

const formularioValido = computed(() => {
  return (
    equipoForm.etiqueta_inventario.trim() &&
    equipoForm.marca.trim() &&
    equipoForm.modelo.trim() &&
    equipoForm.estado &&
    equipoForm.ubicacion.trim()
  )
})

// Métodos
const seleccionarTipo = (tipo: string) => {
  equipoForm.tipo = tipo
  // Limpiar campos específicos al cambiar tipo
  limpiarCamposEspecificos()
}

const limpiarCamposEspecificos = () => {
  // Resetear todos los campos específicos
  const camposEspecificos = [
    'procesador',
    'ram_gb',
    'almacenamiento_gb',
    'tipo_almacenamiento',
    'direccion_ip',
    'direccion_mac',
    'sistema_operativo',
    'numero_telefono',
    'imei',
    'extension',
    'plan_datos',
    'tamaño_pulgadas',
    'resolucion',
    'puertos',
    'tipo_camara',
    'resolucion_mp',
    'direccion_ip_camara',
    'dimension_pulgadas',
    'capacidad_gb',
    'version_android',
    'version_android_terminal',
    'tipo_especifico',
    'campo_extra',
  ]

  camposEspecificos.forEach((campo) => {
    // @ts-ignore
    equipoForm[campo] =
      campo.includes('_gb') || campo.includes('_mp') || campo.includes('pulgadas') ? null : ''
  })
}

const limpiarFormulario = () => {
  if (!confirm('¿Estás seguro de borrar todos los campos?')) return

  // Resetear formulario completo
  Object.keys(equipoForm).forEach((key) => {
    if (key === 'tipo') return // Mantener el tipo seleccionado
    if (key === 'centro_trabajo_id') {
      // @ts-ignore
      equipoForm[key] = 1
    } else if (key === 'creado_por') {
      // @ts-ignore
      equipoForm[key] = 1
    } else if (typeof equipoForm[key as keyof typeof equipoForm] === 'boolean') {
      // @ts-ignore
      equipoForm[key] = false
    } else if (typeof equipoForm[key as keyof typeof equipoForm] === 'number') {
      // @ts-ignore
      equipoForm[key] = null
    } else {
      // @ts-ignore
      equipoForm[key] = ''
    }
  })

  equipoForm.estado = 'Activo'
  equipoForm.en_uso = false
  equipoForm.archivado = false

  mensajeExito.value = ''
  error.value = ''
}

const guardarEnLocal = () => {
  try {
    localStorage.setItem('equipo_temporal', JSON.stringify(equipoForm))
    mensajeExito.value = '✅ Equipo guardado temporalmente en localStorage'
    setTimeout(() => {
      mensajeExito.value = ''
    }, 3000)
  } catch (err) {
    error.value = 'Error al guardar en localStorage'
  }
}

const guardarEquipo = async () => {
  if (!formularioValido.value) {
    error.value = 'Por favor, completa los campos requeridos (*)'
    return
  }

  guardando.value = true
  error.value = ''
  mensajeExito.value = ''

  try {
    // Aquí iría la llamada a tu backend
    // const response = await fetch('http://localhost:3000/api/equipos', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(equipoForm)
    // })

    // Simulación de guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    mensajeExito.value = `✅ Equipo "${equipoForm.etiqueta_inventario}" guardado exitosamente`

    // Limpiar después de 3 segundos
    setTimeout(() => {
      limpiarFormulario()
      mensajeExito.value = ''
    }, 3000)
  } catch (err) {
    error.value = 'Error al guardar el equipo en la base de datos'
    console.error(err)
  } finally {
    guardando.value = false
  }
}

// Cargar datos guardados temporalmente al iniciar
onMounted(() => {
  const equipoGuardado = localStorage.getItem('equipo_temporal')
  if (equipoGuardado) {
    const parsed = JSON.parse(equipoGuardado)
    Object.assign(equipoForm, parsed)
  }
})
</script>

<style scoped>
.registro-container {
  display: flex;
  min-height: calc(100vh - 60px);
  background: #f7fafc;
}

.tipo-selector-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 1.5rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.tipo-selector-sidebar h3 {
  color: #4a5568;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.tipo-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
}

.tipo-option:hover {
  background: #edf2f7;
  transform: translateX(2px);
}

.tipo-option.active {
  background: #4299e1;
  color: white;
  border-color: #4299e1;
}

.tipo-icon {
  font-size: 1.2rem;
}

.tipo-label {
  font-weight: 500;
}

.formulario-container {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h1 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.tipo-actual {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tipo-icon-large {
  font-size: 2rem;
}

.equipo-form {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h3 {
  color: #4a5568;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .registro-container {
    flex-direction: column;
  }
  .tipo-selector-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
}

.form-group {
  margin-bottom: 1rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: #718096;
  font-size: 0.85rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e2e8f0;
}

.btn-primary,
.btn-secondary,
.btn-warning {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #4299e1;
  color: white;
  flex: 1;
}

.btn-primary:hover:not(:disabled) {
  background: #3182ce;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 153, 225, 0.3);
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover:not(:disabled) {
  background: #cbd5e0;
}

.btn-warning {
  background: #ed8936;
  color: white;
}

.btn-warning:hover:not(:disabled) {
  background: #dd6b20;
}

.btn-primary:disabled,
.btn-secondary:disabled,
.btn-warning:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.success-message {
  background: #c6f6d5;
  border: 1px solid #9ae6b4;
  color: #22543d;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  text-align: center;
  animation: fadeIn 0.3s;
}

.error-message {
  background: #fed7d7;
  border: 1px solid #fc8181;
  color: #c53030;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  text-align: center;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
