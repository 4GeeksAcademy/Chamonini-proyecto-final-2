import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import EstanqueConGrafico from './EstanqueConGrafico';
import Alarmas from './Alarmas';
import Historial from './Historial';
import LoginRegistro from './LoginRegistro';
import './App.css';

const App = () => {
  const [usuarioActivo, setUsuarioActivo] = useState(localStorage.getItem('usuario') || '');

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    setUsuarioActivo(usuario || '');
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuarioActivo('');
    window.location.href = '/login';
  };

  const Layout = ({ children }) => (
    <div className="contenedor">
      <h1>Control del Estanque</h1>

      {usuarioActivo && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', textAlign: 'right' }}>
          <div style={{ fontWeight: 'bold' }}>{usuarioActivo}</div>
          <button
            onClick={cerrarSesion}
            className="boton cerrar-sesion"
            style={{ marginTop: '5px', backgroundColor: '#e87f7fff' }}
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {usuarioActivo && (
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ margin: '10px' }}>🏞 Estanque</Link>
          <Link to="/alarmas" style={{ margin: '10px' }}>🚨 Alarmas</Link>
          <Link to="/historial" style={{ margin: '10px' }}>📜 Historial</Link>
        </nav>
      )}

      <div>{children}</div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginRegistro />} />
        <Route
          path="/"
          element={
            usuarioActivo
              ? <Layout><EstanqueConGrafico /></Layout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/alarmas"
          element={
            usuarioActivo
              ? <Layout><Alarmas /></Layout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/historial"
          element={
            usuarioActivo
              ? <Layout><Historial /></Layout>
              : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
