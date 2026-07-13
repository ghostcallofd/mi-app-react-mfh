import React, { useState } from 'react';
import BotonAccion from './BotonAccion';
import Alerta from './Alerta';

const Contador = () => {
  // Estado del contador
  const [contador, setContador] = useState(0);

  // Funciones de actualización usando la forma funcional
  const incrementar = () => {
    setContador(prev => prev + 1);
  };

  const decrementar = () => {
    setContador(prev => {
      // No permitir valores negativos
      if (prev <= 0) return 0;
      return prev - 1;
    });
  };

  const incrementarCinco = () => {
    setContador(prev => prev + 5);
  };

  const reiniciar = () => {
    setContador(prev => 0);
  };

  // Verificar si el contador está en cero
  const estaEnCero = contador === 0;
  const esAlto = contador > 10;

  return (
    <div style={{
      padding: '25px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <h3 style={{
        color: '#2c3e50',
        marginBottom: '15px',
        textAlign: 'center',
        fontSize: '1.3rem'
      }}>
        🔢 Contador
      </h3>

      {/* Display del contador */}
      <div style={{
        fontSize: '4rem',
        fontWeight: '700',
        textAlign: 'center',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: `3px solid ${esAlto ? '#ff9800' : estaEnCero ? '#3498db' : '#e9ecef'}`,
        color: esAlto ? '#e65100' : estaEnCero ? '#0d47a1' : '#2c3e50',
        transition: 'all 0.3s ease'
      }}>
        {contador}
      </div>

      {/* Alertas condicionales */}
      {estaEnCero && (
        <Alerta tipo="info" titulo="Contador en Cero">
          El contador está en cero. ¡Puedes comenzar a sumar!
        </Alerta>
      )}

      {esAlto && (
        <Alerta tipo="advertencia" titulo="¡Valor Alto!">
          El contador ha superado el valor de 10. Considera reiniciarlo si es necesario.
        </Alerta>
      )}

      {/* Botones de control */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginTop: '15px'
      }}>
        <BotonAccion
          texto="➖ Decrementar"
          variante="secundario"
          disabled={estaEnCero}
          onClick={decrementar}
        />
        
        <BotonAccion
          texto="➕ Incrementar"
          variante="primario"
          onClick={incrementar}
        />

        <BotonAccion
          texto="➕➕ Incrementar +5"
          variante="primario"
          onClick={incrementarCinco}
        />

        <BotonAccion
          texto="🔄 Reiniciar"
          variante="peligro"
          disabled={estaEnCero}
          onClick={reiniciar}
        />
      </div>

      {/* Información adicional */}
      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#f1f3f5',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: '#7f8c8d',
        textAlign: 'center'
      }}>
        <span>Estado: {estaEnCero ? '🔵 En cero' : esAlto ? '🟠 Alto' : '🟢 Normal'}</span>
        <span style={{ margin: '0 8px' }}>•</span>
        <span>Valor actual: {contador}</span>
      </div>
    </div>
  );
};

export default Contador;