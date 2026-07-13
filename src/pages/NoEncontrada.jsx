import { Link } from 'react-router-dom';

const NoEncontrada = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        fontSize: '6rem',
        marginBottom: '10px',
        lineHeight: 1
      }}>
        404
      </div>
      <div style={{
        fontSize: '4rem',
        marginBottom: '20px'
      }}>
        🔍
      </div>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '10px'
      }}>
        Página no encontrada
      </h2>
      <p style={{
        color: '#7f8c8d',
        marginBottom: '20px',
        maxWidth: '400px'
      }}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/"
        style={{
          padding: '12px 30px',
          backgroundColor: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2980b9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3498db';
        }}
      >
        🏠 Volver al inicio
      </Link>
    </div>
  );
};

export default NoEncontrada;