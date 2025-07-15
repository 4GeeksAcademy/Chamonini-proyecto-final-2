import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [nivel, setNivel] = useState(2.5);
  const [bombaEncendida, setBombaEncendida] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNivel(prevNivel => {
        let cambio = bombaEncendida ? 0.1 : -0.1;
        let nuevoNivel = prevNivel + cambio;
        if (nuevoNivel > 5) nuevoNivel = 5;
        if (nuevoNivel < 0) nuevoNivel = 0;
        return parseFloat(nuevoNivel.toFixed(2));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [bombaEncendida]);

  const encenderBomba = () => setBombaEncendida(true);
  const apagarBomba = () => setBombaEncendida(false);

  return (
    <div className="contenedor">
      <h1>Nivel del Estanque: {nivel} m</h1>
      <h2>Bomba: {bombaEncendida ? 'ENCENDIDA 🟢' : 'APAGADA 🔴'}</h2>
      <div className="estanque-con-etiquetas">
        <div className="etiquetas">
          <span>100%</span>
          <span>80%</span>
          <span>60%</span>
          <span>40%</span>
          <span>20%</span>
          <span>0%</span>
        </div>
        <div className="estanque">
          <div
            className="agua"
            style={{ height: `${(nivel / 5) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="botones">
        <button onClick={encenderBomba} className="boton encender">Encender Bomba</button>
        <button onClick={apagarBomba} className="boton apagar">Apagar Bomba</button>
      </div>
    </div>
  );
};

export default App;
