const Alerta = ({ tipo = 'info', titulo, children }) => {
  // Configuración de cada tipo de alerta
  const configuracion = {
    exito: {
      icono: '✅',
      colorFondo: '#d4edda',
      colorBorde: '#28a745',
      colorTexto: '#155724',
      emoji: '✓'
    },
    advertencia: {
      icono: '⚠️',
      colorFondo: '#fff3cd',
      colorBorde: '#ffc107',
      colorTexto: '#856404',
      emoji: '⚠'
    },
    error: {
      icono: '❌',
      colorFondo: '#f8d7da',
      colorBorde: '#dc3545',
      colorTexto: '#721c24',
      emoji: '✗'
    },
    info: {
      icono: 'ℹ️',
      colorFondo: '#d1ecf1',
      colorBorde: '#17a2b8',
      colorTexto: '#0c5460',
      emoji: 'ℹ'
    }
  };

  // Obtener la configuración del tipo actual
  const config = configuracion[tipo] || configuracion.info;

  return (
    <div style={{
      backgroundColor: config.colorFondo,
      borderLeft: `4px solid ${config.colorBorde}`,
      borderRadius: '8px',
      padding: '16px 20px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      color: config.colorTexto,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: children ? '8px' : '0'
      }}>
        <span style={{
          fontSize: '1.5rem',
          lineHeight: 1
        }}>
          {config.icono}
        </span>
        <h3 style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: '600',
          color: config.colorTexto
        }}>
          {titulo || tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        </h3>
        <span style={{
          marginLeft: 'auto',
          fontSize: '0.75rem',
          backgroundColor: config.colorBorde,
          color: 'white',
          padding: '2px 10px',
          borderRadius: '12px',
          fontWeight: '600',
          textTransform: 'uppercase'
        }}>
          {config.emoji} {tipo}
        </span>
      </div>
      {children && (
        <div style={{
          padding: '8px 0 0 0',
          fontSize: '0.95rem',
          lineHeight: '1.5',
          color: config.colorTexto,
          opacity: 0.9,
          borderTop: `1px solid ${config.colorBorde}40`,
          marginTop: '8px',
          paddingTop: '12px'
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Alerta;