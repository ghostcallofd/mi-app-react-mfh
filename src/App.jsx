// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Context
import { NotasProvider } from './context/NotasContext';

// Layout
import Layout from './components/Layout';

// Pages
import Inicio from './pages/Inicio';
import Notas from './pages/Notas';
import NuevaNota from './pages/NuevaNota';
import DetalleNota from './pages/DetalleNota';
import NoEncontrada from './pages/NoEncontrada';

function App() {
  return (
    <NotasProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta principal con Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="notas">
              <Route index element={<Notas />} />
              <Route path="nueva" element={<NuevaNota />} />
              <Route path=":id" element={<DetalleNota />} />
              {/* Ruta de edición que se creará en el Ejercicio 4 */}
              {/* <Route path=":id/editar" element={<EditarNota />} /> */}
            </Route>
            {/* Ruta 404 */}
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotasProvider>
  );
}

export default App;