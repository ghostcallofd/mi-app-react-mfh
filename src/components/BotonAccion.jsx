const BotonAccion = ({ 
  texto, 
  variante = 'primario', 
  disabled = false, 
  onClick,
  className = ''
}) => {
  // Configuración de estilos según la variante
  const estilos = {
    primario: {
      backgroundColor: '#3498db',
      color: 'white',
      borderColor: '#2980b9',
      hoverBg: '#2980b9'
    },
    secundario: {
      backgroundColor: '#95a5a6',
      color: 'white',
      borderColor: '#7f8c8d',
      hoverBg: '#7f8c8d'
    },
    peligro: {
      backgroundColor: '#e74c3c',
      color: 'white',
      borderColor: '#c0392b',
      hoverBg: '#c0392b'
    }
  };

  const estiloActual = estilos[variante] || estilos.primario;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        padding: '10px 24px',
        backgroundColor: estiloActual.backgroundColor,
        color: estiloActual.color,
        border: `2px solid ${estiloActual.borderColor}`,
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        boxShadow: disabled ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
        transform: disabled ? 'none' : 'scale(1)',
        minWidth: '100px'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = estiloActual.hoverBg;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = estiloActual.backgroundColor;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
      }}
    >
      {texto}
    </button>
  );
};

export default BotonAccion;