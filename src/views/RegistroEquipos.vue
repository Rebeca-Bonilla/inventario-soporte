<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Registro de Equipos</h1>
      <p>Gestión de registro de equipos del inventario</p>
    </div>

    <!-- Mensajes de éxito/error -->
    <div v-if="showSuccess" class="success-message">{{ successMessage }}</div>
    <div v-if="showError" class="error-message">{{ errorMessage }}</div>

    <!-- Tabs para tipos de equipo -->
    <div class="tabs-container">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Formulario de Computo -->
    <div v-if="activeTab === 'computo'" class="content-section">
      <h2>Registro de Equipo de Cómputo</h2>
      <div class="registro-form">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Centro de Trabajo</label>
            <input
              v-model="formData.usuario"
              type="text"
              class="form-input"
              placeholder="Ingrese el usuario"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Marca</label>
            <input
              v-model="formData.codigo"
              type="text"
              class="form-input"
              placeholder="Código del equipo"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Modelo</label>
            <input
              v-model="formData.complejo"
              type="text"
              class="form-input"
              placeholder="Complejo"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Número de Serie (N/S)</label>
            <input
              v-model="formData.centroTrabajo"
              type="text"
              class="form-input"
              placeholder="Centro de trabajo"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Tipo</label>
            <input
              v-model="formData.marca"
              type="text"
              class="form-input"
              placeholder="Marca del equipo"
            />
          </div>
          <div class="form-group">
            <label class="form-label">RAM</label>
            <input v-model="formData.modulo" type="text" class="form-input" placeholder="Módulo" />
          </div>
          <div class="form-group">
            <label class="form-label">Almacenamiento</label>
            <input
              v-model="formData.numeroSerie"
              type="text"
              class="form-input"
              placeholder="Número de serie"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Tipo</label>
            <select v-model="formData.tipo" class="form-select">
              <option value="">Seleccionar tipo</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Servidor">Servidor</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Procesador</label>
            <input
              v-model="formData.ram"
              type="text"
              class="form-input"
              placeholder="Ej: 8GB, 16GB"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Colaborador</label>
            <input
              v-model="formData.almacenamiento"
              type="text"
              class="form-input"
              placeholder="Ej: SSD 256GB"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Ubicación</label>
            <input
              v-model="formData.procesador"
              type="text"
              class="form-input"
              placeholder="Ej: Intel i5"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Estado</label>
            <select v-model="formData.estado" class="form-select">
              <option value="">Seleccionar estado</option>
              <option value="Activo">Activo</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Fecha de registro</label>
            <input
              v-model="formData.ubicacion"
              type="text"
              class="form-input"
              placeholder="Ej: OF-05"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Observaciones</label>
            <input
              v-model="formData.observaciones"
              type="text"
              class="form-input"
              placeholder="Observaciones"
            />
          </div>
        </div>

        <div class="form-actions">
          <button @click="confirmarGuardar" class="btn-registro">Guardar</button>
          <button @click="confirmarBorrar" class="btn-cancelar">Borrar todo</button>
          <button @click="confirmarAnadir" class="btn-secondary">Añadir</button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-icon"></div>
        <h3 class="modal-title">{{ modalTitle }}</h3>
        <p class="modal-message">{{ modalMessage }}</p>
        <div class="modal-actions">
          <button @click="ejecutarAccion" class="modal-btn confirm">Sí, continuar</button>
          <button @click="cancelarAccion" class="modal-btn cancel">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal de éxito -->
    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-icon"></div>
        <h3 class="modal-title">¡Éxito!</h3>
        <p class="modal-message">{{ successMessage }}</p>
        <div class="modal-actions">
          <button @click="showSuccessModal = false" class="modal-btn success">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Definir la interfaz para formData
interface FormData {
  usuario: string
  codigo: string
  complejo: string
  centroTrabajo: string
  marca: string
  modulo: string
  numeroSerie: string
  tipo: string
  ram: string
  almacenamiento: string
  procesador: string
  estado: string
  colaborador: string
  ubicacion: string
  observaciones: string
}

const activeTab = ref('computo')
const showModal = ref(false)
const showSuccessModal = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const accionPendiente = ref('') // 'guardar', 'borrar', 'anadir'

const modalTitle = ref('')
const modalMessage = ref('')

const tabs = [
  { id: 'computo', label: 'Cómputo' },
  { id: 'telefonos', label: 'Teléfonos' },
  { id: 'monitores', label: 'Monitores' },
  { id: 'camaras', label: 'Cámaras' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'terminales', label: 'Terminales' },
  { id: 'otros', label: 'Otros' },
]

// Inicializar formData con la interfaz
const formData = reactive<FormData>({
  usuario: '',
  codigo: '',
  complejo: '',
  centroTrabajo: '',
  marca: '',
  modulo: '',
  numeroSerie: '',
  tipo: '',
  ram: '',
  almacenamiento: '',
  procesador: '',
  estado: '',
  colaborador: '',
  ubicacion: '',
  observaciones: '',
})

const confirmarGuardar = () => {
  modalTitle.value = 'Confirmar Guardado'
  modalMessage.value = '¿Estás seguro de que deseas guardar este equipo en el inventario?'
  accionPendiente.value = 'guardar'
  showModal.value = true
}

const confirmarBorrar = () => {
  modalTitle.value = 'Confirmar Borrado'
  modalMessage.value =
    '¿Estás seguro de que deseas borrar todos los datos del formulario? Esta acción no se puede deshacer.'
  accionPendiente.value = 'borrar'
  showModal.value = true
}

const confirmarAnadir = () => {
  modalTitle.value = 'Confirmar Adición'
  modalMessage.value = '¿Estás seguro de que deseas añadir este equipo al sistema?'
  accionPendiente.value = 'anadir'
  showModal.value = true
}

const ejecutarAccion = () => {
  showModal.value = false

  switch (accionPendiente.value) {
    case 'guardar':
      guardarEquipo()
      break
    case 'borrar':
      borrarFormulario()
      break
    case 'anadir':
      anadirEquipo()
      break
  }
}

const cancelarAccion = () => {
  showModal.value = false
  accionPendiente.value = ''
}

// Función corregida para borrar el formulario
const borrarFormulario = () => {
  // Limpiar todos los campos de forma segura
  const keys = Object.keys(formData) as Array<keyof FormData>
  keys.forEach((key) => {
    formData[key] = ''
  })

  successMessage.value = 'Formulario borrado exitosamente'
  showSuccessModal.value = true
  showSuccess.value = true
  setTimeout(() => (showSuccess.value = false), 5000)
}

const guardarEquipo = () => {
  // Simular guardado en base de datos
  setTimeout(() => {
    successMessage.value = 'Equipo guardado exitosamente en el inventario'
    showSuccessModal.value = true
    showSuccess.value = true
    setTimeout(() => (showSuccess.value = false), 5000)
  }, 1000)
}

const anadirEquipo = () => {
  // Simular adición a la base de datos
  setTimeout(() => {
    successMessage.value = 'Equipo añadido exitosamente al sistema'
    showSuccessModal.value = true
    showSuccess.value = true
    setTimeout(() => (showSuccess.value = false), 5000)
  }, 1000)
}
</script>

<style scoped>
@import '../styles/registros.css';
</style>
