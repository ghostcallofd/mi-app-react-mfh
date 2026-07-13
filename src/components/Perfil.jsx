const Perfil = () => {
  const nombre = "Marcos Fernàndez Haber";
  const profesion = "Desarrollador Frontend";
  const experiencia = 5;
  const disponible = true;

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      margin: '10px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>{nombre}</h2>
      <p><strong>Profesión:</strong> {profesion}</p>
      <p>{experiencia} años de experiencia</p>
      <p>
        <strong>Estado:</strong> {disponible ? 'Disponible para contratar' : 'No disponible'}
      </p>
    </div>
  );
};

export default Perfil;