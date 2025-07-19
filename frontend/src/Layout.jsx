import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const usuario = localStorage.getItem('usuario');
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };

  return (
    <div className="contenedor">
      <h1>Control del Estanque</h1>

      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ margin: '10px' }}>🏞 Estanque</Link>
        <Link to="/alarmas" style={{ margin: '10px' }}>🚨 Alarmas</Link>
        <Link to="/historial" style={{ margin: '10px' }}>📜 Historial</Link>
        <Link to="/login" style={{ margin: '10px' }}>🔑 Iniciar sesión</Link>
      </nav>

      {usuario && (
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{usuario}</span>
          <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', borderRadius: '15px', padding: '8px' }}>
            Cerrar Sesión
          </button>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Layout;