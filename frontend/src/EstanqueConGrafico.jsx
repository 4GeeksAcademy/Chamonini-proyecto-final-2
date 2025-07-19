import React, { useEffect, useState } from 'react';
import './App.css';
import { simulate, pumpOn, pumpOff } from './services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EstanqueConGrafico = () => {
  const [nivel, setNivel] = useState(0);
  const [bomba, setBomba] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [clima, setClima] = useState(null);

  // NUEVO: usuario logueado
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMostrarMenu(false);
    window.location.href = "/login";
  };

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

      const nuevoRegistro = { porcentaje, hora: horaActual };
      setHistorial(prev => [nuevoRegistro, ...prev].slice(0, 20));
    } catch (error) {
      console.error("Error obteniendo nivel:", error);
    }
  };

  const cargarClima = async () => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=40670739b9614f618da41257251907&q=La Serena&lang=es`);
      const data = await response.json();
      setClima({
        ciudad: data.location.name,
        temp: data.current.temp_c,
        descripcion: data.current.condition.text
      });
    } catch (error) {
      console.error("Error obteniendo clima:", error);
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
    cargarClima();
    const intervalo = setInterval(() => {
      cargarDatos();
      cargarClima();
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="contenedor">

      {/* Usuario y cerrar sesión */}
      {user && (
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <button
            onClick={() => setMostrarMenu(!mostrarMenu)}
            style={{
              background: 'transparent',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            {user}
          </button>
          {mostrarMenu && (
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '0',
              background: '#ff4d4d',
              color: 'white',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              zIndex: 999
            }} onClick={cerrarSesion}>
              Cerrar Sesión
            </div>
          )}
        </div>
      )}

      <h1>Nivel: {nivel}%</h1>

      {clima && (
        <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>
          📍 Ciudad: {clima.ciudad} — 🌡️ Temperatura: {clima.temp}°C — {clima.descripcion}
        </div>
      )}

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