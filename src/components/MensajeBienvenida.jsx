const MensajeBienvenida = () => {
  const usuario = {
    nombre: 'María García',
    rol: 'admin'
  };
  
  if (usuario === null) {
    return (
      <div style={{
        padding: '30px',
        backgroundColor: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '10px auto'
      }}>
        <p style={{
          fontSize: '1.2rem',
          color: '#856404',
          margin: 0
        }}>
          🔒 Por favor, inicia sesión para continuar
        </p>
      </div>
    );
  }
  
  const { nombre, rol } = usuario;
  const esAdmin = rol === 'admin';
  
  return (
    <div style={{
      padding: '25px',
      backgroundColor: '#e8f5e9',
      border: '2px solid #4caf50',
      borderRadius: '12px',
      maxWidth: '500px',
      margin: '10px auto',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#2e7d32',
        marginBottom: '10px'
      }}>
        👋 Bienvenido, {nombre}
      </h2>
      
      <p style={{
        fontSize: '1.1rem',
        color: '#1b5e20',
        margin: '5px 0'
      }}>
        <strong>Rol:</strong> {rol.charAt(0).toUpperCase() + rol.slice(1)}
      </p>
      
      {esAdmin && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#c8e6c9',
          borderRadius: '8px',
          border: '1px solid #4caf50',
          color: '#1b5e20'
        }}>
          ⭐ Tienes acceso completo al sistema
        </div>
      )}
      
      {!esAdmin && rol !== 'invitado' && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #2196f3',
          color: '#0d47a1',
          fontSize: '0.95rem'
        }}>
          ℹ️ Tienes acceso limitado al sistema
        </div>
      )}
    </div>
  );
};

export default MensajeBienvenida;