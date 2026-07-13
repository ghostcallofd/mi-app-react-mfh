import { useEffect } from 'react';

const Modal = ({ titulo, abierto, children, onClose }) => {
  // Si el modal está cerrado, retorna null (early return)
  if (!abierto) {
    return null;
  }

  // Efecto para prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [abierto]);

  // Función para cerrar al hacer clic en el fondo
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease',
        padding: '20px'
      }}
      onClick={handleBackdropClick}
    >
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          padding: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.3s ease',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Botón de cerrar (X) */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#95a5a6',
            transition: 'color 0.2s ease',
            padding: '4px 8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#e74c3c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#95a5a6';
          }}
        >
          ✕
        </button>

        {/* Título del modal */}
        <h2
          style={{
            margin: '0 0 20px 0',
            color: '#2c3e50',
            fontSize: '1.5rem',
            fontWeight: '700',
            borderBottom: '3px solid #3498db',
            paddingBottom: '12px'
          }}
        >
          {titulo}
        </h2>

        {/* Contenido del modal */}
        <div style={{
          marginBottom: '20px'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;