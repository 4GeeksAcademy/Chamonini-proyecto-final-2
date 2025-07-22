import React, { useState } from 'react';
import './App.css';

const API_URL = 'https://organic-tribble-g4w9vgqw46cvpvp-5000.app.github.dev';

const LoginRegistro = () => {
  const [modo, setModo] = useState('login'); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = '';
    let body = {};

    if (modo === 'login') {
      endpoint = '/login';
      body = { username, password };
    } else if (modo === 'register') {
      endpoint = '/register';
      body = { username, email, password };
    } else if (modo === 'reset') {
      endpoint = '/reset-password';
      body = { username, email, new_password: password };
    }

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje(data.message || 'Operación exitosa');
        if (modo === 'login') {
          localStorage.setItem('usuario', username);
          window.location.href = '/';
        }
      } else {
        setMensaje(data.error || 'Error en la operación');
      }
    } catch (error) {
      setMensaje('Error conectando al servidor');
    }
  };

  const limpiarCampos = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setMensaje('');
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    limpiarCampos();
  };

  return (
    <div className="contenedor-login">
      <h1 className="titulo-principal">Control de Estanques</h1>
      <h2 className="titulo-secundario">
        {modo === 'login' && 'Iniciar Sesión'}
        {modo === 'register' && 'Registro de Usuario'}
        {modo === 'reset' && 'Restablecer Contraseña'}
      </h2>

      <form onSubmit={handleSubmit} className="formulario-login">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-login"
        />

        {(modo === 'register' || modo === 'reset') && (
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-login"
          />
        )}

        <input
          type="password"
          placeholder={modo === 'reset' ? 'Nueva Contraseña' : 'Contraseña'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-login"
        />

        <button type="submit" className="boton-principal">
          {modo === 'login' && 'Iniciar Sesión'}
          {modo === 'register' && 'Registrarse'}
          {modo === 'reset' && 'Restablecer Contraseña'}
        </button>
      </form>

      <div className="botones-secundarios">
        {modo !== 'login' && (
          <button onClick={() => cambiarModo('login')} className="boton-secundario boton-azul">
            ¿Ya tienes cuenta? Iniciar Sesión
          </button>
        )}
        {modo !== 'register' && (
          <button onClick={() => cambiarModo('register')} className="boton-secundario boton-verde">
            ¿No tienes cuenta? Registrarse
          </button>
        )}
        {modo !== 'reset' && (
          <button onClick={() => cambiarModo('reset')} className="boton-secundario boton-amarillo">
            ¿Olvidaste tu contraseña? Restablecer
          </button>
        )}
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default LoginRegistro;