// src/App.jsx
import React, { useState } from 'react';
import './App.css';

// Importación de componentes de ejercicios anteriores
import Perfil from './components/Perfil';
import Clima from './components/Clima';
import EstadoPedido from './components/EstadoPedido';
import MensajeBienvenida from './components/MensajeBienvenida';
import ListaHabilidades from './components/ListaHabilidades';
import ListaProductos from './components/ListaProductos';
import ListaTareas from './components/ListaTareas';
import Tarjeta from './components/Tarjeta';
import Dashboard from './components/Dashboard';
import Alerta from './components/Alerta';
import Acordeon from './components/Acordeon';
import BotonAccion from './components/BotonAccion';
import Modal from './components/Modal';
import Contador from './components/Contador';
import ListaContactos from './components/ListaContactos';
import FormularioEvento from './components/FormularioEvento';

function App() {
  // Estados para el modal del ejercicio 2
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarAlertaBoton, setMostrarAlertaBoton] = useState(false);

  // Datos para las tarjetas del ejercicio 8
  const tarjetasData = [
    {
      titulo: 'React Avanzado',
      descripcion: 'Curso completo de React con hooks, context API y optimización de rendimiento. Aprende a construir aplicaciones modernas y escalables.',
      etiquetas: ['React', 'JavaScript', 'Hooks', 'Context API'],
      destacado: true
    },
    {
      titulo: 'Desarrollo Full Stack',
      descripcion: 'Aprende a desarrollar aplicaciones web completas con Node.js, Express, MongoDB y React. Proyectos prácticos incluidos.',
      etiquetas: ['Node.js', 'Express', 'MongoDB', 'React'],
      destacado: false
    },
    {
      titulo: 'UI/UX Design',
      descripcion: 'Principios de diseño de interfaces centradas en el usuario. Prototipado, pruebas de usabilidad y herramientas de diseño.',
      etiquetas: ['Design', 'Figma', 'Prototyping', 'UX'],
      destacado: false
    },
    {
      titulo: 'DevOps Essentials',
      descripcion: 'Fundamentos de DevOps: CI/CD, Docker, Kubernetes y monitoreo. Automatización de infraestructura y despliegue.',
      etiquetas: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
      destacado: true
    }
  ];

  // Datos para el ejercicio 4
  const usuarioAdmin = { nombre: 'Ana Martínez', rol: 'admin' };
  const usuarioNormal = { nombre: 'Carlos López', rol: 'usuario' };

  // Funciones para el modal
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  // Función para el botón de alerta
  const mostrarAlerta = () => {
    setMostrarAlertaBoton(true);
    setTimeout(() => setMostrarAlertaBoton(false), 3000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Ejercicios Prácticos de React JS</h1>
        <p className="subtitle">
          Todos los ejercicios organizados en acordeones interactivos
        </p>
        <div className="header-stats">
          <span>📦 5 Ejercicios</span>
          <span>•</span>
          <span>⚛️ React + Hooks</span>
          <span>•</span>
          <span>🎯 15+ Componentes</span>
        </div>
      </header>

      <main className="App-main">
        {/* ============================================ */}
        {/* EJERCICIO 1 - Componentes con Props y Children */}
        {/* ============================================ */}
        <Acordeon 
          titulo="📦 Ejercicio 1 — Componentes con Props y Children" 
          icono="🔧"
          color="#3498db"
          inicialmenteExpandido={true}
        >
          <div className="exercise-content">
            <h4>🔔 Componente Alerta - 4 tipos diferentes:</h4>
            
            <Alerta tipo="exito" titulo="Operación Exitosa">
              <p>El archivo ha sido subido correctamente al servidor.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Detalles:</strong> 2.4 MB subidos en 1.2 segundos
              </p>
            </Alerta>

            <Alerta tipo="advertencia" titulo="Espacio de Almacenamiento">
              <p>Estás utilizando el 85% de tu espacio de almacenamiento.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Recomendación:</strong> Libera al menos 500 MB para continuar trabajando.
              </p>
            </Alerta>

            <Alerta tipo="error" titulo="Error de Conexión">
              <p>No se pudo establecer conexión con el servidor.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Solución:</strong> Verifica tu conexión a internet e intenta nuevamente.
              </p>
            </Alerta>

            <Alerta tipo="info" titulo="Actualización Disponible">
              <p>Hay una nueva versión del sistema disponible para instalar.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Versión:</strong> v2.4.1 · <strong>Tamaño:</strong> 45 MB
              </p>
            </Alerta>

            <hr style={{ margin: '30px 0' }} />

            <h4>📋 Componente Acordeón - Demostración de estado independiente:</h4>
            <p style={{ color: '#7f8c8d', marginBottom: '15px' }}>
              Cada acordeón gestiona su propio estado de expansión de forma independiente.
            </p>

            <Acordeon 
              titulo="📖 ¿Qué es React?" 
              icono="⚛️"
              color="#61dafb"
            >
              <div>
                <p><strong>React</strong> es una biblioteca JavaScript para construir interfaces de usuario.</p>
                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                  <li>Desarrollada por Facebook</li>
                  <li>Basada en componentes reutilizables</li>
                  <li>Utiliza un DOM virtual para optimizar el rendimiento</li>
                  <li>Permite crear aplicaciones web y móviles (React Native)</li>
                </ul>
                <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '8px' }}>
                  📅 Lanzamiento: 2013 · Última versión: 18.2.0
                </p>
              </div>
            </Acordeon>

            <Acordeon 
              titulo="💡 Hooks en React" 
              icono="🎣"
              color="#764ba2"
            >
              <div>
                <p>Los <strong>Hooks</strong> son funciones que permiten usar estado y otras características de React sin escribir clases.</p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  <div style={{
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                  }}>
                    <strong>useState</strong>
                    <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0', color: '#7f8c8d' }}>
                      Maneja el estado local
                    </p>
                  </div>
                  <div style={{
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                  }}>
                    <strong>useEffect</strong>
                    <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0', color: '#7f8c8d' }}>
                      Maneja efectos secundarios
                    </p>
                  </div>
                  <div style={{
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                  }}>
                    <strong>useContext</strong>
                    <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0', color: '#7f8c8d' }}>
                      Comparte estado global
                    </p>
                  </div>
                </div>
              </div>
            </Acordeon>

            <Acordeon 
              titulo="🚀 Mejores Prácticas" 
              icono="✨"
              color="#28a745"
            >
              <div>
                <p><strong>Consejos para escribir mejor código React:</strong></p>
                <ul style={{ margin: '10px 0', paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>✅ Mantén los componentes pequeños y enfocados</li>
                  <li>✅ Usa nombres descriptivos para variables y funciones</li>
                  <li>✅ Evita la mutación directa del estado</li>
                  <li>✅ Utiliza keys únicas en las listas</li>
                  <li>✅ Divide la lógica en hooks personalizados</li>
                </ul>
              </div>
            </Acordeon>
          </div>
        </Acordeon>

        {/* ============================================ */}
        {/* EJERCICIO 2 - Composición, Estado y Eventos */}
        {/* ============================================ */}
        <Acordeon 
          titulo="🎯 Ejercicio 2 — Composición, Estado y Eventos" 
          icono="⚡"
          color="#e74c3c"
          inicialmenteExpandido={false}
        >
          <div className="exercise-content">
            <h3>📱 Demo de Componentes Interactivos</h3>

            {/* Botones de acción */}
            <div style={{
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '15px' }}>
                🎯 Botones de Acción - Demostración de variantes
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center'
              }}>
                <BotonAccion 
                  texto="Primario" 
                  variante="primario" 
                  onClick={() => alert('Botón primario clickeado')}
                />
                <BotonAccion 
                  texto="Secundario" 
                  variante="secundario" 
                  onClick={() => alert('Botón secundario clickeado')}
                />
                <BotonAccion 
                  texto="Peligro" 
                  variante="peligro" 
                  onClick={() => alert('Botón peligro clickeado')}
                />
                <BotonAccion 
                  texto="Deshabilitado" 
                  variante="primario" 
                  disabled={true}
                  onClick={() => {}}
                />
                <BotonAccion 
                  texto="Con Alerta" 
                  variante="secundario" 
                  onClick={mostrarAlerta}
                />
              </div>
              {mostrarAlertaBoton && (
                <div style={{ marginTop: '15px' }}>
                  <Alerta tipo="exito" titulo="¡Botón clickeado!">
                    Has hecho clic en el botón correctamente.
                  </Alerta>
                </div>
              )}
            </div>

            {/* Modal */}
            <div style={{
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '15px' }}>
                📦 Modal - Componente con composición
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <BotonAccion 
                  texto="📂 Abrir Modal" 
                  variante="primario" 
                  onClick={abrirModal}
                />
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.9rem', 
                  color: '#7f8c8d'
                }}>
                  Estado del modal: {modalAbierto ? '🔵 Abierto' : '⚪ Cerrado'}
                </p>
              </div>

              <Modal 
                titulo="📋 Información del Sistema"
                abierto={modalAbierto}
                onClose={cerrarModal}
              >
                <div>
                  <p style={{ lineHeight: '1.6', color: '#2c3e50' }}>
                    Este es un modal interactivo creado con composición de componentes en React.
                  </p>
                  <p style={{ lineHeight: '1.6', color: '#2c3e50' }}>
                    El modal utiliza <strong>children</strong> para renderizar contenido dinámico
                    y recibe <strong>props</strong> para controlar su visibilidad.
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid #e9ecef'
                  }}>
                    <BotonAccion 
                      texto="❌ Cerrar Modal" 
                      variante="secundario" 
                      onClick={cerrarModal}
                    />
                  </div>
                </div>
              </Modal>
            </div>

            {/* Contador */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '15px' }}>
                🔢 Contador Interactivo
              </h4>
              <Contador />
            </div>
          </div>
        </Acordeon>

        {/* ============================================ */}
        {/* EJERCICIO 3 - Lista Dinámica con Inmutabilidad */}
        {/* ============================================ */}
        <Acordeon 
          titulo="📇 Ejercicio 3 — Lista Dinámica con Inmutabilidad" 
          icono="🔍"
          color="#9b59b6"
          inicialmenteExpandido={false}
        >
          <div className="exercise-content">
            <ListaContactos />
          </div>
        </Acordeon>

        {/* ============================================ */}
        {/* EJERCICIO 4 - Formulario Controlado con Validación */}
        {/* ============================================ */}
        <Acordeon 
          titulo="📝 Ejercicio 4 — Formulario Controlado con Validación" 
          icono="✅"
          color="#2ecc71"
          inicialmenteExpandido={false}
        >
          <div className="exercise-content">
            <FormularioEvento />
          </div>
        </Acordeon>

        {/* ============================================ */}
        {/* EJERCICIOS ANTERIORES (1-9 del primer bloque) */}
        {/* ============================================ */}
        <Acordeon 
          titulo="📚 Ejercicios Anteriores (1-9) — Fundamentos de React" 
          icono="📖"
          color="#95a5a6"
          inicialmenteExpandido={false}
        >
          <div className="exercise-content">
            {/* Ejercicio 1 - Perfil */}
            <div className="sub-exercise">
              <h4>Ejercicio 1 — Componente con expresiones dinámicas</h4>
              <Perfil />
            </div>

            {/* Ejercicio 2 - Clima */}
            <div className="sub-exercise">
              <h4>Ejercicio 2 — Lógica previa al return</h4>
              <Clima />
            </div>

            {/* Ejercicio 3 - Estado Pedido */}
            <div className="sub-exercise">
              <h4>Ejercicio 3 — Renderizado condicional con operadores</h4>
              <EstadoPedido />
              <div className="exercise-note">
                <small>💡 Cambia el valor de 'estado' en el componente para probar diferentes casos</small>
              </div>
            </div>

            {/* Ejercicio 4 - Mensaje Bienvenida */}
            <div className="sub-exercise">
              <h4>Ejercicio 4 — Renderizado condicional con early return</h4>
              <h5>Usuario Administrador:</h5>
              <MensajeBienvenida usuario={usuarioAdmin} />
              <h5>Usuario Normal:</h5>
              <MensajeBienvenida usuario={usuarioNormal} />
              <h5>Usuario no autenticado (null):</h5>
              <MensajeBienvenida usuario={null} />
            </div>

            {/* Ejercicio 5 - Lista Habilidades */}
            <div className="sub-exercise">
              <h4>Ejercicio 5 — Renderizado de lista simple</h4>
              <ListaHabilidades />
            </div>

            {/* Ejercicio 6 - Lista Productos */}
            <div className="sub-exercise">
              <h4>Ejercicio 6 — Renderizado de lista con objetos</h4>
              <ListaProductos />
            </div>

            {/* Ejercicio 7 - Lista Tareas */}
            <div className="sub-exercise">
              <h4>Ejercicio 7 — Combinación de filter y map</h4>
              <ListaTareas />
            </div>

            {/* Ejercicio 8 - Tarjetas */}
            <div className="sub-exercise">
              <h4>Ejercicio 8 — Componente reutilizable para tarjetas</h4>
              <div className="tarjetas-grid">
                {tarjetasData.map((datos, index) => (
                  <Tarjeta key={index} {...datos} />
                ))}
              </div>
            </div>

            {/* Ejercicio 9 - Dashboard */}
            <div className="sub-exercise">
              <h4>Ejercicio 9 — Componente con Fragment y múltiples secciones</h4>
              <Dashboard />
            </div>
          </div>
        </Acordeon>

        {/* ============================================ */}
        {/* FOOTER */}
        {/* ============================================ */}
        <footer className="App-footer">
          <div className="footer-content">
            <div className="footer-stats">
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Ejercicios Principales</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Componentes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10</span>
                <span className="stat-label">Ejercicios Anteriores</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Posibilidades</span>
              </div>
            </div>
            
            <div className="footer-tech">
              <span>⚛️ React 18</span>
              <span>•</span>
              <span>🎣 Hooks</span>
              <span>•</span>
              <span>📦 Componentes</span>
              <span>•</span>
              <span>🎨 CSS-in-JS</span>
            </div>
            
            <p className="footer-copy">
              Desarrollado como parte del aprendizaje de React JS • Todos los ejercicios completados
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;