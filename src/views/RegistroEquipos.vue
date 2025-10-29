<!-- src/views/RegistroEquipos.vue -->
<template>
  <AppLayout>
    <div class="registro-container">
      <!-- Encabezado -->
      <div class="encabezado">
        <div class="titulo-pagina">REGISTRO</div>
        </div>
      </div>

      <!-- Tabs de categorías -->
      <div class="tabs-categorias">
        <router-link
          v-for="categoria in categorias"
          :key="categoria.key"
          :to="categoria.ruta"
          :class="['tab-categoria', isActive(categoria.ruta) ? 'activa' : '']"
        >
          {{ categoria.nombre }}
        </router-link>
      </div>

      <!-- Contenido dinámico -->
      <router-view></router-view>
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
      categorias: [
        { key: 'computo', nombre: 'Cómputo', ruta: '/registro/computadoras' },
        { key: 'telefonos', nombre: 'Teléfonos', ruta: '/registro/telefonos' },
        { key: 'monitores', nombre: 'Monitores', ruta: '/registro/monitores' },
        { key: 'camaras', nombre: 'Cámaras', ruta: '/registro/camaras' },
        { key: 'tablets', nombre: 'Tablets', ruta: '/registro/tablets' },
        { key: 'terminales', nombre: 'Terminales', ruta: '/registro/terminales' },
        { key: 'otros', nombre: 'Otros', ruta: '/registro/otros' },
      ],
    }
  },
  methods: {
    isActive(ruta: string) {
      return this.$route.path === ruta
    },
  },
})
</script>

<style scoped>
.registro-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.titulo-pagina {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.info-usuario {
  text-align: right;
}

.usuario-cargo {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.tiempo-sesion {
  color: #666;
  font-size: 14px;
}

.tabs-categorias {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 20px;
}

.tab-categoria {
  padding: 10px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  color: #333;
  background: #f8f9fa;
  font-size: 12px;
  transition: all 0.3s ease;
}

.tab-categoria.activa {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.tab-categoria:hover {
  background: #e9ecef;
}
</style>
