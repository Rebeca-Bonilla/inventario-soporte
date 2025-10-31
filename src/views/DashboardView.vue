<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Dashboard del Sistema</h1>
      <p>Resumen general del inventario</p>
    </div>

    <!-- Tarjetas de resumen -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-content">
          <h3>Equipos de Cómputo</h3>
          <div class="stat-numbers">
            <span class="stat-main">156</span>
            <span class="stat-secondary">+12 este mes</span>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <h3>Teléfonos</h3>
          <div class="stat-numbers">
            <span class="stat-main">89</span>
            <span class="stat-secondary">+5 este mes</span>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <h3>Monitores</h3>
          <div class="stat-numbers">
            <span class="stat-main">67</span>
            <span class="stat-secondary">Sin cambios</span>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <h3>En Mantenimiento</h3>
          <div class="stat-numbers">
            <span class="stat-main">23</span>
            <span class="stat-secondary">+3 pendientes</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de actividad reciente -->
    <div class="dashboard-section">
      <div class="section-header">
        <h2>Actividad Reciente</h2>
      </div>
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-content">
            <p><strong>Nuevo equipo registrado</strong> - Laptop ThinkPad T14</p>
            <span class="activity-time">Hace 2 horas</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-content">
            <p><strong>Equipo actualizado</strong> - Monitor Dell U2419H</p>
            <span class="activity-time">Hace 5 horas</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-content">
            <p><strong>Equipo en mantenimiento</strong> - iPhone 13</p>
            <span class="activity-time">Ayer</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones rápidas -->
    <div class="dashboard-section">
      <h2>Acciones Rápidas</h2>
      <div class="quick-actions">
        <router-link to="/registro" class="quick-action">
          <span>Registrar Equipo</span>
        </router-link>
        <router-link to="/importacion" class="quick-action">
          <span>Importar Datos</span>
        </router-link>
        <router-link to="/reportes" class="quick-action">
          <span>Generar Reporte</span>
        </router-link>
        <router-link to="/equipos" class="quick-action">
          <span>Consultar Equipos</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// El dashboard mostrará datos reales cuando conectemos con la BD
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--color-white);
  min-height: calc(100vh - 80px);
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid var(--color-gray-light);
}

.dashboard-header h1 {
  color: var(--color-text-dark);
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.dashboard-header p {
  color: var(--color-primary-lila);
  font-size: 1.1rem;
  font-weight: 500;
}

/* Grid de estadísticas - diseño limpio */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--color-white);
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid var(--color-gray-light);
  transition: all 0.3s ease;
  text-align: center;
}

.stat-card:hover {
  border-color: var(--color-primary-mint);
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(163, 217, 213, 0.2);
}

.stat-content h3 {
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.stat-numbers {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-main {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-accent-green);
  line-height: 1;
}

.stat-secondary {
  font-size: 0.9rem;
  color: var(--color-primary-lila);
  font-weight: 500;
}

/* Secciones */
.dashboard-section {
  margin-bottom: 3rem;
  background: var(--color-white);
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid var(--color-gray-light);
}

.dashboard-section h2 {
  color: var(--color-text-dark);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 1px solid var(--color-gray-light);
  padding-bottom: 0.5rem;
}

/* Lista de actividad */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  padding: 1.2rem;
  background: var(--color-gray-light);
  border-radius: 8px;
  border-left: 4px solid var(--color-secondary-blue);
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: var(--color-primary-mint);
  transform: translateX(5px);
}

.activity-content p {
  margin: 0;
  color: var(--color-text-dark);
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}

.activity-time {
  font-size: 0.8rem;
  color: var(--color-primary-lila);
  font-weight: 500;
}

/* Acciones rápidas */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.quick-action {
  background: var(--color-accent-green);
  color: var(--color-white);
  padding: 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.quick-action:hover {
  background: var(--color-white);
  color: var(--color-accent-green);
  border-color: var(--color-accent-green);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(93, 138, 127, 0.3);
}
</style>
