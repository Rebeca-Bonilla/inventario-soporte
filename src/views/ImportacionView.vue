<template>
  <div class="importacion-wireframe">
    <div class="titulo-pagina">IMPORTACIÓN</div>

    <div class="contenido-importacion">
      <div class="area-importacion">
        <p>Arrastra archivos CSV o Excel aquí</p>
        <p>o</p>
        <button class="btn-seleccionar">Seleccionar archivo</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImportacionView',
  // 👇 QUITAR el import y components
})
</script>

<style scoped src="../styles/importacion.css"></style>
