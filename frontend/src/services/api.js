const API_URL = 'https://organic-tribble-g4w9vgqw46cvpvp-5000.app.github.dev';

// 📌 Nivel del Estanque
export const getLevel = async () => {
    const res = await fetch(`${API_URL}/level`);
    return res.json();
};

export const getPumpStatus = async () => {
    const res = await fetch(`${API_URL}/pump/status`);
    return res.json();
};

export const pumpOn = async () => {
    const res = await fetch(`${API_URL}/pump/on`, { method: 'POST' });
    return res.json();
};

export const pumpOff = async () => {
    const res = await fetch(`${API_URL}/pump/off`, { method: 'POST' });
    return res.json();
};

export const getHistory = async () => {
    const res = await fetch(`${API_URL}/history`);
    return res.json();
};

export const simulate = async () => {
    const res = await fetch(`${API_URL}/simulate`, { method: 'POST' });
    return res.json();
};

// 📌 Autenticación
export const register = async (username, email, password) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    return res.json();
};

export const login = async (username, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
};

export const resetPassword = async (username, email, new_password) => {
    const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, new_password })
    });
    return res.json();
};
