<template>
  <AppLayout>
    <div class="consulta-wireframe">
      <div class="titulo-pagina">CONSULTA</div>

      <div class="barra-herramientas">
        <button class="btn-herramienta">Filtrar</button>
        <button class="btn-herramienta">Exportar</button>
        <button class="btn-herramienta">Editar</button>

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

      <div class="tabla-consulta-container">
        <table class="tabla-wireframe">
          <thead>
            <tr>
              <th>Centro de Trabajo</th>
              <th>Equipo</th>
              <th>Modelo</th>
              <th>N/S</th>
              <th>Dirección MAC/IP asignada</th>
              <th>RAM</th>
              <th>Almacenamiento</th>
              <th>Procesador</th>
              <th>Estado</th>
              <th>Colaborador</th>
              <th>Ubicación</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 5" :key="i">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
    }
  },
})
</script>

<style scoped src="../styles/consulta.css"></style>
