<template>
  <AppLayout>
    <div class="registro-wireframe">
      <div class="titulo-pagina">REGISTRO</div>

      <div class="tabs-categorias">
        <div
          v-for="categoria in categorias"
          :key="categoria"
          :class="['tab', categoriaActiva === categoria ? 'activa' : '']"
          @click="categoriaActiva = categoria"
        >
          {{ categoria }}
        </div>
      </div>

      <div class="formulario-wireframe">
        <!-- Campos del formulario -->
        <div class="fila-formulario" v-for="fila in camposFormulario" :key="fila.id">
          <div v-for="campo in fila.campos" :key="campo.nombre" :class="['campo', campo.clase]">
            <label>{{ campo.label }}</label>
            <input type="text" class="input-wireframe" />
          </div>
        </div>

        <div class="botones-accion">
          <button class="btn btn-borrar">Borrar todo</button>
          <button class="btn btn-guardar">Guardar</button>
          <button class="btn btn-anadir">Añadir</button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'

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
      camposFormulario: [
        {
          id: 1,
          campos: [
            { nombre: 'usuario', label: 'Usuario:', clase: '' },
            { nombre: 'centroTrabajo', label: 'Centro de Trabajo:', clase: '' },
            { nombre: 'procesador', label: 'Procesador:', clase: '' },
          ],
        },
        {
          id: 2,
          campos: [
            { nombre: 'cargo', label: 'Cargo:', clase: '' },
            { nombre: 'marca', label: 'Marca:', clase: '' },
            { nombre: 'estado', label: 'Estado:', clase: '' },
          ],
        },
        {
          id: 3,
          campos: [
            { nombre: 'tiempo', label: 'Tiempo: 00:00 Límite: 30:00', clase: 'tiempo' },
            { nombre: 'modelo', label: 'Modelo:', clase: '' },
            { nombre: 'colaborador', label: 'Colaborador:', clase: '' },
          ],
        },
        {
          id: 4,
          campos: [
            { nombre: 'ns', label: 'N/S:', clase: '' },
            { nombre: 'ubicacion', label: 'Ubicación:', clase: '' },
          ],
        },
        {
          id: 5,
          campos: [
            { nombre: 'tipo', label: 'Tipo:', clase: '' },
            { nombre: 'observaciones', label: 'Observaciones:', clase: '' },
          ],
        },
        {
          id: 6,
          campos: [
            { nombre: 'ram', label: 'RAM:', clase: '' },
            { nombre: 'fechaRegistro', label: 'Fecha de registro:', clase: '' },
          ],
        },
        {
          id: 7,
          campos: [{ nombre: 'almacenamiento', label: 'Almacenamiento:', clase: '' }],
        },
      ],
    }
  },
})
</script>

<style scoped src="../styles/registros.css"></style>
