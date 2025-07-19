import React, { useEffect, useState } from 'react';
import './App.css';
import { getHistory } from './services/api';

const Historial = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await getHistory();
        setHistorial(data);
      } catch (error) {
        console.error("Error al obtener historial:", error);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div className="contenedor">
      <h1>Historial Completo</h1>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '500px', margin: 'auto' }}>
        {historial.length === 0 ? (
          <li>No hay datos en el historial.</li>
        ) : (
          historial.map((item, index) => (
            <li key={index} style={{
              backgroundColor: '#f2f2f2',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}>
              Nivel: {item.nivel} m — {item.fecha_hora}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Historial;
