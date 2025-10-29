export const equipoTemplates = {
  Cómputo: {
    campos: [
      {
        nombre: 'usuario',
        label: 'Usuario:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Nombre del usuario',
      },
      {
        nombre: 'centro_trabajo',
        label: 'Centro de Trabajo:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Ej: CITIZENS',
      },
      {
        nombre: 'marca',
        label: 'Marca:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Ej: Dell, HP',
      },
      {
        nombre: 'modelo',
        label: 'Modelo:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Ej: Latitude 5420',
      },
      {
        nombre: 'numero_serie',
        label: 'N/S:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Número de serie',
      },
      { nombre: 'ram', label: 'RAM:', tipo: 'text', placeholder: 'Ej: 8GB, 16GB' },
      {
        nombre: 'almacenamiento',
        label: 'Almacenamiento:',
        tipo: 'text',
        placeholder: 'Ej: 256GB SSD',
      },
      { nombre: 'procesador', label: 'Procesador:', tipo: 'text', placeholder: 'Ej: Intel i5' },
      {
        nombre: 'estado',
        label: 'Estado:',
        tipo: 'select',
        opciones: ['Activo', 'Mantenimiento', 'Baja'],
      },
      {
        nombre: 'colaborador',
        label: 'Colaborador:',
        tipo: 'text',
        placeholder: 'Nombre del colaborador',
      },
      { nombre: 'ubicacion', label: 'Ubicación:', tipo: 'text', placeholder: 'Ej: OF-05' },
      {
        nombre: 'observaciones',
        label: 'Observaciones:',
        tipo: 'textarea',
        placeholder: 'Observaciones adicionales...',
      },
    ],
  },
  Teléfonos: {
    campos: [
      {
        nombre: 'usuario',
        label: 'Usuario:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Nombre del usuario',
      },
      {
        nombre: 'centro_trabajo',
        label: 'Centro de Trabajo:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Ej: CITIZENS',
      },
      {
        nombre: 'marca',
        label: 'Marca:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Ej: iPhone, Samsung',
      },
      {
        nombre: 'modelo',
        label: 'Modelo:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Ej: iPhone 13',
      },
      {
        nombre: 'numero_serie',
        label: 'N/S:',
        tipo: 'text',
        requerido: true,
        placeholder: 'Número de serie',
      },
      {
        nombre: 'numero_celular',
        label: 'Número Celular:',
        tipo: 'text',
        placeholder: 'Número de teléfono',
      },
      {
        nombre: 'estado',
        label: 'Estado:',
        tipo: 'select',
        opciones: ['Activo', 'Mantenimiento', 'Baja'],
      },
      {
        nombre: 'colaborador',
        label: 'Colaborador:',
        tipo: 'text',
        placeholder: 'Nombre del colaborador',
      },
      {
        nombre: 'observaciones',
        label: 'Observaciones:',
        tipo: 'textarea',
        placeholder: 'Observaciones adicionales...',
      },
    ],
  },
  // ... otras categorías
}

export type Categoria = keyof typeof equipoTemplates
