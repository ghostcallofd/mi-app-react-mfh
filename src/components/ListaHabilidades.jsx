const ListaHabilidades = () => {
  const habilidades = [
    'React',
    'JavaScript',
    'CSS',
    'Node.js',
    'Git',
    'TypeScript'
  ];
  
  return (
    <div style={{
      padding: '25px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #dee2e6',
      maxWidth: '500px',
      margin: '10px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#2c3e50',
        borderBottom: '3px solid #3498db',
        paddingBottom: '10px',
        marginBottom: '10px'
      }}>
        🛠️ Habilidades técnicas
      </h2>
      
      <p style={{
        fontSize: '1rem',
        color: '#7f8c8d',
        marginBottom: '20px'
      }}>
        Total de habilidades: <strong>{habilidades.length}</strong>
      </p>
      
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gap: '8px'
      }}>
        {habilidades.map((habilidad, index) => (
          <li
            key={index}
            style={{
              padding: '12px 16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e3f2fd';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {index + 1}
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#2c3e50'
            }}>
              {habilidad}
            </span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '0.8rem',
              color: '#95a5a6'
            }}>
              {index < habilidades.length - 1 ? '•' : '✓'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaHabilidades;