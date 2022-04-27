import axios from 'axios';

export const getDrinks = async () => {
    try {
        const respuesta = await axios.get('/bebidas/todas');
        return respuesta.data;

    } catch (error) {
        console.log(error);
        throw Error("Ha ocurrid un error al cargar las bebidas");
    }
};

export const getDrinkDetail = async (_id) => {
    try {
        const resp = await axios.get('/bebidas/' + _id);
        return resp.data;
    } catch (error) {
        throw Error(error.response.data.error);
    }
};