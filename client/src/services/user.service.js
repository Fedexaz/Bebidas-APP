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
    return JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data'))[name] : null;
};

export const logout = () => {
    localStorage.clear();
    window.location.reload();
};

export const obtenerFavoritos = async (userID) => {
    try {
        const resp = await axios.post('/user/favoritos/ver', { userID }, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
        return resp.data;
    } catch (error) {
        return error;
    }
};

export const agregarFavoritos = async (userID, bebidaID) => {
    try {
        await axios.post('/user/favoritos/agregar', { userID, bebidaID }, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
    } catch (error) {
        return error;
    }
};

export const eliminarFavoritos = async (userID, bebidaID) => {
    try {
        await axios.post('/user/favoritos/remover', { userID, bebidaID }, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
    } catch (error) {
        return error;
    }
};