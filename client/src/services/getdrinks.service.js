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