import { useState, useEffect, useRef, useCallback } from 'react';

const useNotificacion = (duracion = 3000) => {
  // Estado para la notificación actual
  const [notificacion, setNotificacion] = useState(null);
  
  // Referencia para el timeout
  const timeoutRef = useRef(null);

  // Contador para IDs únicos
  const idCounterRef = useRef(0);

  // Función para limpiar el timeout existente
  const limpiarTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Efecto para manejar el timeout automático
  useEffect(() => {
    // Si no hay notificación, no hacer nada
    if (!notificacion) {
      return;
    }

    // Limpiar cualquier timeout anterior
    limpiarTimeout();

    // Configurar nuevo timeout para cerrar automáticamente
    timeoutRef.current = setTimeout(() => {
      setNotificacion(null);
      timeoutRef.current = null;
    }, duracion);

    // Función de limpieza: cancelar el timeout si el componente se desmonta
    // o si se muestra una nueva notificación antes de que expire la anterior
    return () => {
      limpiarTimeout();
    };
  }, [notificacion, duracion, limpiarTimeout]);

  // Función para mostrar una notificación
  const mostrar = useCallback((mensaje, tipo = 'info') => {
    // Limpiar cualquier timeout existente
    limpiarTimeout();

    // Crear nueva notificación con ID único
    const nuevaNotificacion = {
      id: idCounterRef.current++,
      mensaje,
      tipo,
      timestamp: new Date().toISOString()
    };

    setNotificacion(nuevaNotificacion);
  }, [limpiarTimeout]);

  // Función para cerrar la notificación manualmente
  const cerrar = useCallback(() => {
    limpiarTimeout();
    setNotificacion(null);
  }, [limpiarTimeout]);

  return {
    notificacion,
    mostrar,
    cerrar
  };
};

export default useNotificacion;