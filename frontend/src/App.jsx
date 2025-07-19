import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EstanqueConGrafico from './EstanqueConGrafico';
import Alarmas from './Alarmas';
import Historial from './Historial';
import LoginRegistro from './LoginRegistro';
import Layout from './Layout';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EstanqueConGrafico />} />
          <Route path="alarmas" element={<Alarmas />} />
          <Route path="historial" element={<Historial />} />
          <Route path="login" element={<LoginRegistro />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;