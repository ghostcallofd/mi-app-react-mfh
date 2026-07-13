import { useState, useEffect } from 'react';

const useLocalStorage = (clave, valorInicial) => {
  // Función para leer el valor de localStorage de forma lazy (solo al montar)
  const leerValorInicial = () => {
    try {
      // Verificar si localStorage está disponible
      if (typeof window === 'undefined' || !window.localStorage) {
        return valorInicial;
      }

      const itemGuardado = localStorage.getItem(clave);
      
      if (itemGuardado !== null) {
        // Intentar parsear el JSON
        const parsed = JSON.parse(itemGuardado);
        return parsed;
      }

      // Si el valor inicial es una función, ejecutarla
      return typeof valorInicial === 'function' ? valorInicial() : valorInicial;
    } catch (error) {
      // Manejar errores silenciosamente
      console.warn(`Error al leer localStorage (clave: ${clave}):`, error);
      return typeof valorInicial === 'function' ? valorInicial() : valorInicial;
    }
  };

  // Estado para almacenar el valor actual
  const [valor, setValor] = useState(leerValorInicial);

  // Efecto para sincronizar con localStorage cuando cambia el valor
  useEffect(() => {
    try {
      // Verificar si localStorage está disponible
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }

      // Guardar en localStorage
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      // Manejar errores silenciosamente
      console.warn(`Error al guardar en localStorage (clave: ${clave}):`, error);
    }
  }, [clave, valor]);

  // Función setter que actualiza el estado
  const setValorConSincronizacion = (nuevoValor) => {
    try {
      // Si nuevoValor es una función, ejecutarla
      const valorAActualizar = typeof nuevoValor === 'function' 
        ? nuevoValor(valor) 
        : nuevoValor;
      
      setValor(valorAActualizar);
    } catch (error) {
      console.warn(`Error al actualizar valor (clave: ${clave}):`, error);
    }
  };

  return [valor, setValorConSincronizacion];
};

export default useLocalStorage;