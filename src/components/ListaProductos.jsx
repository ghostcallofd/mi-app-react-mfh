const ListaProductos = () => {
  const productos = [
    {
      id: 1,
      nombre: 'Laptop Pro',
      precio: 1299.99,
      disponible: true
    },
    {
      id: 2,
      nombre: 'Smartphone X',
      precio: 899.50,
      disponible: false
    },
    {
      id: 3,
      nombre: 'Auriculares Bluetooth',
      precio: 79.99,
      disponible: true
    },
    {
      id: 4,
      nombre: 'Monitor 4K',
      precio: 449.00,
      disponible: false
    },
    {
      id: 5,
      nombre: 'Teclado Mecánico',
      precio: 129.99,
      disponible: true
    }
  ];

  const formatearPrecio = (precio) => {
    return `$${precio.toFixed(2)}`;
  };

  return (
    <div style={{
      padding: '25px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #dee2e6',
      maxWidth: '800px',
      margin: '10px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#2c3e50',
        borderBottom: '3px solid #3498db',
        paddingBottom: '10px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>📦 Lista de Productos</span>
        <span style={{
          fontSize: '0.9rem',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: 'normal'
        }}>
          {productos.length} productos
        </span>
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#2c3e50',
              color: 'white'
            }}>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Nombre
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'right',
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Precio
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr
                key={producto.id}
                style={{
                  borderBottom: '1px solid #e9ecef',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f3f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={{
                  padding: '12px 16px',
                  color: '#2c3e50',
                  fontWeight: '500'
                }}>
                  {producto.nombre}
                </td>
                <td style={{
                  padding: '12px 16px',
                  textAlign: 'right',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  {formatearPrecio(producto.precio)}
                </td>
                <td style={{
                  padding: '12px 16px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: producto.disponible ? '#27ae60' : '#e74c3c',
                    backgroundColor: producto.disponible ? '#e8f5e9' : '#ffebee',
                    border: `2px solid ${producto.disponible ? '#27ae60' : '#e74c3c'}`
                  }}>
                    {producto.disponible ? '✅ Disponible' : '❌ Agotado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{
              backgroundColor: '#f1f3f5',
              fontWeight: '600'
            }}>
              <td style={{
                padding: '12px 16px',
                color: '#2c3e50'
              }}>
                <strong>Total</strong>
              </td>
              <td style={{
                padding: '12px 16px',
                textAlign: 'right',
                color: '#2c3e50'
              }}>
                <strong>
                  {formatearPrecio(productos.reduce((total, producto) => total + producto.precio, 0))}
                </strong>
              </td>
              <td style={{
                padding: '12px 16px',
                textAlign: 'center',
                color: '#2c3e50'
              }}>
                <strong>
                  {productos.filter(p => p.disponible).length} disponibles
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{
        marginTop: '15px',
        padding: '12px',
        backgroundColor: '#e8f4fd',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '0.95rem',
        color: '#2c3e50'
      }}>
        <div>
          <strong>Total productos:</strong> {productos.length}
        </div>
        <div>
          <strong style={{ color: '#27ae60' }}>Disponibles:</strong> {productos.filter(p => p.disponible).length}
        </div>
        <div>
          <strong style={{ color: '#e74c3c' }}>Agotados:</strong> {productos.filter(p => !p.disponible).length}
        </div>
        <div>
          <strong>Precio promedio:</strong> {formatearPrecio(productos.reduce((total, p) => total + p.precio, 0) / productos.length)}
        </div>
      </div>
    </div>
  );
};

export default ListaProductos;