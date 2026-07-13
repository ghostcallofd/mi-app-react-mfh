import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';
import FormularioNota from '../components/FormularioNota';

const EditarNota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notas, editarNota } = useNotas();

  // Buscar la nota por ID
  const nota = notas.find(n => n.id === id);

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
          La nota que intentas editar no existe o ha sido eliminada.
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

  // Función para manejar el envío del formulario
  const handleSubmit = (datos) => {
    editarNota(id, datos);
    navigate(`/notas/${id}`);
  };

  // Función para cancelar
  const handleCancel = () => {
    navigate(`/notas/${id}`);
  };

  return (
    <div>
      <div style={{
        marginBottom: '20px',
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <h2 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '1.5rem'
          }}>
            ✏️ Editar Nota
          </h2>
          <p style={{
            margin: '4px 0 0 0',
            color: '#7f8c8d',
            fontSize: '0.9rem'
          }}>
            Modifica los campos y guarda los cambios
          </p>
        </div>
        <span style={{
          fontSize: '0.8rem',
          color: '#95a5a6',
          backgroundColor: '#f1f3f5',
          padding: '4px 12px',
          borderRadius: '12px'
        }}>
          ID: {id}
        </span>
      </div>

      <FormularioNota
        notaInicial={nota}
        onSubmit={handleSubmit}
        submitText="Actualizar Nota"
        cancelText="Cancelar"
        onCancel={handleCancel}
        isEditing={true}
      />
    </div>
  );
};

export default EditarNota;