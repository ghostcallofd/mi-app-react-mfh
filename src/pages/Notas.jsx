import { useNotas } from '../context/NotasContext';

const Notas = () => {
  const { notas, filtroCategoria, busqueda } = useNotas();

  return (
    <div>
      <div style={{
        marginBottom: '20px',
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{
          margin: 0,
          color: '#2c3e50',
          fontSize: '1.5rem'
        }}>
          📋 Lista de Notas
        </h2>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.85rem',
            color: '#7f8c8d'
          }}>
            {notas.length} notas
          </span>
          {filtroCategoria !== 'todas' && (
            <span style={{
              fontSize: '0.75rem',
              padding: '4px 12px',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '12px'
            }}>
              Filtro: {filtroCategoria}
            </span>
          )}
          {busqueda && (
            <span style={{
              fontSize: '0.75rem',
              padding: '4px 12px',
              backgroundColor: '#f39c12',
              color: 'white',
              borderRadius: '12px'
            }}>
              🔍 {busqueda}
            </span>
          )}
        </div>
      </div>

      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '2px dashed #dee2e6',
        color: '#95a5a6'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚧</div>
        <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>
          Página de notas en construcción
        </h3>
        <p>
          Las notas se mostrarán aquí con filtros y búsqueda.
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          (Ejercicio 3 — Lista de notas con filtros y búsqueda)
        </p>
      </div>
    </div>
  );
};

export default Notas;