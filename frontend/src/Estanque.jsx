import React, { useEffect, useState } from 'react';
import './App.css';
import { getLevel, getPumpStatus, pumpOn, pumpOff } from './services/api';

const Estanque = () => {
  const [nivel, setNivel] = useState(0);
  const [bomba, setBomba] = useState(false);

  const cargarDatos = async () => {
    try {
      const nivelData = await getLevel();
      const porcentaje = Math.min(Math.round((nivelData.nivel_metros / 5) * 100), 100);
      setNivel(porcentaje);

      const bombaData = await getPumpStatus();
      setBomba(bombaData.motobomba === "encendida");
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

      <div className="estanque">
        <div className="agua" style={{ height: `${nivel}%` }}></div>
      </div>

      <h2>Bomba: {bomba ? 'ENCENDIDA 🟢' : 'APAGADA 🔴'}</h2>

      <div className="botones">
        <button className="boton encender" onClick={encender}>Encender Bomba</button>
        <button className="boton apagar" onClick={apagar}>Apagar Bomba</button>
      </div>
    </div>
  );
};

export default Estanque;
