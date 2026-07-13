// src/App.jsx
import React from 'react';
import './App.css';

// Importación de todos los componentes anteriores
import Perfil from './components/Perfil';
import Clima from './components/Clima';
import EstadoPedido from './components/EstadoPedido';
import MensajeBienvenida from './components/MensajeBienvenida';
import ListaHabilidades from './components/ListaHabilidades';
import ListaProductos from './components/ListaProductos';
import ListaTareas from './components/ListaTareas';
import Tarjeta from './components/Tarjeta';
import Dashboard from './components/Dashboard';

// Importación de los nuevos componentes
import Alerta from './components/Alerta';
import Acordeon from './components/Acordeon';

function App() {
  // Datos para las tarjetas
  const tarjetasData = [
    {
      titulo: 'React Avanzado',
      descripcion: 'Curso completo de React con hooks, context API y optimización de rendimiento.',
      etiquetas: ['React', 'JavaScript', 'Hooks', 'Context API'],
      destacado: true
    },
    {
      titulo: 'Desarrollo Full Stack',
      descripcion: 'Aprende a desarrollar aplicaciones web completas con Node.js, Express, MongoDB y React.',
      etiquetas: ['Node.js', 'Express', 'MongoDB', 'React'],
      destacado: false
    },
    {
      titulo: 'UI/UX Design',
      descripcion: 'Principios de diseño de interfaces centradas en el usuario.',
      etiquetas: ['Design', 'Figma', 'Prototyping', 'UX'],
      destacado: false
    },
    {
      titulo: 'DevOps Essentials',
      descripcion: 'Fundamentos de DevOps: CI/CD, Docker, Kubernetes y monitoreo.',
      etiquetas: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
      destacado: true
    }
  ];

  const usuarioAdmin = { nombre: 'Ana Martínez', rol: 'admin' };
  const usuarioNormal = { nombre: 'Carlos López', rol: 'usuario' };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Ejercicios Prácticos de React JS</h1>
        <p className="subtitle">
          Lista completa de todos los ejercicios desarrollados
        </p>
      </header>

      <main className="App-main">
        {/* ============================================ */}
        {/* EJERCICIO 1 - NUEVO: Alertas */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio-nuevo1">
          <div className="exercise-header">
            <h2>Ejercicio 1 — Componentes con Props y Children</h2>
            <span className="exercise-badge">Alertas</span>
          </div>
          <div className="exercise-content">
            <h4>Componente Alerta - 4 tipos diferentes:</h4>
            
            <Alerta tipo="exito" titulo="Operación Exitosa">
              <p>El archivo ha sido subido correctamente al servidor.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Detalles:</strong> 2.4 MB subidos en 1.2 segundos
              </p>
            </Alerta>

            <Alerta tipo="advertencia" titulo="Espacio de Almacenamiento">
              <p>Estás utilizando el 85% de tu espacio de almacenamiento.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Recomendación:</strong> Libera al menos 500 MB para continuar trabajando sin interrupciones.
              </p>
            </Alerta>

            <Alerta tipo="error" titulo="Error de Conexión">
              <p>No se pudo establecer conexión con el servidor.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Solución:</strong> Verifica tu conexión a internet e intenta nuevamente en unos minutos.
              </p>
            </Alerta>

            <Alerta tipo="info" titulo="Actualización Disponible">
              <p>Hay una nueva versión del sistema disponible para instalar.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                <strong>Versión:</strong> v2.4.1 · <strong>Tamaño:</strong> 45 MB
              </p>
            </Alerta>
          </div>
        </section>

        {/* ============================================ */}
        {/* EJERCICIO 1 - NUEVO: Acordeones */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio-nuevo1b">
          <div className="exercise-header">
            <h2>Ejercicio 1 — Componentes con Estado</h2>
            <span className="exercise-badge">Acordeones</span>
          </div>
          <div className="exercise-content">
            <h4>Componente Acordeón - 3 instancias independientes:</h4>

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
              inicialmenteExpandido={false}
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
              inicialmenteExpandido={true}
            >
              <div>
                <p><strong>Consejos para escribir mejor código React:</strong></p>
                <ul style={{ margin: '10px 0', paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>✅ Mantén los componentes pequeños y enfocados</li>
                  <li>✅ Usa nombres descriptivos para variables y funciones</li>
                  <li>✅ Evita la mutación directa del estado</li>
                  <li>✅ Utiliza keys únicas en las listas</li>
                  <li>✅ Divide la lógica en hooks personalizados</li>
                  <li>✅ Documenta tus componentes con PropTypes o TypeScript</li>
                </ul>
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <strong>💡 Tip:</strong> "El código limpio es más importante que el código rápido"
                </div>
              </div>
            </Acordeon>
          </div>
        </section>

        {/* ============================================ */}
        {/* EJERCICIOS ANTERIORES */}
        {/* ============================================ */}
        
        <section className="exercise-section" id="ejercicio1">
          <div className="exercise-header">
            <h2>Ejercicio 1 — Componente con expresiones dinámicas</h2>
            <span className="exercise-badge">Perfil</span>
          </div>
          <div className="exercise-content">
            <Perfil />
          </div>
        </section>

        <section className="exercise-section" id="ejercicio2">
          <div className="exercise-header">
            <h2>Ejercicio 2 — Lógica previa al return</h2>
            <span className="exercise-badge">Clima</span>
          </div>
          <div className="exercise-content">
            <Clima />
          </div>
        </section>

        <section className="exercise-section" id="ejercicio3">
          <div className="exercise-header">
            <h2>Ejercicio 3 — Renderizado condicional con operadores</h2>
            <span className="exercise-badge">Estado Pedido</span>
          </div>
          <div className="exercise-content">
            <EstadoPedido />
          </div>
        </section>

        <section className="exercise-section" id="ejercicio4">
          <div className="exercise-header">
            <h2>Ejercicio 4 — Renderizado condicional con early return</h2>
            <span className="exercise-badge">Bienvenida</span>
          </div>
          <div className="exercise-content">
            <h4>Usuario Administrador:</h4>
            <MensajeBienvenida usuario={usuarioAdmin} />
            <h4>Usuario Normal:</h4>
            <MensajeBienvenida usuario={usuarioNormal} />
            <h4>Usuario no autenticado (null):</h4>
            <MensajeBienvenida usuario={null} />
          </div>
        </section>

        <section className="exercise-section" id="ejercicio5">
          <div className="exercise-header">
            <h2>Ejercicio 5 — Renderizado de lista simple</h2>
            <span className="exercise-badge">Habilidades</span>
          </div>
          <div className="exercise-content">
            <ListaHabilidades />
          </div>
        </section>

        <section className="exercise-section" id="ejercicio6">
          <div className="exercise-header">
            <h2>Ejercicio 6 — Renderizado de lista con objetos</h2>
            <span className="exercise-badge">Productos</span>
          </div>
          <div className="exercise-content">
            <ListaProductos />
          </div>
        </section>

        <section className="exercise-section" id="ejercicio7">
          <div className="exercise-header">
            <h2>Ejercicio 7 — Combinación de filter y map</h2>
            <span className="exercise-badge">Tareas</span>
          </div>
          <div className="exercise-content">
            <ListaTareas />
          </div>
        </section>

        <section className="exercise-section" id="ejercicio8">
          <div className="exercise-header">
            <h2>Ejercicio 8 — Componente reutilizable para tarjetas</h2>
            <span className="exercise-badge">Tarjetas</span>
          </div>
          <div className="exercise-content">
            <div className="tarjetas-grid">
              {tarjetasData.map((datos, index) => (
                <Tarjeta key={index} {...datos} />
              ))}
            </div>
          </div>
        </section>

        <section className="exercise-section" id="ejercicio9">
          <div className="exercise-header">
            <h2>Ejercicio 9 — Componente con Fragment y múltiples secciones</h2>
            <span className="exercise-badge">Dashboard</span>
          </div>
          <div className="exercise-content">
            <Dashboard />
          </div>
        </section>

        <footer className="App-footer">
          <p>🎯 Total de ejercicios completados: 11 (incluyendo nuevos componentes)</p>
          <p className="footer-details">
            <span>React JS</span>
            <span>•</span>
            <span>Componentes Funcionales</span>
            <span>•</span>
            <span>Props y Children</span>
            <span>•</span>
            <span>useState</span>
            <span>•</span>
            <span>Renderizado Condicional</span>
          </p>
          <p className="footer-small">
            Desarrollado como parte del aprendizaje de React JS
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;