import { useState, useEffect, useRef } from 'react';

const TemporizadorPomodoro = () => {
  // Constantes
  const TIEMPO_INICIAL = 1500; // 25 minutos en segundos
  const TIEMPO_DESCANSO = 300; // 5 minutos en segundos

  // Estados
  const [tiempo, setTiempo] = useState(TIEMPO_INICIAL);
  const [estaActivo, setEstaActivo] = useState(false);
  const [modo, setModo] = useState('trabajo'); // 'trabajo' o 'descanso'
  const [alertaMostrada, setAlertaMostrada] = useState(false);

  // Referencia para el intervalo
  const intervaloRef = useRef(null);

  // Formatear tiempo en MM:SS
  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
  };

  // Efecto para manejar el intervalo
  useEffect(() => {
    // Si el temporizador está activo y el tiempo es mayor a 0
    if (estaActivo && tiempo > 0) {
      // Crear el intervalo
      intervaloRef.current = setInterval(() => {
        setTiempo(prevTiempo => {
          const nuevoTiempo = prevTiempo - 1;
          // Si llega a 0, detener y mostrar alerta
          if (nuevoTiempo === 0) {
            setEstaActivo(false);
            setAlertaMostrada(true);
            // Limpiar el intervalo cuando llegue a 0
            if (intervaloRef.current) {
              clearInterval(intervaloRef.current);
              intervaloRef.current = null;
            }
            // Mostrar alerta nativa
            if (modo === 'trabajo') {
              alert('⏰ ¡Tiempo de trabajo completado! Toma un descanso de 5 minutos.');
            } else {
              alert('☕ ¡Descanso completado! Vuelve al trabajo.');
            }
            return 0;
          }
          return nuevoTiempo;
        });
      }, 1000);
    } else {
      // Limpiar el intervalo si está activo y no debería estarlo
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
    }

    // Función de limpieza
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
    };
  }, [estaActivo, tiempo]); // Dependencias

  // Función para iniciar el temporizador
  const iniciar = () => {
    if (tiempo > 0) {
      setEstaActivo(true);
      setAlertaMostrada(false);
    }
  };

  // Función para pausar el temporizador
  const pausar = () => {
    setEstaActivo(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  // Función para reiniciar el temporizador
  const reiniciar = () => {
    // Detener el temporizador
    setEstaActivo(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    // Resetear el tiempo según el modo
    setTiempo(modo === 'trabajo' ? TIEMPO_INICIAL : TIEMPO_DESCANSO);
    setAlertaMostrada(false);
  };

  // Función para cambiar de modo
  const cambiarModo = (nuevoModo) => {
    if (estaActivo) {
      // Si está activo, pausar primero
      pausar();
    }
    setModo(nuevoModo);
    setTiempo(nuevoModo === 'trabajo' ? TIEMPO_INICIAL : TIEMPO_DESCANSO);
    setAlertaMostrada(false);
  };

  // Función para calcular el progreso
  const calcularProgreso = () => {
    const total = modo === 'trabajo' ? TIEMPO_INICIAL : TIEMPO_DESCANSO;
    return ((total - tiempo) / total) * 100;
  };

  // Función para obtener el color según el modo
  const getColor = () => {
    if (modo === 'trabajo') {
      return tiempo <= 60 ? '#e74c3c' : '#2ecc71';
    } else {
      return '#3498db';
    }
  };

  // Verificar si el tiempo es cero
  const tiempoCero = tiempo === 0;

  return (
    <div style={{
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '16px',
      border: `3px solid ${getColor()}`,
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      maxWidth: '500px',
      margin: '0 auto',
      transition: 'border-color 0.5s ease'
    }}>
      {/* Título */}
      <h2 style={{
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '10px',
        fontSize: '1.5rem'
      }}>
        🍅 Temporizador Pomodoro
      </h2>

      {/* Modo actual */}
      <div style={{
        textAlign: 'center',
        marginBottom: '15px'
      }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 20px',
          borderRadius: '20px',
          backgroundColor: modo === 'trabajo' ? '#2ecc71' : '#3498db',
          color: 'white',
          fontWeight: '600',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {modo === 'trabajo' ? '💪 Trabajo' : '☕ Descanso'}
        </span>
      </div>

      {/* Display del tiempo */}
      <div style={{
        fontSize: '4.5rem',
        fontWeight: '700',
        textAlign: 'center',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        fontFamily: 'monospace',
        color: tiempoCero ? '#e74c3c' : getColor(),
        transition: 'color 0.3s ease'
      }}>
        {formatearTiempo(tiempo)}
      </div>

      {/* Barra de progreso */}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${calcularProgreso()}%`,
          height: '100%',
          backgroundColor: getColor(),
          transition: 'width 1s linear, background-color 0.5s ease',
          borderRadius: '4px'
        }} />
      </div>

      {/* Alertas visuales */}
      {tiempoCero && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '2px solid #ffc107',
          marginBottom: '15px',
          textAlign: 'center',
          color: '#856404',
          fontWeight: '600'
        }}>
          {modo === 'trabajo' 
            ? '⏰ ¡Tiempo de trabajo completado! Toma un descanso.' 
            : '☕ ¡Descanso completado! Vuelve al trabajo.'}
        </div>
      )}

      {tiempo <= 60 && tiempo > 0 && (
        <div style={{
          padding: '8px',
          backgroundColor: '#f8d7da',
          borderRadius: '6px',
          marginBottom: '15px',
          textAlign: 'center',
          color: '#721c24',
          fontSize: '0.9rem',
          animation: 'pulse 1s ease-in-out infinite'
        }}>
          ⚠️ ¡Queda menos de 1 minuto!
        </div>
      )}

      {/* Botones de control */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <button
          onClick={iniciar}
          disabled={estaActivo || tiempoCero}
          style={{
            padding: '12px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: estaActivo || tiempoCero ? 'not-allowed' : 'pointer',
            opacity: estaActivo || tiempoCero ? 0.5 : 1,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!estaActivo && !tiempoCero) {
              e.currentTarget.style.backgroundColor = '#27ae60';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2ecc71';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ▶ Iniciar
        </button>

        <button
          onClick={pausar}
          disabled={!estaActivo}
          style={{
            padding: '12px',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: !estaActivo ? 'not-allowed' : 'pointer',
            opacity: !estaActivo ? 0.5 : 1,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (estaActivo) {
              e.currentTarget.style.backgroundColor = '#e67e22';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f39c12';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ⏸ Pausar
        </button>

        <button
          onClick={reiniciar}
          disabled={!estaActivo && tiempo === (modo === 'trabajo' ? TIEMPO_INICIAL : TIEMPO_DESCANSO)}
          style={{
            padding: '12px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: !estaActivo && tiempo === (modo === 'trabajo' ? TIEMPO_INICIAL : TIEMPO_DESCANSO) ? 'not-allowed' : 'pointer',
            opacity: !estaActivo && tiempo === (modo === 'trabajo' ? TIEMPO_INICIAL : TIEMPO_DESCANSO) ? 0.5 : 1,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (estaActivo || tiempo !== (modo === 'trabajo' ? TIEMPO_INICIAL : TIEMPO_DESCANSO)) {
              e.currentTarget.style.backgroundColor = '#c0392b';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#e74c3c';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🔄 Reiniciar
        </button>
      </div>

      {/* Botones de cambio de modo */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px'
      }}>
        <button
          onClick={() => cambiarModo('trabajo')}
          style={{
            padding: '10px',
            backgroundColor: modo === 'trabajo' ? '#2ecc71' : '#e9ecef',
            color: modo === 'trabajo' ? 'white' : '#2c3e50',
            border: `2px solid ${modo === 'trabajo' ? '#2ecc71' : '#dee2e6'}`,
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (modo !== 'trabajo') {
              e.currentTarget.style.backgroundColor = '#f1f3f5';
            }
          }}
          onMouseLeave={(e) => {
            if (modo !== 'trabajo') {
              e.currentTarget.style.backgroundColor = '#e9ecef';
            }
          }}
        >
          💪 Trabajo (25min)
        </button>

        <button
          onClick={() => cambiarModo('descanso')}
          style={{
            padding: '10px',
            backgroundColor: modo === 'descanso' ? '#3498db' : '#e9ecef',
            color: modo === 'descanso' ? 'white' : '#2c3e50',
            border: `2px solid ${modo === 'descanso' ? '#3498db' : '#dee2e6'}`,
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (modo !== 'descanso') {
              e.currentTarget.style.backgroundColor = '#f1f3f5';
            }
          }}
          onMouseLeave={(e) => {
            if (modo !== 'descanso') {
              e.currentTarget.style.backgroundColor = '#e9ecef';
            }
          }}
        >
          ☕ Descanso (5min)
        </button>
      </div>

      {/* Información adicional */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: '#7f8c8d',
        textAlign: 'center'
      }}>
        <p style={{ margin: '2px 0' }}>
          <strong>Estado:</strong> {estaActivo ? '▶️ Ejecutando' : tiempoCero ? '⏹️ Finalizado' : '⏸️ En pausa'}
        </p>
        <p style={{ margin: '2px 0', fontSize: '0.75rem' }}>
          {modo === 'trabajo' ? '💪 Enfoque total' : '☕ Tiempo de recuperación'}
        </p>
      </div>

      {/* Estilos para la animación de pulso */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default TemporizadorPomodoro;