import { useState } from 'react';
import VisorDocumento from './VisorDocumento';
import BotonAccion from './BotonAccion';

const DemoDesmontaje = () => {
  // Estado para controlar si el componente está montado
  const [mostrarVisor, setMostrarVisor] = useState(true);

  // Función para alternar la visibilidad del componente
  const toggleVisor = () => {
    setMostrarVisor(prev => !prev);
  };

  return (
    <div style={{
      padding: '25px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #dee2e6',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e9ecef'
      }}>
        <h3 style={{
          margin: 0,
          color: '#2c3e50'
        }}>
          🔬 Demostración de useEffect y Limpieza
        </h3>
        <BotonAccion
          texto={mostrarVisor ? '👀 Ocultar Visor' : '👁️ Mostrar Visor'}
          variante={mostrarVisor ? 'peligro' : 'primario'}
          onClick={toggleVisor}
        />
      </div>

      <div style={{
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '8px',
        marginBottom: '20px',
        borderLeft: '4px solid #ffc107'
      }}>
        <p style={{ margin: 0, color: '#856404', fontSize: '0.95rem' }}>
          <strong>💡 Instrucciones:</strong>
        </p>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#856404', fontSize: '0.9rem' }}>
          <li>El componente VisorDocumento actualiza el título de la pestaña</li>
          <li>Al ocultarlo, el título se restaura a "Mi App"</li>
          <li>Revisa la consola del navegador para ver los logs de limpieza</li>
        </ul>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px dashed #dee2e6',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {mostrarVisor ? (
          <VisorDocumento />
        ) : (
          <div style={{
            textAlign: 'center',
            color: '#95a5a6'
          }}>
            <span style={{ fontSize: '3rem', display: 'block' }}>📭</span>
            <p style={{ fontSize: '1.1rem' }}>
              El Visor de Documento está oculto
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              El título de la pestaña ha sido restaurado
            </p>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '15px',
        padding: '12px',
        backgroundColor: '#e8f4fd',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: '#2c3e50',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0 }}>
          <strong>Estado actual:</strong> {mostrarVisor ? '🟢 Componente montado' : '🔴 Componente desmontado'}
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#7f8c8d' }}>
          Revisa la consola para ver los mensajes de limpieza
        </p>
      </div>
    </div>
  );
};

export default DemoDesmontaje;