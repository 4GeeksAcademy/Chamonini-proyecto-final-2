import React, { useEffect, useState } from 'react';
import './App.css';
import { getHistory } from './services/api';

const Alarmas = () => {
  const [alarmas, setAlarmas] = useState([]);

  useEffect(() => {
    document.body.classList.add('alarmas-page');
    const cargarAlarmas = async () => {
      try {
        const data = await getHistory();
      
        const alarmasFiltradas = data.filter(item => {
          const porcentaje = (item.nivel / 5) * 100;
          return porcentaje <= 25 || porcentaje >= 100;
        }).map(item => ({
          porcentaje: Math.round((item.nivel / 5) * 100),
          fecha: item.fecha_hora
        }));
        setAlarmas(alarmasFiltradas);
      } catch (error) {
        console.error("Error al cargar alarmas:", error);
      }
    };

    cargarAlarmas();

    return () => {
      document.body.classList.remove('alarmas-page');
    };
  }, []);

  return (
    <div className="contenedor-alarmas">
      <h1>Alarmas</h1>
      <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: '500px' }}>
        {alarmas.length === 0 ? (
          <li>No hay alarmas recientes.</li>
        ) : (
          alarmas.map((item, index) => (
            <li key={index} style={{
              backgroundColor: item.porcentaje <= 25 ? '#f8d7da' : '#d1ecf1',
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              Nivel: {item.porcentaje}% — Fecha: {item.fecha}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Alarmas;
