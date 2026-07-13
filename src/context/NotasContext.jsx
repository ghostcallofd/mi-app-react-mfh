import { createContext, useReducer, useContext } from 'react';

// ============================================
// 1. ESTADO INICIAL
// ============================================
const estadoInicial = {
  notas: [
    {
      id: Date.now().toString() + '1',
      titulo: 'Reunión con el equipo de desarrollo',
      contenido: 'Discutir el roadmap del proyecto para el próximo trimestre. Revisar los avances de los sprints actuales y planificar la integración de nuevas funcionalidades.',
      categoria: 'trabajo',
      fijada: true,
      fechaCreacion: new Date(Date.now() - 86400000 * 2).toISOString() // 2 días atrás
    },
    {
      id: Date.now().toString() + '2',
      titulo: 'Comprar libros de React',
      contenido: 'Comprar "React: La Guía Completa" y "React Hooks en Profundidad". También buscar recursos sobre Next.js y TypeScript para el proyecto personal.',
      categoria: 'estudio',
      fijada: false,
      fechaCreacion: new Date(Date.now() - 86400000 * 1).toISOString() // 1 día atrás
    },
    {
      id: Date.now().toString() + '3',
      titulo: 'Ideas para el nuevo proyecto',
      contenido: 'Desarrollar una aplicación de gestión de tareas con enfoque en productividad personal. Incluir funcionalidades como pomodoro, seguimiento de hábitos y estadísticas de progreso.',
      categoria: 'ideas',
      fijada: true,
      fechaCreacion: new Date().toISOString() // hoy
    },
    {
      id: Date.now().toString() + '4',
      titulo: 'Recordatorio: Cita médica',
      contenido: 'Cita con el oftalmólogo el viernes a las 10:00 AM. No olvidar llevar los anteojos y los resultados de análisis anteriores.',
      categoria: 'personal',
      fijada: false,
      fechaCreacion: new Date(Date.now() - 86400000 * 3).toISOString() // 3 días atrás
    },
    {
      id: Date.now().toString() + '5',
      titulo: 'Preparar presentación para el cliente',
      contenido: 'Crear presentación sobre el avance del proyecto. Incluir demos de las funcionalidades implementadas y métricas de rendimiento. Ensayar la presentación 2 veces antes de la reunión.',
      categoria: 'trabajo',
      fijada: false,
      fechaCreacion: new Date(Date.now() - 86400000 * 1).toISOString() // 1 día atrás
    },
    {
      id: Date.now().toString() + '6',
      titulo: 'Aprender sobre Context API',
      contenido: 'Estudiar en profundidad el uso de Context API para manejo de estado global. Practicar con ejemplos de autenticación y temas. Comparar con Redux para entender cuándo usar cada uno.',
      categoria: 'estudio',
      fijada: false,
      fechaCreacion: new Date().toISOString() // hoy
    }
  ],
  filtroCategoria: 'todas',
  busqueda: ''
};

// ============================================
// 2. TIPOS DE ACCIONES
// ============================================
const TIPOS = {
  AGREGAR_NOTA: 'AGREGAR_NOTA',
  ELIMINAR_NOTA: 'ELIMINAR_NOTA',
  EDITAR_NOTA: 'EDITAR_NOTA',
  TOGGLE_FIJADA: 'TOGGLE_FIJADA',
  CAMBIAR_FILTRO: 'CAMBIAR_FILTRO',
  CAMBIAR_BUSQUEDA: 'CAMBIAR_BUSQUEDA'
};

// ============================================
// 3. REDUCER
// ============================================
const reducer = (estado, accion) => {
  switch (accion.tipo) {
    case TIPOS.AGREGAR_NOTA: {
      const nuevaNota = {
        ...accion.payload,
        id: Date.now().toString(),
        fechaCreacion: new Date().toISOString()
      };
      return {
        ...estado,
        notas: [nuevaNota, ...estado.notas] // Agregar al inicio
      };
    }

    case TIPOS.ELIMINAR_NOTA: {
      return {
        ...estado,
        notas: estado.notas.filter(nota => nota.id !== accion.payload)
      };
    }

    case TIPOS.EDITAR_NOTA: {
      return {
        ...estado,
        notas: estado.notas.map(nota =>
          nota.id === accion.payload.id
            ? { ...nota, ...accion.payload.datos }
            : nota
        )
      };
    }

    case TIPOS.TOGGLE_FIJADA: {
      return {
        ...estado,
        notas: estado.notas.map(nota =>
          nota.id === accion.payload
            ? { ...nota, fijada: !nota.fijada }
            : nota
        )
      };
    }

    case TIPOS.CAMBIAR_FILTRO: {
      return {
        ...estado,
        filtroCategoria: accion.payload
      };
    }

    case TIPOS.CAMBIAR_BUSQUEDA: {
      return {
        ...estado,
        busqueda: accion.payload
      };
    }

    default:
      return estado;
  }
};

// ============================================
// 4. CREACIÓN DEL CONTEXTO
// ============================================
const NotasContext = createContext(null);

// ============================================
// 5. PROVIDER
// ============================================
export const NotasProvider = ({ children }) => {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);

  // Funciones de acción con nombres descriptivos
  const agregarNota = (datos) => {
    dispatch({ tipo: TIPOS.AGREGAR_NOTA, payload: datos });
  };

  const eliminarNota = (id) => {
    dispatch({ tipo: TIPOS.ELIMINAR_NOTA, payload: id });
  };

  const editarNota = (id, datos) => {
    dispatch({ tipo: TIPOS.EDITAR_NOTA, payload: { id, datos } });
  };

  const toggleFijada = (id) => {
    dispatch({ tipo: TIPOS.TOGGLE_FIJADA, payload: id });
  };

  const cambiarFiltro = (categoria) => {
    dispatch({ tipo: TIPOS.CAMBIAR_FILTRO, payload: categoria });
  };

  const cambiarBusqueda = (texto) => {
    dispatch({ tipo: TIPOS.CAMBIAR_BUSQUEDA, payload: texto });
  };

  // Valor del contexto
  const valor = {
    // Estado
    notas: estado.notas,
    filtroCategoria: estado.filtroCategoria,
    busqueda: estado.busqueda,
    // Acciones
    agregarNota,
    eliminarNota,
    editarNota,
    toggleFijada,
    cambiarFiltro,
    cambiarBusqueda
  };

  return (
    <NotasContext.Provider value={valor}>
      {children}
    </NotasContext.Provider>
  );
};

// ============================================
// 6. CUSTOM HOOK
// ============================================
export const useNotas = () => {
  const contexto = useContext(NotasContext);
  
  if (!contexto) {
    throw new Error('useNotas debe ser usado dentro de un NotasProvider');
  }
  
  return contexto;
};
