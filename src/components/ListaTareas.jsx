const ListaTareas = () => {
  const tareas = [
    { id: 1, titulo: 'Completar informe mensual', completada: false, prioridad: 'alta' },
    { id: 2, titulo: 'Revisar correos electrónicos', completada: false, prioridad: 'media' },
    { id: 3, titulo: 'Preparar presentación para reunión', completada: false, prioridad: 'alta' },
    { id: 4, titulo: 'Actualizar documentación del proyecto', completada: true, prioridad: 'media' },
    { id: 5, titulo: 'Responder solicitudes de clientes', completada: false, prioridad: 'baja' },
    { id: 6, titulo: 'Realizar pruebas de software', completada: true, prioridad: 'alta' },
    { id: 7, titulo: 'Organizar archivos del sistema', completada: false, prioridad: 'baja' }
  ];

  const tareasPendientes = tareas.filter(tarea => !tarea.completada);
  const tareasCompletadas = tareas.filter(tarea => tarea.completada);

  const getPrioridadColor = (prioridad) => {
    const colores = {
      alta: { bg: '#ffebee', text: '#c62828', border: '#e53935' },
      media: { bg: '#fff3e0', text: '#e65100', border: '#fb8c00' },
      baja: { bg: '#e8f5e9', text: '#2e7d32', border: '#43a047' }
    };
    return colores[prioridad] || colores.baja;
  };

  const getPrioridadIcono = (prioridad) => {
    const iconos = {
      alta: '🔴',
      media: '🟠',
      baja: '🟢'
    };
    return iconos[prioridad] || '⚪';
  };

  const renderizarListaTareas = (listaTareas, titulo, tipo) => {
    const esPendiente = tipo === 'pendiente';
    const isEmpty = listaTareas.length === 0;

    return (
      <div style={{
        flex: 1,
        minWidth: '300px',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: `2px solid ${esPendiente ? '#ff9800' : '#4caf50'}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
          paddingBottom: '10px',
          borderBottom: `3px solid ${esPendiente ? '#ff9800' : '#4caf50'}`
        }}>
          <h3 style={{
            margin: 0,
            color: esPendiente ? '#e65100' : '#2e7d32'
          }}>
            {esPendiente ? '📋' : '✅'} {titulo}
          </h3>
          <span style={{
            backgroundColor: esPendiente ? '#ff9800' : '#4caf50',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}>
            {listaTareas.length}
          </span>
        </div>

        {isEmpty ? (
          <div style={{
            textAlign: 'center',
            padding: '30px 20px',
            color: '#95a5a6',
            fontStyle: 'italic',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            {esPendiente ? '🎉 No hay tareas pendientes' : '📝 No hay tareas completadas'}
          </div>
        ) : (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {listaTareas.map((tarea) => {
              const prioridadColor = getPrioridadColor(tarea.prioridad);
              const esPrioridadAlta = tarea.prioridad === 'alta';

              return (
                <li
                  key={tarea.id}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${prioridadColor.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    textDecoration: esPendiente ? 'none' : 'line-through',
                    opacity: esPendiente ? 1 : 0.7,
                    fontWeight: esPrioridadAlta && esPendiente ? 'bold' : 'normal',
                    color: esPrioridadAlta && esPendiente ? '#c62828' : '#2c3e50'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flex: 1
                  }}>
                    <span style={{
                      fontSize: '1.1rem'
                    }}>
                      {getPrioridadIcono(tarea.prioridad)}
                    </span>
                    <span style={{
                      flex: 1
                    }}>
                      {tarea.titulo}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      backgroundColor: prioridadColor.bg,
                      color: prioridadColor.text,
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      border: `1px solid ${prioridadColor.border}`
                    }}>
                      {tarea.prioridad}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      color: '#95a5a6',
                      backgroundColor: '#e9ecef',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}>
                      #{tarea.id}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div style={{
      padding: '25px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #dee2e6',
      margin: '10px auto',
      maxWidth: '1000px',
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
        <span>📝 Lista de Tareas</span>
        <span style={{
          fontSize: '0.9rem',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: 'normal'
        }}>
          Total: {tareas.length}
        </span>
      </h2>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {renderizarListaTareas(tareasPendientes, 'Tareas Pendientes', 'pendiente')}
        {renderizarListaTareas(tareasCompletadas, 'Tareas Completadas', 'completada')}
      </div>

      <div style={{
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2c3e50' }}>
            {tareas.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>Total Tareas</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff9800' }}>
            {tareasPendientes.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>Pendientes</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#4caf50' }}>
            {tareasCompletadas.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>Completadas</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#e53935' }}>
            {tareas.filter(t => t.prioridad === 'alta' && !t.completada).length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>Prioridad Alta Pendiente</div>
        </div>
      </div>
    </div>
  );
};

export default ListaTareas;