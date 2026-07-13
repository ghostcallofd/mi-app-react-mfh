import { useState, useEffect } from 'react';

const FormularioNota = ({ 
  notaInicial = null,
  onSubmit,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
  onCancel,
  isEditing = false
}) => {
  // Estado del formulario
  const [formulario, setFormulario] = useState({
    titulo: '',
    contenido: '',
    categoria: 'personal',
    fijada: false
  });

  // Estado de errores
  const [errores, setErrores] = useState({});
  const [intentadoEnviar, setIntentadoEnviar] = useState(false);

  // Cargar datos iniciales si existe nota
  useEffect(() => {
    if (notaInicial) {
      setFormulario({
        titulo: notaInicial.titulo || '',
        contenido: notaInicial.contenido || '',
        categoria: notaInicial.categoria || 'personal',
        fijada: notaInicial.fijada || false
      });
    }
  }, [notaInicial]);

  // Opciones de categorías
  const opcionesCategoria = [
    { value: 'personal', label: '👤 Personal' },
    { value: 'trabajo', label: '💼 Trabajo' },
    { value: 'estudio', label: '📚 Estudio' },
    { value: 'ideas', label: '💡 Ideas' }
  ];

  // Validar un campo específico
  const validarCampo = (nombre, valor) => {
    switch (nombre) {
      case 'titulo':
        return valor.trim().length < 3 
          ? 'El título debe tener al menos 3 caracteres' 
          : '';
      case 'contenido':
        return valor.trim().length < 10 
          ? 'El contenido debe tener al menos 10 caracteres' 
          : '';
      default:
        return '';
    }
  };

  // Validar todo el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validar título
    const errorTitulo = validarCampo('titulo', formulario.titulo);
    if (errorTitulo) nuevosErrores.titulo = errorTitulo;
    
    // Validar contenido
    const errorContenido = validarCampo('contenido', formulario.contenido);
    if (errorContenido) nuevosErrores.contenido = errorContenido;

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Verificar si el formulario es válido
  const esFormularioValido = () => {
    const errorTitulo = validarCampo('titulo', formulario.titulo);
    const errorContenido = validarCampo('contenido', formulario.contenido);
    return !errorTitulo && !errorContenido;
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valor = type === 'checkbox' ? checked : value;
    
    setFormulario(prev => ({
      ...prev,
      [name]: valor
    }));

    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar blur para validación en tiempo real
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validarCampo(name, value);
    if (error) {
      setErrores(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setIntentadoEnviar(true);

    if (validarFormulario()) {
      onSubmit(formulario);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      {/* Campo: Título */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '6px',
          fontWeight: '600',
          color: '#2c3e50'
        }}>
          📌 Título *
        </label>
        <input
          type="text"
          name="titulo"
          value={formulario.titulo}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribe un título para tu nota..."
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
          <div style={{
            marginTop: '4px',
            color: '#e74c3c',
            fontSize: '0.85rem'
          }}>
            ⚠️ {errores.titulo}
          </div>
        )}
        <div style={{
          fontSize: '0.75rem',
          color: '#7f8c8d',
          marginTop: '4px'
        }}>
          Mínimo 3 caracteres ({formulario.titulo.length}/3)
        </div>
      </div>

      {/* Campo: Contenido */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '6px',
          fontWeight: '600',
          color: '#2c3e50'
        }}>
          📝 Contenido *
        </label>
        <textarea
          name="contenido"
          value={formulario.contenido}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribe el contenido de tu nota..."
          rows="6"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: `2px solid ${errores.contenido && intentadoEnviar ? '#e74c3c' : '#dee2e6'}`,
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
            if (!errores.contenido || !intentadoEnviar) {
              e.currentTarget.style.borderColor = '#dee2e6';
            }
          }}
        />
        {errores.contenido && intentadoEnviar && (
          <div style={{
            marginTop: '4px',
            color: '#e74c3c',
            fontSize: '0.85rem'
          }}>
            ⚠️ {errores.contenido}
          </div>
        )}
        <div style={{
          fontSize: '0.75rem',
          color: '#7f8c8d',
          marginTop: '4px'
        }}>
          Mínimo 10 caracteres ({formulario.contenido.length}/10)
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
          📂 Categoría
        </label>
        <select
          name="categoria"
          value={formulario.categoria}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '2px solid #dee2e6',
            fontSize: '1rem',
            transition: 'border-color 0.2s ease',
            outline: 'none',
            backgroundColor: 'white',
            cursor: 'pointer'
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

      {/* Campo: Fijada */}
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
            name="fijada"
            checked={formulario.fijada}
            onChange={handleChange}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              accentColor: '#f1c40f'
            }}
          />
          {formulario.fijada ? '⭐ Fijar nota' : '☆ Fijar nota'}
        </label>
        <p style={{
          margin: '6px 0 0 0',
          fontSize: '0.85rem',
          color: '#7f8c8d',
          marginLeft: '32px'
        }}>
          {formulario.fijada 
            ? 'La nota aparecerá al inicio de la lista' 
            : 'La nota aparecerá en orden cronológico'}
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
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 24px',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7f8c8d';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#95a5a6';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ❌ {cancelText}
        </button>
        <button
          type="submit"
          disabled={!esFormularioValido()}
          style={{
            padding: '10px 24px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: esFormularioValido() ? 'pointer' : 'not-allowed',
            opacity: esFormularioValido() ? 1 : 0.5,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (esFormularioValido()) {
              e.currentTarget.style.backgroundColor = '#27ae60';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (esFormularioValido()) {
              e.currentTarget.style.backgroundColor = '#2ecc71';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          💾 {submitText}
        </button>
      </div>
    </form>
  );
};

export default FormularioNota;