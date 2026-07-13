import { useState, useEffect, useRef, useCallback } from 'react';

const useNotificacion = (duracion = 4000) => {
  const [notificacion, setNotificacion] = useState(null);
  const timeoutRef = useRef(null);

  const limpiarTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!notificacion) return;

    limpiarTimeout();
    timeoutRef.current = setTimeout(() => {
      setNotificacion(null);
    }, duracion);

    return () => limpiarTimeout();
  }, [notificacion, duracion, limpiarTimeout]);

  const mostrar = useCallback((mensaje, tipo = 'info') => {
    limpiarTimeout();
    setNotificacion({
      id: Date.now().toString(),
      mensaje,
      tipo,
      timestamp: new Date().toISOString()
    });
  }, [limpiarTimeout]);

  const cerrar = useCallback(() => {
    limpiarTimeout();
    setNotificacion(null);
  }, [limpiarTimeout]);

  return { notificacion, mostrar, cerrar };
};

export default useNotificacion;