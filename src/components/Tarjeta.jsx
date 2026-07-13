const Tarjeta = () => {
  const datos = {
    titulo: 'React Avanzado',
    descripcion: 'Curso completo de React con hooks, context API y optimización de rendimiento. Aprende a construir aplicaciones modernas y escalables.',
    etiquetas: ['React', 'JavaScript', 'Hooks', 'Context API', 'Performance'],
    destacado: true
  };

  const coloresEtiquetas = [
    { bg: '#e3f2fd', text: '#0d47a1' },
    { bg: '#e8f5e9', text: '#1b5e20' },
    { bg: '#fff3e0', text: '#bf360c' },
    { bg: '#fce4ec', text: '#880e4f' },
    { bg: '#f3e5f5', text: '#4a148c' },
    { bg: '#e0f7fa', text: '#006064' }
  ];

  const getColorEtiqueta = (index) => {
    return coloresEtiquetas[index % coloresEtiquetas.length];
  };

  return (
    <div style={{
      maxWidth: '400px',
      padding: '25px',
      margin: '15px auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: datos.destacado ? '2px solid #ff9800' : '1px solid #e0e0e0',
      transition: 'all 0.3s ease',
      position: 'relative',
      background: datos.destacado ? 'linear-gradient(135deg, #fff8e1 0%, #ffffff 100%)' : 'white',
      boxShadow: datos.destacado 
        ? '0 8px 25px rgba(255, 152, 0, 0.2)' 
        : '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      {datos.destacado && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '20px',
          backgroundColor: '#ff9800',
          color: 'white',
          padding: '4px 16px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)'
        }}>
          ⭐ Destacado
        </div>
      )}

      <h3 style={{
        margin: '0 0 12px 0',
        color: '#2c3e50',
        fontSize: '1.5rem',
        fontWeight: '700',
        borderBottom: datos.destacado ? '3px solid #ff9800' : '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        {datos.titulo}
      </h3>

      <p style={{
        margin: '0 0 16px 0',
        color: '#546e7a',
        lineHeight: '1.6',
        fontSize: '0.95rem'
      }}>
        {datos.descripcion}
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '8px'
      }}>
        {datos.etiquetas.map((etiqueta, index) => {
          const colores = getColorEtiqueta(index);
          return (
            <span
              key={index}
              style={{
                backgroundColor: colores.bg,
                color: colores.text,
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                border: `1px solid ${colores.text}20`,
                transition: 'all 0.2s ease',
                cursor: 'default',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              #{etiqueta}
            </span>
          );
        })}
      </div>

      <div style={{
        marginTop: '16px',
        paddingTop: '12px',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: '#95a5a6'
      }}>
        <span>
          {datos.etiquetas.length} etiquetas
        </span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: datos.destacado ? '#ff9800' : '#95a5a6'
        }}>
          {datos.destacado ? '● Destacado' : '○ Normal'}
        </span>
      </div>
    </div>
  );
};

export default Tarjeta;