import { Link } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';

const Inicio = () => {
  const { notas, filtroCategoria, busqueda } = useNotas();

  // Calcular estadísticas
  const totalNotas = notas.length;
  const notasFijadas = notas.filter(n => n.fijada).length;
  
  // Agrupar por categoría
  const categorias = notas.reduce((acc, nota) => {
    acc[nota.categoria] = (acc[nota.categoria] || 0) + 1;
    return acc;
  }, {});

  // Obtener las 3 notas más recientes
  const notasRecientes = [...notas]
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
    .slice(0, 3);

  // Colores para las categorías
  const coloresCategoria = {
    personal: '#e74c3c',
    trabajo: '#3498db',
    estudio: '#2ecc71',
    ideas: '#f39c12'
  };

  // Iconos para las categorías
  const iconosCategoria = {
    personal: '👤',
    trabajo: '💼',
    estudio: '📚',
    ideas: '💡'
  };

  return (
    <div>
      <div style={{
        marginBottom: '30px',
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#2c3e50',
          marginBottom: '10px'
        }}>
          👋 ¡Bienvenido a MisNotas!
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#7f8c8d',
          marginBottom: 0
        }}>
          Organiza tus ideas, tareas y proyectos de manera eficiente
        </p>
      </div>

      {/* Resumen rápido */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem' }}>📝</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
            {totalNotas}
          </div>
          <div style={{ color: '#7f8c8d' }}>Total de notas</div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem' }}>⭐</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f1c40f' }}>
            {notasFijadas}
          </div>
          <div style={{ color: '#7f8c8d' }}>Notas fijadas</div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem' }}>📂</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9b59b6' }}>
            {Object.keys(categorias).length}
          </div>
          <div style={{ color: '#7f8c8d' }}>Categorías</div>
        </div>
      </div>

      {/* Distribución por categorías */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#2c3e50',
          fontSize: '1.1rem'
        }}>
          📊 Distribución por categorías
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px'
        }}>
          {Object.entries(categorias).map(([categoria, cantidad]) => (
            <div
              key={categoria}
              style={{
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                borderLeft: `4px solid ${coloresCategoria[categoria] || '#95a5a6'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textTransform: 'capitalize'
              }}>
                {iconosCategoria[categoria] || '📌'} {categoria}
              </span>
              <span style={{
                fontWeight: 'bold',
                color: '#2c3e50'
              }}>
                {cantidad}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notas recientes */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#2c3e50',
          fontSize: '1.1rem'
        }}>
          🕐 Notas más recientes
        </h3>
        {notasRecientes.length > 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {notasRecientes.map(nota => (
              <div
                key={nota.id}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  {nota.fijada && <span>⭐</span>}
                  <span style={{ fontWeight: '600', color: '#2c3e50' }}>
                    {nota.titulo}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    backgroundColor: coloresCategoria[nota.categoria] + '20',
                    color: coloresCategoria[nota.categoria],
                    border: `1px solid ${coloresCategoria[nota.categoria]}40`,
                    textTransform: 'capitalize'
                  }}>
                    {nota.categoria}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#95a5a6'
                }}>
                  {new Date(nota.fechaCreacion).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#95a5a6', textAlign: 'center' }}>
            No hay notas disponibles
          </p>
        )}
        <div style={{
          marginTop: '15px',
          textAlign: 'center'
        }}>
          <Link
            to="/notas"
            style={{
              color: '#3498db',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}
          >
            Ver todas las notas →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;