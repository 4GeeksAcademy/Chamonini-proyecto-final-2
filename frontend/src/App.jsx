import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EstanqueConGrafico from './EstanqueConGrafico';
import Alarmas from './Alarmas';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="contenedor">
        <h1>Control del Estanque</h1>

        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ margin: '10px' }}>🏞 Estanque</Link>
          <Link to="/alarmas" style={{ margin: '10px' }}>🚨 Alarmas</Link>
        </nav>

        <Routes>
          <Route path="/" element={<EstanqueConGrafico />} />
          <Route path="/alarmas" element={<Alarmas />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
