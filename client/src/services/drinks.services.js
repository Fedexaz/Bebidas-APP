import axios from 'axios';
//import urlBase from '../urlBase';

export const getDrinksByLetterRandom = async () => {
    try {
        const bebidas = [];
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`);
        //const api = await axios.get(`${urlBase()}/bebidas`);
        bebidas.push(...response.data.drinks);
        return bebidas;
    } catch (error) {
        console.log(error);
        return false;
    }
};