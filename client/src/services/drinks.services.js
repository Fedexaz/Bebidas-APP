import axios from 'axios';

export const getDrinksByLetterRandom = async () => {
    try {
        const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const dado = Math.floor(Math.random() * abc.length - 1);
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${abc[dado]}`);
        return response.data ? response.data.drinks : !response.data.drinks.length ? getDrinksByLetterRandom() : null;
    } catch (error) {
        console.log(error);
        return false;
    }
};