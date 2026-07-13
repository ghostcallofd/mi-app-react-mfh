import React, { useState } from 'react';
import BotonAccion from './BotonAccion';
import Modal from './Modal';
import Alerta from './Alerta';

const ListaContactos = () => {
  // Estado para la lista de contactos
  const [contactos, setContactos] = useState([
    { id: 1, nombre: 'Ana García', telefono: '555-1234', favorito: true },
    { id: 2, nombre: 'Carlos López', telefono: '555-5678', favorito: false },
    { id: 3, nombre: 'María Rodríguez', telefono: '555-9012', favorito: true },
    { id: 4, nombre: 'Pedro Sánchez', telefono: '555-3456', favorito: false },
    { id: 5, nombre: 'Laura Martínez', telefono: '555-7890', favorito: false }
  ]);

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Estado para mostrar solo favoritos
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  // Estado para el modal de confirmación
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contactoAEliminar, setContactoAEliminar] = useState(null);

  // Función para filtrar contactos
  const filtrarContactos = () => {
    let filtrados = contactos;

    // Filtrar por favoritos si está activado
    if (mostrarFavoritos) {
      filtrados = filtrados.filter(contacto => contacto.favorito);
    }

    // Filtrar por búsqueda (nombre o teléfono)
    if (busqueda.trim() !== '') {
      const busquedaLower = busqueda.toLowerCase().trim();
      filtrados = filtrados.filter(contacto =>
        contacto.nombre.toLowerCase().includes(busquedaLower) ||
        contacto.telefono.toLowerCase().includes(busquedaLower)
      );
    }

    return filtrados;
  };

  const contactosFiltrados = filtrarContactos();

  // Calcular estadísticas
  const totalContactos = contactos.length;
  const totalFavoritos = contactos.filter(c => c.favorito).length;
  const resultadosBusqueda = contactosFiltrados.length;

  // Función para alternar favorito usando map
  const toggleFavorito = (id) => {
    setContactos(prevContactos =>
      prevContactos.map(contacto =>
        contacto.id === id
          ? { ...contacto, favorito: !contacto.favorito }
          : contacto
      )
    );
  };

  // Función para eliminar contacto usando filter
  const eliminarContacto = (id) => {
    setContactos(prevContactos =>
      prevContactos.filter(contacto => contacto.id !== id)
    );
    setModalAbierto(false);
    setContactoAEliminar(null);
  };

  // Función para abrir modal de confirmación
  const confirmarEliminacion = (contacto) => {
    setContactoAEliminar(contacto);
    setModalAbierto(true);
  };

  // Función para cancelar eliminación
  const cancelarEliminacion = () => {
    setModalAbierto(false);
    setContactoAEliminar(null);
  };

  // Función para manejar cambio en búsqueda
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  // Función para alternar filtro de favoritos
  const toggleMostrarFavoritos = () => {
    setMostrarFavoritos(prev => !prev);
  };

  return (
    <div style={{
      padding: '25px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '20px',
        borderBottom: '3px solid #3498db',
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>📇 Lista de Contactos</span>
        <span style={{
          fontSize: '0.9rem',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '4px 14px',
          borderRadius: '20px',
          fontWeight: 'normal'
        }}>
          {totalContactos} contactos
        </span>
      </h2>

      {/* Barra de control */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '1px solid #e9ecef'
      }}>
        {/* Input de búsqueda */}
        <div style={{
          flex: 1,
          minWidth: '200px'
        }}>
          <input
            type="text"
            placeholder="🔍 Buscar por nombre o teléfono..."
            value={busqueda}
            onChange={handleBusquedaChange}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '8px',
              border: '2px solid #dee2e6',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#dee2e6';
            }}
          />
        </div>

        {/* Botón de favoritos */}
        <BotonAccion
          texto={mostrarFavoritos ? '⭐ Mostrar Todos' : '⭐ Solo Favoritos'}
          variante={mostrarFavoritos ? 'primario' : 'secundario'}
          onClick={toggleMostrarFavoritos}
        />
      </div>

      {/* Estadísticas */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '20px',
        padding: '12px 16px',
        backgroundColor: '#f1f3f5',
        borderRadius: '8px',
        fontSize: '0.95rem'
      }}>
        <span>
          <strong>Total:</strong> {totalContactos}
        </span>
        <span>
          <strong>⭐ Favoritos:</strong> {totalFavoritos}
        </span>
        <span>
          <strong>🔍 Resultados:</strong> {resultadosBusqueda}
        </span>
        {busqueda && (
          <span style={{ color: '#3498db' }}>
            <strong>Búsqueda:</strong> "{busqueda}"
          </span>
        )}
        {mostrarFavoritos && (
          <span style={{ color: '#ff9800' }}>
            <strong>Filtro:</strong> Solo favoritos
          </span>
        )}
      </div>

      {/* Lista de contactos */}
      {contactosFiltrados.length === 0 ? (
        <Alerta tipo="info" titulo="Sin Resultados">
          {busqueda.trim() !== '' 
            ? `No se encontraron contactos que coincidan con "${busqueda}"`
            : mostrarFavoritos 
              ? 'No tienes contactos marcados como favoritos'
              : 'No hay contactos disponibles'
          }
        </Alerta>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {contactosFiltrados.map((contacto) => (
            <div
              key={contacto.id}
              style={{
                padding: '14px 18px',
                backgroundColor: contacto.favorito ? '#fff8e1' : 'white',
                borderRadius: '10px',
                border: contacto.favorito 
                  ? '2px solid #ffc107' 
                  : '1px solid #e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: contacto.favorito 
                  ? '0 2px 8px rgba(255, 193, 7, 0.2)' 
                  : '0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = contacto.favorito 
                  ? '0 2px 8px rgba(255, 193, 7, 0.2)' 
                  : '0 1px 3px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flex: 1,
                minWidth: 0
              }}>
                {/* Ícono de favorito clickeable */}
                <div
                  onClick={() => toggleFavorito(contacto.id)}
                  style={{
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    userSelect: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title={contacto.favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  {contacto.favorito ? '⭐' : '☆'}
                </div>

                <div style={{
                  flex: 1,
                  minWidth: 0
                }}>
                  <div style={{
                    fontWeight: '600',
                    color: '#2c3e50',
                    fontSize: '1.05rem'
                  }}>
                    {contacto.nombre}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#7f8c8d',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>📞 {contacto.telefono}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      color: '#95a5a6'
                    }}>
                      ID: #{contacto.id}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '8px',
                marginLeft: '12px'
              }}>
                <BotonAccion
                  texto="🗑️ Eliminar"
                  variante="peligro"
                  onClick={() => confirmarEliminacion(contacto)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      <Modal
        titulo="⚠️ Confirmar Eliminación"
        abierto={modalAbierto}
        onClose={cancelarEliminacion}
      >
        <div>
          <p style={{
            fontSize: '1.05rem',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            ¿Estás seguro de eliminar a <strong>{contactoAEliminar?.nombre}</strong>?
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: '#7f8c8d',
            marginBottom: '20px'
          }}>
            Esta acción no se puede deshacer. El contacto será eliminado permanentemente.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid #e9ecef'
          }}>
            <BotonAccion
              texto="❌ Cancelar"
              variante="secundario"
              onClick={cancelarEliminacion}
            />
            <BotonAccion
              texto="🗑️ Eliminar"
              variante="peligro"
              onClick={() => {
                if (contactoAEliminar) {
                  eliminarContacto(contactoAEliminar.id);
                }
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListaContactos;