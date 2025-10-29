<template>
  <div class="registro-computadoras">
    <div class="header">
      <h1>Registro</h1>
      <div class="tiempo">Tiempo: <span class="tiempo-contador">00:00</span> Límite: 30:00</div>
    </div>

    <div class="form-container">
      <!-- Columna Izquierda -->
      <div class="columna-izquierda">
        <div class="form-group">
          <label>Usuario</label>
          <input type="text" v-model="formData.usuario" placeholder="Ingrese usuario" />
        </div>

        <div class="form-group">
          <label>Cargo</label>
          <input type="text" v-model="formData.cargo" placeholder="Ingrese cargo" />
        </div>

        <div class="form-group">
          <label>N/S</label>
          <input type="text" v-model="formData.numeroSerie" placeholder="Número de serie" />
        </div>

        <div class="form-group">
          <label>Tipo</label>
          <select v-model="formData.tipo">
            <option value="">Seleccionar tipo</option>
            <option value="laptop">Laptop</option>
            <option value="desktop">Desktop</option>
            <option value="workstation">Workstation</option>
          </select>
        </div>

        <div class="form-group">
          <label>RAM</label>
          <input type="text" v-model="formData.ram" placeholder="Ej: 8GB DDR4" />
        </div>

        <div class="form-group">
          <label>Almacenamiento</label>
          <input type="text" v-model="formData.almacenamiento" placeholder="Ej: 256GB SSD" />
        </div>
      </div>

      <!-- Columna Derecha -->
      <div class="columna-derecha">
        <div class="form-group">
          <label>Centro de Trabajo</label>
          <input type="text" v-model="formData.centroTrabajo" placeholder="Centro de trabajo" />
        </div>

        <div class="form-group">
          <label>Marca</label>
          <input type="text" v-model="formData.marca" placeholder="Marca del equipo" />
        </div>

        <div class="form-group">
          <label>Modelo</label>
          <input type="text" v-model="formData.modelo" placeholder="Modelo del equipo" />
        </div>

        <div class="form-group">
          <label>Procesador</label>
          <input type="text" v-model="formData.procesador" placeholder="Ej: Intel i5-11400H" />
        </div>

        <div class="form-group">
          <label>Estado</label>
          <select v-model="formData.estado">
            <option value="">Seleccionar estado</option>
            <option value="activo">Activo</option>
            <option value="mantenimiento">En mantenimiento</option>
            <option value="baja">De baja</option>
          </select>
        </div>

        <div class="form-group">
          <label>Colaborador</label>
          <input type="text" v-model="formData.colaborador" placeholder="Nombre del colaborador" />
        </div>

        <div class="form-group">
          <label>Ubicación</label>
          <input type="text" v-model="formData.ubicacion" placeholder="Ubicación física" />
        </div>

        <div class="form-group full-width">
          <label>Observaciones</label>
          <textarea
            v-model="formData.observaciones"
            placeholder="Observaciones adicionales"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Fecha de registro</label>
          <input type="date" v-model="formData.fechaRegistro" />
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn-borrar" @click="borrarTodo">Borrar todo</button>
      <button class="btn-guardar" @click="guardarRegistro">Guardar registro</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FormData {
  usuario: string
  cargo: string
  numeroSerie: string
  tipo: string
  ram: string
  almacenamiento: string
  centroTrabajo: string
  marca: string
  modelo: string
  procesador: string
  estado: string
  colaborador: string
  ubicacion: string
  observaciones: string
  fechaRegistro: string
}

// Función para obtener fecha actual de forma segura
const obtenerFechaActual = (): string => {
  return new Date().toISOString().split('T')[0] || ''
}

const formData = ref<FormData>({
  usuario: '',
  cargo: '',
  numeroSerie: '',
  tipo: '',
  ram: '',
  almacenamiento: '',
  centroTrabajo: '',
  marca: '',
  modelo: '',
  procesador: '',
  estado: '',
  colaborador: '',
  ubicacion: '',
  observaciones: '',
  fechaRegistro: obtenerFechaActual(),
})

const borrarTodo = () => {
  formData.value = {
    usuario: '',
    cargo: '',
    numeroSerie: '',
    tipo: '',
    ram: '',
    almacenamiento: '',
    centroTrabajo: '',
    marca: '',
    modelo: '',
    procesador: '',
    estado: '',
    colaborador: '',
    ubicacion: '',
    observaciones: '',
    fechaRegistro: obtenerFechaActual(),
  }
}

const guardarRegistro = () => {
  console.log('Guardando registro:', formData.value)
  // Aquí iría la lógica para guardar en la base de datos
  alert('Registro guardado exitosamente!')
}
</script>

<style scoped>
.registro-computadoras {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 15px;
}

.header h1 {
  color: #007bff;
  margin: 0;
}

.tiempo-contador {
  font-weight: bold;
  color: #dc3545;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.columna-izquierda,
.columna-derecha {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.btn-borrar {
  padding: 12px 25px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-guardar {
  padding: 12px 25px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-borrar:hover {
  background: #c82333;
}

.btn-guardar:hover {
  background: #218838;
}

@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
