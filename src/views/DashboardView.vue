<template>
  <div class="dashboard-wireframe">
    <!-- Columna izquierda (más ancha) -->
    <div class="columna-izquierda">
      <!-- Sección Equipos -->
      <div class="seccion-equipos">
        <div class="titulo-seccion">Resumen</div>
        <table class="tabla-wireframe">
          <tbody>
            <tr>
              <td>Equipos de cómputo</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Monitores</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Teclados</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Teléfonos</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cambios recientes -->
      <div class="seccion-equipos">
        <div class="titulo-seccion">Cambios recientes</div>
        <table class="tabla-wireframe compacta">
          <thead>
            <tr>
              <th>#</th>
              <th>Cambio realizado</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 12" :key="i">
              <td>{{ i }}</td>
              <td>-</td>
              <td>-</td>
              <td>D-M-A</td>
              <td>00:00:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Columna derecha (más angosta) -->
    <div class="columna-derecha">
      <!-- Antivirus -->
      <div class="alerta-antivirus">
        Próximos antivirus por expirar:
        <div style="display: flex; gap: 15px; margin-top: 5px">
          <strong>Próximos</strong>
          <strong>meses</strong>
        </div>
      </div>

      <!-- Tabla antivirus -->
      <div class="seccion-equipos">
        <table class="tabla-wireframe compacta">
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipo</th>
              <th>Usuario</th>
              <th>N/S</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 4" :key="i">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Navegación rápida -->
      <div class="resumen-wireframe">
        <div class="titulo-seccion">Reusura</div>
        <div class="lista-categorias">
          <div>Archivados</div>
          <div>Importación</div>
          <div>Reportes</div>
          <div>Historial</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Lógica simple
</script>

<style scoped>
.dashboard-wireframe {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 120px);
  margin-left: 280px; /* Para el sidebar */
}

.columna-izquierda {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.columna-derecha {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.seccion-equipos {
  background: white;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.titulo-seccion {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
  color: #1e40af;
}

.tabla-wireframe {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-bottom: 15px;
}

.tabla-wireframe th,
.tabla-wireframe td {
  border: 1px solid #999;
  padding: 4px 6px;
  text-align: left;
}

.tabla-wireframe.compacta th,
.tabla-wireframe.compacta td {
  padding: 2px 4px;
  font-size: 11px;
}

.tabla-wireframe th {
  background: #f0f0f0;
  font-weight: bold;
}

.lista-categorias {
  font-size: 12px;
}

.lista-categorias div {
  padding: 4px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.lista-categorias div:hover {
  background: #f5f5f5;
}

.lista-categorias div:last-child {
  border-bottom: none;
}

.alerta-antivirus {
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
}

.resumen-wireframe {
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 12px;
  border-radius: 4px;
}
</style>
