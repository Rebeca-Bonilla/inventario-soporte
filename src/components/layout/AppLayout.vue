<template>
  <aside class="app-sidebar">
    <div class="sidebar-content">
      <!-- Información del sistema -->
      <div class="sidebar-section">
        <h3>Información del Sistema</h3>
        <div class="system-info">
          <div class="info-item">
            <span class="info-label">Equipos activos:</span>
            <span class="info-value">45</span>
          </div>
          <div class="info-item">
            <span class="info-label">Usuarios:</span>
            <span class="info-value">23</span>
          </div>
          <div class="info-item">
            <span class="info-label">Última actualización:</span>
            <span class="info-value">Hoy</span>
          </div>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="sidebar-section">
        <h3>Acciones Rápidas</h3>
        <div class="quick-actions">
          <button class="quick-btn" @click="nuevoEquipo">➕ Nuevo Equipo</button>
          <button class="quick-btn" @click="generarReporte">📊 Generar Reporte</button>
          <button class="quick-btn" @click="buscarAvanzado">🔍 Búsqueda Avanzada</button>
        </div>
      </div>

      <!-- Filtros comunes -->
      <div class="sidebar-section">
        <h3>Filtros Rápidos</h3>
        <div class="filters">
          <div class="filter-group">
            <label>Por Estado:</label>
            <select class="filter-select">
              <option>Todos</option>
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Mantenimiento</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Por Ubicación:</label>
            <select class="filter-select">
              <option>Todas</option>
              <option>Sede Central</option>
              <option>Sucursal Norte</option>
              <option>Sucursal Sur</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Enlaces de ayuda -->
      <div class="sidebar-section">
        <h3>Ayuda</h3>
        <div class="help-links">
          <a href="#" class="help-link">📖 Manual de Usuario</a>
          <a href="#" class="help-link">❓ Soporte Técnico</a>
          <a href="#" class="help-link">🔄 Actualizar Sistema</a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const nuevoEquipo = () => {
  router.push('/registro')
}

const generarReporte = () => {
  router.push('/reportes')
}

const buscarAvanzado = () => {
  // Lógica para búsqueda avanzada
  alert('Búsqueda avanzada activada')
}
</script>

<style scoped>
.app-sidebar {
  width: 280px;
  background: #34495e;
  color: white;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.sidebar-section h3 {
  margin: 0 0 15px 0;
  font-size: 1.1em;
  color: #ecf0f1;
  border-bottom: 1px solid #4a6572;
  padding-bottom: 8px;
}

.system-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.info-label {
  font-size: 0.9em;
  color: #bdc3c7;
}

.info-value {
  font-weight: bold;
  color: #3498db;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s;
  font-size: 0.9em;
}

.quick-btn:hover {
  background: #2980b9;
  transform: translateX(3px);
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 0.9em;
  color: #bdc3c7;
}

.filter-select {
  background: #2c3e50;
  color: white;
  border: 1px solid #4a6572;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.help-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.help-link {
  color: #bdc3c7;
  text-decoration: none;
  padding: 8px 0;
  transition: color 0.3s;
  font-size: 0.9em;
}

.help-link:hover {
  color: #3498db;
}
</style>
