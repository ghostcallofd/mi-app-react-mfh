import { useState } from 'react';
const Acordeon = ({ titulo, children }) => {
  // Estado para controlar si el acordeón está expandido
  const [expandido, setExpandido] = useState(false);

  // Función para alternar el estado
  const toggleExpandido = () => {
    setExpandido(!expandido);
  };

  return (
    <div style={{
      marginBottom: '12px',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    }}>
      {/* Cabecera del acordeón - siempre visible */}
      <div
        onClick={toggleExpandido}
        style={{
          padding: '14px 20px',
          backgroundColor: expandido ? '#f8f9fa' : 'white',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background-color 0.2s ease',
          borderBottom: expandido ? '1px solid #dee2e6' : 'none',
          userSelect: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = expandido ? '#f8f9fa' : '#f1f3f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = expandido ? '#f8f9fa' : 'white';
        }}
      >
        <h3 style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: '600',
          color: '#2c3e50'
        }}>
          {titulo}
        </h3>
        <span style={{
          fontSize: '1.2rem',
          color: '#7f8c8d',
          transition: 'transform 0.3s ease',
          display: 'inline-block'
        }}>
          {expandido ? '▼' : '▶'}
        </span>
      </div>

      {/* Contenido del acordeón - condicional */}
      {expandido && (
        <div style={{
          padding: '16px 20px',
          backgroundColor: 'white',
          animation: 'slideDown 0.3s ease forwards'
        }}>
          {children}
        </div>
      )}

      {/* Estilos para la animación */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Acordeon;