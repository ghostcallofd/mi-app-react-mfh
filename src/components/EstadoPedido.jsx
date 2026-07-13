const EstadoPedido = ({ estado = 'pendiente' }) => {
  const estadosValidos = ['pendiente', 'enviado', 'entregado', 'cancelado'];
  const estadoActual = estadosValidos.includes(estado) ? estado : 'pendiente';
  
  const config = {
    pendiente: {
      icono: '⏳',
      mensaje: 'Tu pedido está siendo procesado',
      color: '#f39c12',
      bgColor: '#fff3e0'
    },
    enviado: {
      icono: '🚚',
      mensaje: 'Tu pedido está en camino',
      color: '#3498db',
      bgColor: '#e3f2fd'
    },
    entregado: {
      icono: '✅',
      mensaje: 'Tu pedido ha sido entregado',
      color: '#27ae60',
      bgColor: '#e8f5e9'
    },
    cancelado: {
      icono: '❌',
      mensaje: 'Tu pedido fue cancelado',
      color: '#e74c3c',
      bgColor: '#ffebee'
    }
  };
  
  const { icono, mensaje, color, bgColor } = config[estadoActual];
  
  return (
    <div style={{
      padding: '20px',
      border: `2px solid ${color}`,
      borderRadius: '10px',
      margin: '10px 0',
      backgroundColor: bgColor,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '2.5rem' }}>{icono}</span>
        <div>
          <h3 style={{ margin: 0, color: color }}>
            {estadoActual.charAt(0).toUpperCase() + estadoActual.slice(1)}
          </h3>
          <p style={{ margin: '5px 0 0 0', fontWeight: '500' }}>
            {mensaje}
          </p>
        </div>
      </div>
      
      {estadoActual === 'enviado' && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #3498db'
        }}>
          ⏱️ Tiempo estimado de entrega: 2-3 días hábiles
        </div>
      )}
    </div>
  );
};

export default EstadoPedido;