import React from 'react';
import './App.css';

import Perfil from './components/Perfil';
import Clima from './components/Clima';
import EstadoPedido from './components/EstadoPedido';
import MensajeBienvenida from './components/MensajeBienvenida';
import ListaHabilidades from './components/ListaHabilidades';
import ListaProductos from './components/ListaProductos';
import ListaTareas from './components/ListaTareas';
import Tarjeta from './components/Tarjeta';
import Dashboard from './components/Dashboard';

function App() {
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

  // Datos para el usuario del ejercicio 4
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
        {/* Ejercicio 1 - Perfil */}
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

        {/* ============================================ */}
        {/* Ejercicio 2 - Clima */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio2">
          <div className="exercise-header">
            <h2>Ejercicio 2 — Lógica previa al return</h2>
            <span className="exercise-badge">Clima</span>
          </div>
          <div className="exercise-content">
            <Clima />
          </div>
        </section>

        {/* ============================================ */}
        {/* Ejercicio 3 - Estado del Pedido */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio3">
          <div className="exercise-header">
            <h2>Ejercicio 3 — Renderizado condicional con operadores</h2>
            <span className="exercise-badge">Estado Pedido</span>
          </div>
          <div className="exercise-content">
            <EstadoPedido />
          </div>
          <div className="exercise-note">
            <small>💡 Cambia el valor de 'estado' en el componente para probar diferentes casos: pendiente, enviado, entregado, cancelado</small>
          </div>
        </section>

        {/* ============================================ */}
        {/* Ejercicio 4 - Mensaje de Bienvenida */}
        {/* ============================================ */}
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

        {/* ============================================ */}
        {/* Ejercicio 5 - Lista de Habilidades */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio5">
          <div className="exercise-header">
            <h2>Ejercicio 5 — Renderizado de lista simple</h2>
            <span className="exercise-badge">Habilidades</span>
          </div>
          <div className="exercise-content">
            <ListaHabilidades />
          </div>
        </section>

        {/* ============================================ */}
        {/* Ejercicio 6 - Lista de Productos */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio6">
          <div className="exercise-header">
            <h2>Ejercicio 6 — Renderizado de lista con objetos</h2>
            <span className="exercise-badge">Productos</span>
          </div>
          <div className="exercise-content">
            <ListaProductos />
          </div>
        </section>

        {/* ============================================ */}
        {/* Ejercicio 7 - Lista de Tareas */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio7">
          <div className="exercise-header">
            <h2>Ejercicio 7 — Combinación de filter y map</h2>
            <span className="exercise-badge">Tareas</span>
          </div>
          <div className="exercise-content">
            <ListaTareas />
          </div>
        </section>

        {/* ============================================ */}
        {/* Ejercicio 8 - Tarjeta */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio8">
          <div className="exercise-header">
            <h2>Ejercicio 8 — Componente reutilizable para tarjetas</h2>
            <span className="exercise-badge">Tarjetas</span>
          </div>
          <div className="exercise-content">
            <div className="tarjetas-grid">
              {tarjetasData.map((datos, index) => (
                <Tarjeta
                  key={index}
                  titulo={datos.titulo}
                  descripcion={datos.descripcion}
                  etiquetas={datos.etiquetas}
                  destacado={datos.destacado}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* Ejercicio 9 - Dashboard */}
        {/* ============================================ */}
        <section className="exercise-section" id="ejercicio9">
          <div className="exercise-header">
            <h2>Ejercicio 9 — Componente con Fragment y múltiples secciones</h2>
            <span className="exercise-badge">Dashboard</span>
          </div>
          <div className="exercise-content">
            <Dashboard />
          </div>
        </section>

        {/* ============================================ */}
        {/* Footer */}
        {/* ============================================ */}
        <footer className="App-footer">
          <p>
            🎯 Total de ejercicios completados: 10
          </p>
          <p className="footer-details">
            <span>React JS</span>
            <span>•</span>
            <span>Componentes Funcionales</span>
            <span>•</span>
            <span>Renderizado Condicional</span>
            <span>•</span>
            <span>Listas y Keys</span>
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