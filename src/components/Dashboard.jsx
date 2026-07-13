// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  // Datos del usuario
  const usuario = {
    nombre: 'Ana Martínez',
    email: 'ana.martinez@empresa.com',
    rol: 'Administradora'
  };

  // Array de notificaciones
  const notificaciones = [
    { id: 1, mensaje: 'Nuevo mensaje de Carlos sobre el proyecto', leida: false },
    { id: 2, mensaje: 'Tu informe mensual ha sido aprobado', leida: false },
    { id: 3, mensaje: 'Actualización de seguridad disponible', leida: true },
    { id: 4, mensaje: 'Reunión programada para el viernes 15:00', leida: false }
  ];

  // Array de actividad reciente
  const actividadReciente = [
    { id: 1, accion: 'Actualizó el perfil de usuario', fecha: '2026-05-24 14:30' },
    { id: 2, accion: 'Creó un nuevo proyecto "Dashboard React"', fecha: '2026-05-23 10:15' },
    { id: 3, accion: 'Completó la tarea "Revisar documentación"', fecha: '2026-05-22 16:45' }
  ];

  // Cálculos para las notificaciones
  const notificacionesNoLeidas = notificaciones.filter(notif => !notif.leida);
  const totalNoLeidas = notificacionesNoLeidas.length;
  const todasLeidas = totalNoLeidas === 0;

  return (
    <>
      {/* Sección 1 - Información del usuario */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid #dee2e6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '15px',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>👤</span>
          Información del Usuario
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '4px' }}>
              📛 Nombre
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
              {usuario.nombre}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '4px' }}>
              📧 Email
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
              {usuario.email}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '4px' }}>
              🎯 Rol
            </div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#2c3e50',
              display: 'inline-block',
              backgroundColor: '#e3f2fd',
              padding: '2px 12px',
              borderRadius: '12px',
              color: '#0d47a1'
            }}>
              {usuario.rol}
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2 - Notificaciones */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid #dee2e6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '15px',
          borderBottom: '3px solid #ff9800',
          paddingBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🔔</span>
            Notificaciones
          </span>
          <span style={{
            backgroundColor: totalNoLeidas > 0 ? '#ff9800' : '#4caf50',
            color: 'white',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}>
            {totalNoLeidas > 0 ? `${totalNoLeidas} no leídas` : '✓ Todas leídas'}
          </span>
        </h2>

        {todasLeidas ? (
          <div style={{
            textAlign: 'center',
            padding: '30px 20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            color: '#4caf50',
            fontSize: '1.1rem',
            border: '2px dashed #4caf50'
          }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>✅</span>
            No tienes notificaciones pendientes
          </div>
        ) : (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {notificaciones.map((notificacion) => (
              <li
                key={notificacion.id}
                style={{
                  padding: '12px 16px',
                  backgroundColor: notificacion.leida ? '#f1f3f5' : 'white',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${notificacion.leida ? '#95a5a6' : '#ff9800'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  opacity: notificacion.leida ? 0.7 : 1,
                  fontWeight: notificacion.leida ? 'normal' : '600'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  fontSize: '1.2rem'
                }}>
                  {notificacion.leida ? '📖' : '🔴'}
                </span>
                <span style={{
                  flex: 1,
                  color: notificacion.leida ? '#546e7a' : '#2c3e50'
                }}>
                  {notificacion.mensaje}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  backgroundColor: notificacion.leida ? '#e9ecef' : '#fff3e0',
                  color: notificacion.leida ? '#7f8c8d' : '#e65100',
                  fontWeight: '600'
                }}>
                  {notificacion.leida ? 'Leída' : 'No leída'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sección 3 - Actividad Reciente */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #dee2e6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '15px',
          borderBottom: '3px solid #9c27b0',
          paddingBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>📊</span>
          Actividad Reciente
          <span style={{
            marginLeft: 'auto',
            backgroundColor: '#9c27b0',
            color: 'white',
            padding: '2px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem'
          }}>
            {actividadReciente.length} acciones
          </span>
        </h2>

        {actividadReciente.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '30px 20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            color: '#95a5a6',
            fontSize: '1.1rem',
            border: '2px dashed #dee2e6'
          }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>📭</span>
            No hay actividad reciente
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {actividadReciente.map((actividad) => (
              <div
                key={actividad.id}
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3e5f5';
                  e.currentTarget.style.transform = 'scale(1.01)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flex: 1
                }}>
                  <span style={{
                    fontSize: '1.2rem'
                  }}>
                    {actividad.id === 1 ? '✏️' : actividad.id === 2 ? '📁' : '✅'}
                  </span>
                  <span style={{
                    color: '#2c3e50',
                    fontWeight: '500'
                  }}>
                    {actividad.accion}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#7f8c8d',
                  fontSize: '0.85rem'
                }}>
                  <span style={{
                    backgroundColor: '#f1f2f6',
                    padding: '4px 10px',
                    borderRadius: '12px'
                  }}>
                    🕐 {actividad.fecha}
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    color: '#95a5a6',
                    backgroundColor: '#e9ecef',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    #{actividad.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;