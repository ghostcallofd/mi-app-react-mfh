import { NavLink, Outlet } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';

const Layout = () => {
  const { notas, notificacion, cerrarNotificacion } = useNotas();

  const obtenerEstiloEnlace = ({ isActive }) => ({
    color: isActive ? '#3498db' : '#2c3e50',
    fontWeight: isActive ? '700' : '500',
    borderBottom: isActive ? '3px solid #3498db' : '3px solid transparent',
    paddingBottom: '4px',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    backgroundColor: isActive ? '#ebf5fb' : 'transparent'
  });

  // Función para obtener colores de notificación
  const getColorNotificacion = (tipo) => {
    const colores = {
      exito: { bg: '#d4edda', border: '#28a745', text: '#155724', icono: '✅' },
      error: { bg: '#f8d7da', border: '#dc3545', text: '#721c24', icono: '❌' },
      advertencia: { bg: '#fff3cd', border: '#ffc107', text: '#856404', icono: '⚠️' },
      info: { bg: '#d1ecf1', border: '#17a2b8', text: '#0c5460', icono: 'ℹ️' }
    };
    return colores[tipo] || colores.info;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '2px solid #e9ecef',
        padding: '16px 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>📝</span>
            <h1 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2c3e50'
            }}>
              MisNotas
            </h1>
          </div>

          <nav style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <NavLink to="/" style={obtenerEstiloEnlace}>
              🏠 Inicio
            </NavLink>
            <NavLink to="/notas" style={obtenerEstiloEnlace}>
              📋 Notas
            </NavLink>
            <NavLink to="/notas/nueva" style={obtenerEstiloEnlace}>
              ✨ Nueva Nota
            </NavLink>
          </nav>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f8f9fa',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid #e9ecef',
            fontSize: '0.9rem',
            color: '#2c3e50'
          }}>
            <span>📊</span>
            <span>
              <strong>{notas.length}</strong> notas
            </span>
            <span style={{
              width: '4px',
              height: '4px',
              backgroundColor: '#dee2e6',
              borderRadius: '50%',
              display: 'inline-block'
            }} />
            <span style={{ color: '#7f8c8d' }}>
              ⭐ {notas.filter(n => n.fijada).length} fijadas
            </span>
          </div>
        </div>
      </header>

      {/* Notificación Toast */}
      {notificacion && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 1000,
          maxWidth: '400px',
          width: '100%',
          animation: 'slideInRight 0.3s ease'
        }}>
          <div style={{
            padding: '16px 20px',
            backgroundColor: getColorNotificacion(notificacion.tipo).bg,
            borderLeft: `4px solid ${getColorNotificacion(notificacion.tipo).border}`,
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: getColorNotificacion(notificacion.tipo).text
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {getColorNotificacion(notificacion.tipo).icono}
              </span>
              <span style={{ fontWeight: '500' }}>
                {notificacion.mensaje}
              </span>
            </div>
            <button
              onClick={cerrarNotificacion}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: getColorNotificacion(notificacion.tipo).text,
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main style={{
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '24px'
      }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'white',
        borderTop: '2px solid #e9ecef',
        padding: '16px 24px',
        textAlign: 'center',
        color: '#7f8c8d',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: 0 }}>
          © 2026 MisNotas — Gestión de notas con React + Context API
        </p>
      </footer>

      {/* Animaciones */}
      <style>
        {`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Layout;