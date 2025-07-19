import React, { useEffect, useState } from 'react';
import './App.css';
import { simulate, pumpOn, pumpOff } from './services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EstanqueConGrafico = () => {
  const [nivel, setNivel] = useState(0);
  const [bomba, setBomba] = useState(false);
  const [historial, setHistorial] = useState([]);

  const cargarDatos = async () => {
    try {
      const datos = await simulate();
      const porcentaje = Math.round(datos.porcentaje);
      setNivel(porcentaje);
      setBomba(datos.bomba === "encendida");

      const horaActual = new Date().toLocaleTimeString('es-CL', {
        timeZone: 'America/Santiago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const nuevoRegistro = {
        porcentaje: porcentaje,
        hora: horaActual
      };

      setHistorial(prev => {
        const actualizados = [nuevoRegistro, ...prev].slice(0, 20);
        return actualizados;
      });

    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  const encender = async () => {
    await pumpOn();
    cargarDatos();
  };

  const apagar = async () => {
    await pumpOff();
    cargarDatos();
  };

  useEffect(() => {
    cargarDatos();
    const intervalo = setInterval(cargarDatos, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="contenedor">
      <h1>Nivel: {nivel}%</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '300px', height: '300px', marginRight: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historial}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" tick={{ fontWeight: 'bold' }} />
              <YAxis domain={[0, 100]} tick={{ fontWeight: 'bold' }} />
              <Tooltip />
              <Line type="monotone" dataKey="porcentaje" stroke="#0077cc" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="estanque">
          <div className="agua" style={{ height: `${nivel}%` }}></div>
        </div>
      </div>

      <h2>Bomba: {bomba ? 'ENCENDIDA 🟢' : 'APAGADA 🔴'}</h2>

      <div className="botones">
        <button className="boton encender" onClick={encender}>Encender Bomba</button>
        <button className="boton apagar" onClick={apagar}>Apagar Bomba</button>
      </div>
    </div>
  );
};

export default EstanqueConGrafico;
