<template>
  <div class="dashboard">
    <h1>HOME</h1>

    <!-- Resumen -->
    <div class="seccion">
      <h2>Resumen</h2>
      <div class="resumen">
        <div class="item-resumen">
          <span class="label">Equipos de cómputo</span>
          <span class="valor">25</span>
        </div>
        <div class="item-resumen">
          <span class="label">Monitores</span>
          <span class="valor">18</span>
        </div>
        <div class="item-resumen">
          <span class="label">Teclados</span>
          <span class="valor">22</span>
        </div>
        <div class="item-resumen">
          <span class="label">Teléfonos</span>
          <span class="valor">15</span>
        </div>
      </div>
    </div>

    <!-- Cambios recientes -->
    <div class="seccion">
      <h2>Cambios recientes</h2>
      <div class="tabla-contenedor">
        <table class="tabla">
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

    <!-- Antivirus -->
    <div class="seccion">
      <div class="encabezado-antivirus">
        <h2>Próximos antivirus por expirar:</h2>
        <div class="periodos">
          <strong>Próximos</strong>
          <strong>meses</strong>
        </div>
      </div>
      <div class="tabla-contenedor">
        <table class="tabla">
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
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple, sin complicaciones
</script>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #1e40af;
  margin-bottom: 30px;
  font-size: 28px;
}

h2 {
  color: #1e40af;
  margin-bottom: 15px;
  font-size: 20px;
}

.seccion {
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

/* Resumen */
.resumen {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.item-resumen {
  text-align: center;
  padding: 15px;
  background: #f8fafc;
  border-radius: 6px;
}

.label {
  display: block;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 5px;
}

.valor {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #1e40af;
}

/* Tablas */
.tabla-contenedor {
  overflow-x: auto;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.tabla th {
  background: #1e40af;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: bold;
}

.tabla td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.tabla tr:last-child td {
  border-bottom: none;
}

.tabla tr:hover {
  background: #f1f5f9;
}

/* Encabezado antivirus */
.encabezado-antivirus {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.periodos {
  display: flex;
  gap: 20px;
}

.periodos strong {
  color: #1e40af;
}
</style>
