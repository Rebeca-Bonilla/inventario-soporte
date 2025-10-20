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
        <div class="fila-formulario">
          <div class="campo">
            <label>Usuario:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Centro de Trabajo:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Procesador:</label>
            <input type="text" class="input-wireframe" />
          </div>
        </div>

        <div class="fila-formulario">
          <div class="campo">
            <label>Cargo:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Marca:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Estado:</label>
            <input type="text" class="input-wireframe" />
          </div>
        </div>

        <div class="fila-formulario">
          <div class="campo tiempo">
            <label>Tiempo: 00:00 Límite: 30:00</label>
          </div>
          <div class="campo">
            <label>Modelo:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Colaborador:</label>
            <input type="text" class="input-wireframe" />
          </div>
        </div>

        <div class="fila-formulario">
          <div class="campo">
            <label>N/S:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Ubicación:</label>
            <input type="text" class="input-wireframe" />
          </div>
        </div>

        <div class="fila-formulario">
          <div class="campo">
            <label>Tipo:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Observaciones:</label>
            <input type="text" class="input-wireframe" />
          </div>
        </div>

        <div class="fila-formulario">
          <div class="campo">
            <label>RAM:</label>
            <input type="text" class="input-wireframe" />
          </div>
          <div class="campo">
            <label>Fecha de registro:</label>
            <input type="text" class="input-wireframe" />
          </div>
        </div>

        <div class="fila-formulario">
          <div class="campo">
            <label>Almacenamiento:</label>
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
    }
  },
})
</script>

<style scoped src="../styles/registros.css"></style>
