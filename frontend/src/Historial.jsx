import React, { useState, useEffect } from 'react';
import { getHistory } from './services/api';
import './App.css';

const Historial = () => {
    const [historial, setHistorial] = useState([]);

    const fetchHistorial = async () => {
        const data = await getHistory();
        setHistorial(data);
    };

    useEffect(() => {
        fetchHistorial();
    }, []);

    return (
        <div className="contenedor">
            <h1>Historial de Niveles</h1>
            <button onClick={fetchHistorial} className="boton encender" style={{ marginBottom: '20px' }}>🔄 Actualizar</button>
            <table style={{ width: '80%', margin: 'auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Nivel (m)</th>
                        <th>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.length === 0 ? (
                        <tr><td colSpan="2" style={{ textAlign: 'center' }}>No hay datos</td></tr>
                    ) : (
                        historial.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{item.nivel}</td>
                                <td style={{ textAlign: 'center' }}>{item.fecha_hora}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Historial;
