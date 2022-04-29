import axios from 'axios';

export const agregarBebida = async (data) => {
    try {
        await axios.post('/mis-bebidas/', data, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
    } catch (error) {
        throw Error("error al agregar bebida");
    }
};

export const eliminarBebida = async () => {

};