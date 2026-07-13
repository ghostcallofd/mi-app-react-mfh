import { useState, useEffect } from 'react';
import BotonAccion from './BotonAccion';
import Alerta from './Alerta';

const FormularioEvento = () => {
  // Estado para el formulario
  const [formulario, setFormulario] = useState({
    titulo: '',
    fecha: '',
    categoria: '',
    descripcion: '',
    esPublico: true
  });

  // Estado para errores de validación
  const [errores, setErrores] = useState({});

  // Estado para el mensaje de confirmación
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [ultimoEvento, setUltimoEvento] = useState(null);

  // Estado para la lista de eventos registrados
  const [eventosRegistrados, setEventosRegistrados] = useState([]);

  // Estado para controlar si se ha intentado enviar
  const [intentadoEnviar, setIntentadoEnviar] = useState(false);

  // Limpiar mensaje de confirmación después de 4 segundos
  useEffect(() => {
    let timeoutId;
    if (confirmacionVisible) {
      timeoutId = setTimeout(() => {
        setConfirmacionVisible(false);
        setUltimoEvento(null);
      }, 4000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [confirmacionVisible]);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Manejar checkbox de forma diferente
    const valor = type === 'checkbox' ? checked : value;
    
    // Actualizar el estado de forma inmutable usando spread
    setFormulario(prevState => ({
      ...prevState,
      [name]: valor
    }));

    // Limpiar el error del campo cuando el usuario escribe
    if (errores[name]) {
      setErrores(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Función de validación
  const validarFormulario = () => {
    const nuevosErrores = {};
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    
    const fechaSeleccionada = new Date(formulario.fecha);

    // Validar título
    if (formulario.titulo.trim().length < 5) {
      nuevosErrores.titulo = 'El título debe tener al menos 5 caracteres';
    }

    // Validar fecha
    if (!formulario.fecha) {
      nuevosErrores.fecha = 'La fecha es obligatoria';
    } else if (fechaSeleccionada < fechaActual) {
      nuevosErrores.fecha = 'La fecha no puede ser en el pasado';
    }

    // Validar categoría
    if (!formulario.categoria) {
      nuevosErrores.categoria = 'Debes seleccionar una categoría';
    }

    // Validar descripción
    if (formulario.descripcion.trim().length < 20) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 20 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para verificar si el formulario es válido
  const esFormularioValido = () => {
    const camposObligatorios = ['titulo', 'fecha', 'categoria', 'descripcion'];
    return camposObligatorios.every(campo => {
      const valor = formulario[campo];
      if (campo === 'categoria') {
        return valor && valor.trim() !== '';
      }
      if (campo === 'fecha') {
        return valor && valor.trim() !== '';
      }
      return valor && valor.trim().length > 0;
    });
  };

  // Función para limpiar el formulario
  const limpiarFormulario = () => {
    setFormulario({
      titulo: '',
      fecha: '',
      categoria: '',
      descripcion: '',
      esPublico: true
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setIntentadoEnviar(true);

    // Validar el formulario
    if (!validarFormulario()) {
      return;
    }

    // Crear el evento con un ID único
    const nuevoEvento = {
      id: Date.now(),
      ...formulario,
      fechaRegistro: new Date().toLocaleString()
    };

    // Agregar evento a la lista
    setEventosRegistrados(prevEventos => [...prevEventos, nuevoEvento]);

    // Guardar el último evento para mostrar en la confirmación
    setUltimoEvento(nuevoEvento);

    // Mostrar mensaje de confirmación
    setConfirmacionVisible(true);

    // Limpiar el formulario
    limpiarFormulario();
    setIntentadoEnviar(false);
  };

  // Función para obtener el nombre de la categoría
  const getNombreCategoria = (categoria) => {
    const categorias = {
      conferencia: 'Conferencia',
      taller: 'Taller',
      seminario: 'Seminario',
      otro: 'Otro'
    };
    return categorias[categoria] || categoria;
  };

  // Función para obtener el color de la categoría
  const getColorCategoria = (categoria) => {
    const colores = {
      conferencia: '#3498db',
      taller: '#2ecc71',
      seminario: '#9b59b6',
      otro: '#95a5a6'
    };
    return colores[categoria] || '#95a5a6';
  };

  return (
    <div style={{
      padding: '25px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '20px',
        borderBottom: '3px solid #3498db',
        paddingBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span>📅</span>
        Registrar Nuevo Evento
        <span style={{
          fontSize: '0.8rem',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '2px 12px',
          borderRadius: '20px',
          fontWeight: 'normal',
          marginLeft: 'auto'
        }}>
          {eventosRegistrados.length} eventos
        </span>
      </h2>

      {/* Mensaje de confirmación */}
      {confirmacionVisible && ultimoEvento && (
        <div style={{ marginBottom: '20px' }}>
          <Alerta tipo="exito" titulo="✅ Evento Registrado Exitosamente">
            <div>
              <p><strong>Título:</strong> {ultimoEvento.titulo}</p>
              <p><strong>Fecha:</strong> {ultimoEvento.fecha}</p>
              <p><strong>Categoría:</strong> {getNombreCategoria(ultimoEvento.categoria)}</p>
              <p><strong>Visibilidad:</strong> {ultimoEvento.esPublico ? 'Público' : 'Privado'}</p>
            </div>
          </Alerta>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {/* Campo: Título */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            Título del Evento *
          </label>
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={handleChange}
            placeholder="Ej: Conferencia Internacional de React"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `2px solid ${errores.titulo && intentadoEnviar ? '#e74c3c' : '#dee2e6'}`,
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              if (!errores.titulo || !intentadoEnviar) {
                e.currentTarget.style.borderColor = '#dee2e6';
              }
            }}
          />
          {errores.titulo && intentadoEnviar && (
            <div style={{ marginTop: '6px' }}>
              <Alerta tipo="error" titulo="Error">
                {errores.titulo}
              </Alerta>
            </div>
          )}
          <div style={{
            fontSize: '0.8rem',
            color: '#7f8c8d',
            marginTop: '4px'
          }}>
            Mínimo 5 caracteres
          </div>
        </div>

        {/* Campo: Fecha */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            Fecha del Evento *
          </label>
          <input
            type="date"
            name="fecha"
            value={formulario.fecha}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `2px solid ${errores.fecha && intentadoEnviar ? '#e74c3c' : '#dee2e6'}`,
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              if (!errores.fecha || !intentadoEnviar) {
                e.currentTarget.style.borderColor = '#dee2e6';
              }
            }}
          />
          {errores.fecha && intentadoEnviar && (
            <div style={{ marginTop: '6px' }}>
              <Alerta tipo="error" titulo="Error">
                {errores.fecha}
              </Alerta>
            </div>
          )}
          <div style={{
            fontSize: '0.8rem',
            color: '#7f8c8d',
            marginTop: '4px'
          }}>
            Selecciona una fecha futura
          </div>
        </div>

        {/* Campo: Categoría */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            Categoría *
          </label>
          <select
            name="categoria"
            value={formulario.categoria}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `2px solid ${errores.categoria && intentadoEnviar ? '#e74c3c' : '#dee2e6'}`,
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              if (!errores.categoria || !intentadoEnviar) {
                e.currentTarget.style.borderColor = '#dee2e6';
              }
            }}
          >
            <option value="">Selecciona una categoría...</option>
            <option value="conferencia">Conferencia</option>
            <option value="taller">Taller</option>
            <option value="seminario">Seminario</option>
            <option value="otro">Otro</option>
          </select>
          {errores.categoria && intentadoEnviar && (
            <div style={{ marginTop: '6px' }}>
              <Alerta tipo="error" titulo="Error">
                {errores.categoria}
              </Alerta>
            </div>
          )}
        </div>

        {/* Campo: Descripción */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            Descripción *
          </label>
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
            placeholder="Describe el evento en detalle..."
            rows="4"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `2px solid ${errores.descripcion && intentadoEnviar ? '#e74c3c' : '#dee2e6'}`,
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3498db';
            }}
            onBlur={(e) => {
              if (!errores.descripcion || !intentadoEnviar) {
                e.currentTarget.style.borderColor = '#dee2e6';
              }
            }}
          />
          {errores.descripcion && intentadoEnviar && (
            <div style={{ marginTop: '6px' }}>
              <Alerta tipo="error" titulo="Error">
                {errores.descripcion}
              </Alerta>
            </div>
          )}
          <div style={{
            fontSize: '0.8rem',
            color: '#7f8c8d',
            marginTop: '4px'
          }}>
            Mínimo 20 caracteres ({formulario.descripcion.length}/20)
          </div>
        </div>

        {/* Campo: Público/Privado */}
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            <input
              type="checkbox"
              name="esPublico"
              checked={formulario.esPublico}
              onChange={handleChange}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#3498db'
              }}
            />
            {formulario.esPublico ? '🌐 Evento Público' : '🔒 Evento Privado'}
          </label>
          <p style={{
            margin: '6px 0 0 0',
            fontSize: '0.85rem',
            color: '#7f8c8d',
            marginLeft: '32px'
          }}>
            {formulario.esPublico 
              ? 'El evento será visible para todos los usuarios' 
              : 'El evento solo será visible para usuarios autorizados'}
          </p>
        </div>

        {/* Botones de acción */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
          paddingTop: '10px',
          borderTop: '2px solid #e9ecef'
        }}>
          <BotonAccion
            texto="🔄 Limpiar"
            variante="secundario"
            onClick={limpiarFormulario}
          />
          <BotonAccion
            texto="📅 Registrar Evento"
            variante="primario"
            disabled={!esFormularioValido()}
            onClick={handleSubmit}
          />
        </div>
      </form>

      {/* Lista de eventos registrados */}
      {eventosRegistrados.length > 0 && (
        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #e9ecef'
        }}>
          <h3 style={{
            color: '#2c3e50',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📋 Eventos Registrados
            <span style={{
              fontSize: '0.8rem',
              backgroundColor: '#3498db',
              color: 'white',
              padding: '2px 12px',
              borderRadius: '20px',
              fontWeight: 'normal'
            }}>
              {eventosRegistrados.length}
            </span>
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '5px'
          }}>
            {eventosRegistrados.map((evento) => (
              <div
                key={evento.id}
                style={{
                  padding: '14px 18px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px',
                  border: `2px solid ${getColorCategoria(evento.categoria)}30`,
                  borderLeft: `4px solid ${getColorCategoria(evento.categoria)}`,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f3f5';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '1.05rem'
                    }}>
                      {evento.titulo}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#7f8c8d',
                      marginTop: '4px'
                    }}>
                      📅 {evento.fecha}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#7f8c8d'
                    }}>
                      {evento.descripcion}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px'
                  }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      backgroundColor: `${getColorCategoria(evento.categoria)}20`,
                      color: getColorCategoria(evento.categoria),
                      border: `1px solid ${getColorCategoria(evento.categoria)}`
                    }}>
                      {getNombreCategoria(evento.categoria)}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: evento.esPublico ? '#27ae60' : '#e74c3c',
                      fontWeight: '600'
                    }}>
                      {evento.esPublico ? '🌐 Público' : '🔒 Privado'}
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      color: '#95a5a6'
                    }}>
                      ID: #{evento.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioEvento;