import axios from 'axios';

export const userLogin = async (email, password) => {
    try {
        const resp = await axios.post('/user/login', { email: String(email), password: String(password) });
        return resp.data;
    } catch (error) {
        return "Error al iniciar sesión, reintenta...";
    }
};

export const userRegister = async (email, name, password) => {
    try {
        await axios.post('/user/register', { name: String(name), email: String(email), password: String(password) });
    } catch (error) {
        throw error.response.data.error;
    }
};

export const logueado = () => {
    return localStorage.getItem('loggedIn');
};

export const getUserData = (name) => {
    return JSON.parse(localStorage.getItem('data'))[name];
};

export const logout = () => {
    localStorage.clear();
    window.location.reload();
};