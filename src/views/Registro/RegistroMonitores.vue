<!-- src/views/registro/RegistroMonitores.vue -->
<template>
  <div class="registro-monitores">
    <!-- Tiempo de sesión -->
    <div class="tiempo-sesion-inline">Tiempo: 00:00 Límite: 30:00</div>

    <!-- Formulario estilo wireframe -->
    <div class="formulario-wireframe">
      <!-- Primera columna -->
      <div class="columna-formulario">
        <div class="campo-wireframe">
          <label class="etiqueta">Usuario:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Código:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Técnico:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>
      </div>

      <!-- Segunda columna -->
      <div class="columna-formulario">
        <div class="campo-wireframe">
          <label class="etiqueta">Centro de Trabajo:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Marca:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Estado:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>
      </div>

      <!-- Tercera columna -->
      <div class="columna-formulario">
        <div class="campo-wireframe tiempo-especial">
          <label class="etiqueta">Tiempo: 00:00 Límite: 30:00</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Modelo:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Colaborador:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>
      </div>

      <!-- Cuarta columna -->
      <div class="columna-formulario">
        <div class="campo-wireframe">
          <label class="etiqueta">N/S:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Ubicación:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>
      </div>

      <!-- Quinta columna -->
      <div class="columna-formulario">
        <div class="campo-wireframe">
          <label class="etiqueta">Dimensión:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Observaciones:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>
      </div>

      <!-- Sexta columna -->
      <div class="columna-formulario">
        <div class="campo-wireframe">
          <label class="etiqueta">Puertos disponibles:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>

        <div class="campo-wireframe">
          <label class="etiqueta">Fecha de registro:</label>
          <div class="input-container">
            <div class="input-placeholder"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="botones-accion">
      <button class="btn btn-borrar">Borrar todo</button>
      <button class="btn btn-guardar">Guardar</button>
      <button class="btn btn-anadir">Añadir</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegistroMonitores',
})
</script>

<style scoped>
.registro-monitores {
  max-width: 1400px;
  margin: 0 auto;
}

.tiempo-sesion-inline {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #666;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
}

.formulario-wireframe {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.columna-formulario {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.campo-wireframe {
  display: flex;
  flex-direction: column;
}

.campo-wireframe.tiempo-especial .etiqueta {
  font-weight: bold;
  color: #666;
}

.etiqueta {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
  font-size: 12px;
}

.input-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  background: white;
  min-height: 35px;
  display: flex;
  align-items: center;
}

.input-placeholder {
  width: 100%;
  height: 20px;
  background: #f8f9fa;
  border-radius: 2px;
}

.botones-accion {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn-borrar {
  background: #dc3545;
  color: white;
}

.btn-guardar {
  background: #28a745;
  color: white;
}

.btn-anadir {
  background: #007bff;
  color: white;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1200px) {
  .formulario-wireframe {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .formulario-wireframe {
    grid-template-columns: repeat(2, 1fr);
  }

  .botones-accion {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
