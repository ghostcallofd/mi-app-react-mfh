const NuevaNota = () => {
  return (
    <div>
      <div style={{
        marginBottom: '20px',
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{
          margin: 0,
          color: '#2c3e50',
          fontSize: '1.5rem'
        }}>
          ✨ Nueva Nota
        </h2>
      </div>

      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '2px dashed #dee2e6',
        color: '#95a5a6'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
        <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>
          Formulario para crear nueva nota
        </h3>
        <p>
          Aquí se mostrará el formulario completo para agregar notas.
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          (Ejercicio 4 — Formulario para crear y editar notas)
        </p>
      </div>
    </div>
  );
};

export default NuevaNota;