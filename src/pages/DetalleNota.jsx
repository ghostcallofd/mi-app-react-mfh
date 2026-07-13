import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';

const DetalleNota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notas, eliminarNota, toggleFijada } = useNotas();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  // Buscar la nota por ID
  const nota = notas.find(n => n.id === id);

  // Colores para las categorías
  const coloresCategoria = {
    personal: { bg: '#fce4ec', text: '#c62828', border: '#ef9a9a' },
    trabajo: { bg: '#e3f2fd', text: '#0d47a1', border: '#90caf9' },
    estudio: { bg: '#e8f5e9', text: '#1b5e20', border: '#a5d6a7' },
    ideas: { bg: '#fff3e0', text: '#e65100', border: '#ffcc80' }
  };

  const color = coloresCategoria[nota?.categoria] || coloresCategoria.personal;

  // Función para formatear fecha
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para manejar eliminación
  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    eliminarNota(id);
    navigate('/notas');
  };

  const cancelarEliminar = () => {
    setMostrarConfirmacion(false);
  };

  // Función para manejar toggle de fijada
  const handleToggleFijada = () => {
    toggleFijada(id);
  };

  // Si la nota no existe
  if (!nota) {
    return (
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '2px dashed #dee2e6'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🔍</div>
        <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>
          Nota no encontrada
        </h3>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
          La nota que estás buscando no existe o ha sido eliminada.
        </p>
        <Link
          to="/notas"
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600'
          }}
        >
          📋 Volver a notas
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Encabezado con navegación */}
      <div style={{
        marginBottom: '20px',
        padding: '16px 20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Link
            to="/notas"
            style={{
              color: '#3498db',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: '500'
            }}
          >
            ← Volver
          </Link>
          <span style={{
            fontSize: '0.7rem',
            color: '#95a5a6'
          }}>
            ID: {nota.id}
          </span>
        </div>
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleToggleFijada}
            style={{
              padding: '8px 16px',
              backgroundColor: nota.fijada ? '#f1c40f' : '#f8f9fa',
              color: nota.fijada ? '#2c3e50' : '#7f8c8d',
              border: `2px solid ${nota.fijada ? '#f1c40f' : '#dee2e6'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {nota.fijada ? '⭐ Fijada' : '☆ Fijar'}
          </button>
          <Link
            to={`/notas/${id}/editar`}
            style={{
              padding: '8px 20px',
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
            ✏️ Editar
          </Link>
          <button
            onClick={handleEliminar}
            style={{
              padding: '8px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c0392b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e74c3c';
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>

      {/* Contenido de la nota */}
      <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: `2px solid ${nota.fijada ? '#f1c40f' : '#e9ecef'}`,
        boxShadow: nota.fijada 
          ? '0 4px 16px rgba(241, 196, 15, 0.15)' 
          : '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        {/* Título y estado */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '15px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h2 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '1.8rem',
            wordBreak: 'break-word'
          }}>
            {nota.titulo}
          </h2>
          {nota.fijada && (
            <span style={{
              padding: '4px 16px',
              backgroundColor: '#f1c40f',
              color: '#2c3e50',
              borderRadius: '20px',
              fontWeight: '600',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              ⭐ Fijada
            </span>
          )}
        </div>

        {/* Metadatos */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #f1f3f5'
        }}>
          <span style={{
            fontSize: '0.85rem',
            padding: '4px 14px',
            borderRadius: '12px',
            backgroundColor: color.bg,
            color: color.text,
            border: `1px solid ${color.border}`,
            textTransform: 'capitalize'
          }}>
            📂 {nota.categoria}
          </span>
          <span style={{
            fontSize: '0.85rem',
            color: '#7f8c8d'
          }}>
            🕐 {formatearFecha(nota.fechaCreacion)}
          </span>
        </div>

        {/* Contenido completo */}
        <div style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: '1.8',
          color: '#2c3e50',
          fontSize: '1.05rem'
        }}>
          {nota.contenido}
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {mostrarConfirmacion && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '450px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '3rem' }}>⚠️</div>
              <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>
                ¿Eliminar nota?
              </h3>
              <p style={{ color: '#7f8c8d' }}>
                ¿Estás seguro de que quieres eliminar la nota <strong>"{nota.titulo}"</strong>?
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={cancelarEliminar}
                style={{
                  padding: '10px 30px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7f8c8d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#95a5a6';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                style={{
                  padding: '10px 30px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c0392b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e74c3c';
                }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default DetalleNota;