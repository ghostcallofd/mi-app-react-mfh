import { useState, useEffect } from 'react';

const ConfiguracionUsuario = () => {
  // Clave para localStorage
  const STORAGE_KEY = 'config-usuario';

  // Valores por defecto
  const valoresPorDefecto = {
    nombre: '',
    tema: 'claro',
    notificaciones: true
  };

  // Función para cargar configuración desde localStorage
  const cargarConfiguracion = () => {
    try {
      const configuracionGuardada = localStorage.getItem(STORAGE_KEY);
      if (configuracionGuardada) {
        const configuracion = JSON.parse(configuracionGuardada);
        // Verificar que todos los campos existen
        return {
          ...valoresPorDefecto,
          ...configuracion
        };
      }
    } catch (error) {
      console.error('Error al cargar configuración desde localStorage:', error);
    }
    return valoresPorDefecto;
  };

  // Estado inicial
  const [configuracion, setConfiguracion] = useState(cargarConfiguracion);
  const [errorStorage, setErrorStorage] = useState(null);

  // Efecto para guardar en localStorage cada vez que cambia la configuración
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configuracion));
      setErrorStorage(null);
      console.log('💾 Configuración guardada en localStorage:', configuracion);
    } catch (error) {
      console.error('Error al guardar configuración en localStorage:', error);
      setErrorStorage('No se pudo guardar la configuración. Verifica el espacio de almacenamiento.');
    }
  }, [configuracion]);

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setConfiguracion(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Función para restablecer valores
  const restablecerValores = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setConfiguracion(valoresPorDefecto);
      setErrorStorage(null);
      console.log('🔄 Configuración restablecida a valores por defecto');
    } catch (error) {
      console.error('Error al restablecer configuración:', error);
      setErrorStorage('Error al restablecer la configuración.');
    }
  };

  // Función para obtener el tema actual
  const temaActual = configuracion.tema;

  return (
    <div style={{
      padding: '25px',
      backgroundColor: temaActual === 'oscuro' ? '#2c3e50' : 'white',
      borderRadius: '16px',
      border: `2px solid ${temaActual === 'oscuro' ? '#34495e' : '#e9ecef'}`,
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto',
      color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50',
      transition: 'all 0.3s ease'
    }}>
      <h2 style={{
        marginBottom: '20px',
        borderBottom: `2px solid ${temaActual === 'oscuro' ? '#34495e' : '#e9ecef'}`,
        paddingBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50'
      }}>
        <span>⚙️</span>
        Configuración de Usuario
        <span style={{
          fontSize: '0.8rem',
          backgroundColor: temaActual === 'oscuro' ? '#34495e' : '#e9ecef',
          padding: '2px 12px',
          borderRadius: '20px',
          fontWeight: 'normal',
          marginLeft: 'auto',
          color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50'
        }}>
          {temaActual === 'oscuro' ? '🌙 Oscuro' : '☀️ Claro'}
        </span>
      </h2>

      {/* Error de almacenamiento */}
      {errorStorage && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f8d7da',
          borderRadius: '8px',
          marginBottom: '15px',
          color: '#721c24',
          border: '1px solid #f5c6cb'
        }}>
          ⚠️ {errorStorage}
        </div>
      )}

      {/* Estado de localStorage */}
      <div style={{
        padding: '10px',
        backgroundColor: temaActual === 'oscuro' ? '#34495e' : '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '0.85rem',
        color: temaActual === 'oscuro' ? '#bdc3c7' : '#7f8c8d'
      }}>
        <p style={{ margin: 0 }}>
          <strong>💾 Almacenamiento:</strong> {localStorage.getItem(STORAGE_KEY) ? '✅ Configuración guardada' : '❌ Sin configuración guardada'}
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', wordBreak: 'break-all' }}>
          <strong>Clave:</strong> {STORAGE_KEY}
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Campo: Nombre */}
        <div style={{
          marginBottom: '16px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50'
          }}>
            👤 Nombre de Usuario
          </label>
          <input
            type="text"
            name="nombre"
            value={configuracion.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `2px solid ${temaActual === 'oscuro' ? '#34495e' : '#dee2e6'}`,
              fontSize: '1rem',
              backgroundColor: temaActual === 'oscuro' ? '#34495e' : 'white',
              color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50',
              transition: 'border-color 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = temaActual === 'oscuro' ? '#34495e' : '#dee2e6';
            }}
          />
        </div>

        {/* Campo: Tema */}
        <div style={{
          marginBottom: '16px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50'
          }}>
            🎨 Tema
          </label>
          <select
            name="tema"
            value={configuracion.tema}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `2px solid ${temaActual === 'oscuro' ? '#34495e' : '#dee2e6'}`,
              fontSize: '1rem',
              backgroundColor: temaActual === 'oscuro' ? '#34495e' : 'white',
              color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = temaActual === 'oscuro' ? '#34495e' : '#dee2e6';
            }}
          >
            <option value="claro">☀️ Claro</option>
            <option value="oscuro">🌙 Oscuro</option>
          </select>
        </div>

        {/* Campo: Notificaciones */}
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: temaActual === 'oscuro' ? '#34495e' : '#f8f9fa',
          borderRadius: '8px',
          border: `1px solid ${temaActual === 'oscuro' ? '#2c3e50' : '#e9ecef'}`
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50'
          }}>
            <input
              type="checkbox"
              name="notificaciones"
              checked={configuracion.notificaciones}
              onChange={handleChange}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#3498db'
              }}
            />
            {configuracion.notificaciones ? '🔔 Notificaciones activadas' : '🔕 Notificaciones desactivadas'}
          </label>
          <p style={{
            margin: '6px 0 0 0',
            fontSize: '0.85rem',
            color: temaActual === 'oscuro' ? '#bdc3c7' : '#7f8c8d',
            marginLeft: '32px'
          }}>
            {configuracion.notificaciones 
              ? 'Recibirás notificaciones de actividad' 
              : 'No recibirás notificaciones'}
          </p>
        </div>

        {/* Botones */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            onClick={restablecerValores}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '150px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c0392b';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e74c3c';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🔄 Restablecer valores
          </button>
        </div>
      </form>

      {/* Vista previa de la configuración */}
      <div style={{
        marginTop: '25px',
        padding: '20px',
        backgroundColor: temaActual === 'oscuro' ? '#1a1a2e' : '#f8f9fa',
        borderRadius: '12px',
        border: `2px solid ${temaActual === 'oscuro' ? '#2c3e50' : '#e9ecef'}`,
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{
          marginBottom: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50'
        }}>
          📋 Vista previa de la configuración
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          fontSize: '0.9rem'
        }}>
          <div>
            <span style={{
              color: temaActual === 'oscuro' ? '#bdc3c7' : '#7f8c8d',
              fontSize: '0.8rem'
            }}>
              👤 Nombre
            </span>
            <div style={{
              fontWeight: '600',
              color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50',
              padding: '4px 0'
            }}>
              {configuracion.nombre || <span style={{ color: '#95a5a6', fontStyle: 'italic' }}>Sin definir</span>}
            </div>
          </div>

          <div>
            <span style={{
              color: temaActual === 'oscuro' ? '#bdc3c7' : '#7f8c8d',
              fontSize: '0.8rem'
            }}>
              🎨 Tema
            </span>
            <div style={{
              fontWeight: '600',
              color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50',
              padding: '4px 0'
            }}>
              {configuracion.tema === 'claro' ? '☀️ Claro' : '🌙 Oscuro'}
            </div>
          </div>

          <div>
            <span style={{
              color: temaActual === 'oscuro' ? '#bdc3c7' : '#7f8c8d',
              fontSize: '0.8rem'
            }}>
              🔔 Notificaciones
            </span>
            <div style={{
              fontWeight: '600',
              color: temaActual === 'oscuro' ? '#ecf0f1' : '#2c3e50',
              padding: '4px 0'
            }}>
              {configuracion.notificaciones ? '✅ Activadas' : '❌ Desactivadas'}
            </div>
          </div>
        </div>

        {/* JSON de la configuración */}
        <div style={{
          marginTop: '12px',
          padding: '12px',
          backgroundColor: temaActual === 'oscuro' ? '#0f0f1a' : 'white',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          color: temaActual === 'oscuro' ? '#8e8ea0' : '#6c757d',
          border: `1px solid ${temaActual === 'oscuro' ? '#2c3e50' : '#dee2e6'}`,
          overflow: 'auto'
        }}>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(configuracion, null, 2)}
          </pre>
        </div>
      </div>

      {/* Información de depuración */}
      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: temaActual === 'oscuro' ? '#1a1a2e' : '#f8f9fa',
        borderRadius: '8px',
        fontSize: '0.75rem',
        color: temaActual === 'oscuro' ? '#bdc3c7' : '#7f8c8d',
        textAlign: 'center',
        border: `1px dashed ${temaActual === 'oscuro' ? '#2c3e50' : '#dee2e6'}`
      }}>
        <p style={{ margin: 0 }}>
          🖥️ Los cambios se guardan automáticamente en localStorage
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.7rem' }}>
          <strong>🔑 Clave:</strong> {STORAGE_KEY} • 
          <strong> 📦 Datos:</strong> {JSON.stringify(configuracion).length} bytes
        </p>
      </div>
    </div>
  );
};

export default ConfiguracionUsuario;