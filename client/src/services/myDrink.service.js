import axios from 'axios';

export const loadMyDrinks = async (userID) => {
    try {
        const resp = await axios.get('/mis-bebidas/' + userID, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const agregarBebida = async (data) => {
    try {
        await axios.post('/mis-bebidas/', data, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
    } catch (error) {
        throw Error("error al agregar bebida");
    }
};

export const eliminarBebida = async (userID, drinkID) => {
    try {
        await axios.delete('/mis-bebidas/', {  data: { userID, drinkID }, headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
    } catch (error) {
        throw Error("error al agregar bebida");
    }
};