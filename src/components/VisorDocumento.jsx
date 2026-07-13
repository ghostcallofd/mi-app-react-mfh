import { useState, useEffect } from 'react';

const VisorDocumento = () => {
  // Estado para el contador
  const [contador, setContador] = useState(0);

  // Efecto para actualizar el título de la pestaña
  useEffect(() => {
    // Guardar el título original para restaurarlo al desmontar
    const tituloOriginal = document.title;
    
    // Actualizar el título con el valor actual del contador
    document.title = `Contador: ${contador} - Mi App`;
    
    // Función de limpieza: restaurar el título original
    return () => {
      document.title = tituloOriginal;
      console.log('🧹 VisorDocumento desmontado - Título restaurado');
    };
  }, [contador]); // Dependencia: solo se ejecuta cuando contador cambia

  // Funciones para manejar el contador
  const incrementar = () => {
    setContador(prev => prev + 1);
  };

  const decrementar = () => {
    setContador(prev => prev - 1);
  };

  const reiniciar = () => {
    setContador(0);
  };

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
        📄 Visor de Documento
      </h3>

      <div style={{
        fontSize: '3rem',
        fontWeight: '700',
        textAlign: 'center',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '2px solid #3498db',
        color: '#2c3e50',
        transition: 'all 0.3s ease'
      }}>
        {contador}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <button
          onClick={decrementar}
          style={{
            padding: '12px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c0392b';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#e74c3c';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ➖ Decrementar
        </button>

        <button
          onClick={reiniciar}
          style={{
            padding: '12px',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7f8c8d';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#95a5a6';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🔄 Reiniciar
        </button>

        <button
          onClick={incrementar}
          style={{
            padding: '12px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#27ae60';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2ecc71';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ➕ Incrementar
        </button>
      </div>

      <div style={{
        padding: '12px',
        backgroundColor: '#f1f3f5',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: '#7f8c8d',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0 }}>
          📌 El título de la pestaña se actualiza automáticamente
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>
          Título actual: <strong>"Contador: {contador} - Mi App"</strong>
        </p>
      </div>
    </div>
  );
};

export default VisorDocumento;