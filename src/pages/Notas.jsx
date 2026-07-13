// src/pages/Notas.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';

const Notas = () => {
  const {
    notas,
    filtroCategoria,
    busqueda,
    cambiarFiltro,
    cambiarBusqueda,
    toggleFijada
  } = useNotas();

  // Función para filtrar notas
  const filtrarNotas = () => {
    let filtradas = [...notas];

    // Filtrar por categoría
    if (filtroCategoria !== 'todas') {
      filtradas = filtradas.filter(nota => nota.categoria === filtroCategoria);
    }

    // Filtrar por búsqueda (título y contenido)
    if (busqueda.trim() !== '') {
      const busquedaLower = busqueda.toLowerCase().trim();
      filtradas = filtradas.filter(nota =>
        nota.titulo.toLowerCase().includes(busquedaLower) ||
        nota.contenido.toLowerCase().includes(busquedaLower)
      );
    }

    return filtradas;
  };

  const notasFiltradas = filtrarNotas();

  // Separar notas fijadas y no fijadas
  const notasFijadas = notasFiltradas.filter(nota => nota.fijada);
  const notasNoFijadas = notasFiltradas.filter(nota => !nota.fijada);

  // Ordenar por fecha (más reciente primero)
  const ordenarPorFecha = (lista) => {
    return [...lista].sort((a, b) =>
      new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
    );
  };

  const notasFijadasOrdenadas = ordenarPorFecha(notasFijadas);
  const notasNoFijadasOrdenadas = ordenarPorFecha(notasNoFijadas);

  // Colores para las categorías
  const coloresCategoria = {
    personal: { bg: '#fce4ec', text: '#c62828', border: '#ef9a9a' },
    trabajo: { bg: '#e3f2fd', text: '#0d47a1', border: '#90caf9' },
    estudio: { bg: '#e8f5e9', text: '#1b5e20', border: '#a5d6a7' },
    ideas: { bg: '#fff3e0', text: '#e65100', border: '#ffcc80' }
  };

  // Iconos para las categorías
  const iconosCategoria = {
    personal: '👤',
    trabajo: '💼',
    estudio: '📚',
    ideas: '💡'
  };

  // Función para truncar texto
  const truncarTexto = (texto, maxLength = 100) => {
    if (texto.length <= maxLength) return texto;
    return texto.slice(0, maxLength) + '...';
  };

  // Función para formatear fecha
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para manejar toggle de fijada
  const handleToggleFijada = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFijada(id);
  };

  // Opciones de categorías para el filtro
  const opcionesCategoria = [
    { value: 'todas', label: '📊 Todas' },
    { value: 'personal', label: '👤 Personal' },
    { value: 'trabajo', label: '💼 Trabajo' },
    { value: 'estudio', label: '📚 Estudio' },
    { value: 'ideas', label: '💡 Ideas' }
  ];

  return (
    <div>
      {/* Encabezado con controles de filtro */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
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
          <span style={{
            fontSize: '0.9rem',
            color: '#7f8c8d'
          }}>
            Mostrando <strong>{notasFiltradas.length}</strong> de <strong>{notas.length}</strong> notas
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="🔍 Buscar por título o contenido..."
            value={busqueda}
            onChange={(e) => cambiarBusqueda(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '2px solid #dee2e6',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              width: '100%'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#dee2e6';
            }}
          />

          {/* Selector de categoría */}
          <select
            value={filtroCategoria}
            onChange={(e) => cambiarFiltro(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '2px solid #dee2e6',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              width: '100%'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#dee2e6';
            }}
          >
            {opcionesCategoria.map(opcion => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>

        {/* Indicadores de filtros activos */}
        {(filtroCategoria !== 'todas' || busqueda) && (
          <div style={{
            marginTop: '12px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {filtroCategoria !== 'todas' && (
              <span style={{
                fontSize: '0.8rem',
                padding: '4px 12px',
                backgroundColor: '#3498db',
                color: 'white',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                📂 {filtroCategoria}
                <button
                  onClick={() => cambiarFiltro('todas')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    padding: '0 4px'
                  }}
                >
                  ✕
                </button>
              </span>
            )}
            {busqueda && (
              <span style={{
                fontSize: '0.8rem',
                padding: '4px 12px',
                backgroundColor: '#f39c12',
                color: 'white',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                🔍 {busqueda}
                <button
                  onClick={() => cambiarBusqueda('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    padding: '0 4px'
                  }}
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Lista de notas */}
      {notasFiltradas.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '15px' }}>📭</div>
          <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>
            No se encontraron notas
          </h3>
          <p style={{ color: '#7f8c8d' }}>
            {busqueda || filtroCategoria !== 'todas'
              ? 'Intenta ajustar los filtros de búsqueda o categoría'
              : '¡Comienza creando tu primera nota!'}
          </p>
          {!busqueda && filtroCategoria === 'todas' && (
            <Link
              to="/notas/nueva"
              style={{
                display: 'inline-block',
                marginTop: '15px',
                padding: '10px 24px',
                backgroundColor: '#3498db',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              ✨ Crear nota
            </Link>
          )}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Notas fijadas */}
          {notasFijadasOrdenadas.length > 0 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '2px solid #f1c40f'
              }}>
                <span style={{ fontSize: '1.2rem' }}>⭐</span>
                <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1rem' }}>
                  Notas Fijadas ({notasFijadasOrdenadas.length})
                </h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {notasFijadasOrdenadas.map(nota => (
                  <NotaCard
                    key={nota.id}
                    nota={nota}
                    coloresCategoria={coloresCategoria}
                    iconosCategoria={iconosCategoria}
                    truncarTexto={truncarTexto}
                    formatearFecha={formatearFecha}
                    handleToggleFijada={handleToggleFijada}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Notas no fijadas */}
          {notasNoFijadasOrdenadas.length > 0 && (
            <div>
              {notasFijadasOrdenadas.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #e9ecef'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📝</span>
                  <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1rem' }}>
                    Otras Notas ({notasNoFijadasOrdenadas.length})
                  </h3>
                </div>
              )}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {notasNoFijadasOrdenadas.map(nota => (
                  <NotaCard
                    key={nota.id}
                    nota={nota}
                    coloresCategoria={coloresCategoria}
                    iconosCategoria={iconosCategoria}
                    truncarTexto={truncarTexto}
                    formatearFecha={formatearFecha}
                    handleToggleFijada={handleToggleFijada}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente para renderizar una tarjeta de nota
// Componente para renderizar una tarjeta de nota
const NotaCard = ({
  nota,
  coloresCategoria,
  iconosCategoria,
  truncarTexto,
  formatearFecha,
  handleToggleFijada
}) => {
  const color = coloresCategoria[nota.categoria] || coloresCategoria.personal;

  return (
    <Link
      to={`/notas/${nota.id}`}
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
    >
      <div style={{
        padding: '16px 18px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: `1px solid ${nota.fijada ? '#f1c40f' : '#e9ecef'}`,
        boxShadow: nota.fijada
          ? '0 4px 12px rgba(241, 196, 15, 0.15)'
          : '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative'
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = nota.fijada
            ? '0 8px 24px rgba(241, 196, 15, 0.25)'
            : '0 8px 24px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = nota.fijada
            ? '0 4px 12px rgba(241, 196, 15, 0.15)'
            : '0 2px 8px rgba(0,0,0,0.05)';
        }}
      >
        {/* Botón de fijada */}
        <button
          onClick={(e) => handleToggleFijada(e, nota.id)}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '4px',
            transition: 'transform 0.2s ease',
            zIndex: 1,
            opacity: nota.fijada ? 1 : 0.3
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={nota.fijada ? 'Quitar de fijadas' : 'Fijar nota'}
        >
          ⭐
        </button>

        {/* Título */}
        <h3 style={{
          margin: '0 0 8px 0',
          color: '#2c3e50',
          fontSize: '1.05rem',
          fontWeight: '600',
          paddingRight: '30px'
        }}>
          {nota.titulo}
        </h3>

        {/* Contenido truncado */}
        <p style={{
          margin: '0 0 12px 0',
          color: '#546e7a',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          flex: 1
        }}>
          {truncarTexto(nota.contenido, 100)}
        </p>

        {/* Footer de la tarjeta */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid #f1f3f5'
        }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 12px',
            borderRadius: '12px',
            backgroundColor: color.bg,
            color: color.text,
            border: `1px solid ${color.border}`,
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {iconosCategoria[nota.categoria] || '📌'} {nota.categoria}
          </span>
          <span style={{
            fontSize: '0.7rem',
            color: '#95a5a6'
          }}>
            {formatearFecha(nota.fechaCreacion)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Notas;