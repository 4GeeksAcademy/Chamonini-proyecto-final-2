const API_URL = 'https://organic-tribble-g4w9vgqw46cvpvp-5000.app.github.dev/';

export const getLevel = async () => {
    const response = await fetch(`${API_URL}/level`);
    return response.json();
};

export const getPumpStatus = async () => {
    const response = await fetch(`${API_URL}/pump/status`);
    return response.json();
};

export const pumpOn = async () => {
    const response = await fetch(`${API_URL}/pump/on`, { method: 'POST' });
    return response.json();
};

export const pumpOff = async () => {
    const response = await fetch(`${API_URL}/pump/off`, { method: 'POST' });
    return response.json();
};
