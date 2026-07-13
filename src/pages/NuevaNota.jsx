import { useNavigate } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';
import FormularioNota from '../components/FormularioNota';

const NuevaNota = () => {
  const navigate = useNavigate();
  const { agregarNota } = useNotas();

  // Función para manejar el envío del formulario
  const handleSubmit = (datos) => {
    agregarNota(datos);
    navigate('/notas');
  };

  // Función para cancelar
  const handleCancel = () => {
    navigate('/notas');
  };

  return (
    <div>
      <div style={{
        marginBottom: '20px',
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{
          margin: 0,
          color: '#2c3e50',
          fontSize: '1.5rem'
        }}>
          ✨ Crear Nueva Nota
        </h2>
        <p style={{
          margin: '4px 0 0 0',
          color: '#7f8c8d',
          fontSize: '0.95rem'
        }}>
          Completa los campos para agregar una nueva nota a tu colección
        </p>
      </div>

      <FormularioNota
        onSubmit={handleSubmit}
        submitText="Crear Nota"
        cancelText="Cancelar"
        onCancel={handleCancel}
        isEditing={false}
      />
    </div>
  );
};

export default NuevaNota;