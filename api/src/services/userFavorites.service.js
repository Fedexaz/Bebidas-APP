const User = require('../models/User.model');
const Bebidas = require('../models/Bebidas.model');

const getFavoriteService = async (userID) => {
    try {
        const user = await User.findById(userID);
        const favoritos = [];
        for (let i = 0; i < user.favorites.length; i++) {
            const bebida = await Bebidas.findById(user.favorites[i]);
            favoritos.push(bebida);
        }
        return favoritos;
    } catch (error) {
        throw error;
    }
};

const addFavoriteService = async (userID, bebidaID) => {
    try {
        const user = await User.findById(userID);
        user.favorites.push(bebidaID);
        user.save();
    } catch (error) {
        throw error;
    }
};

const removeFavoriteService = async (userID, bebidaID) => {
    try {
        const user = await User.findById(userID);
        user.favorites = user.favorites.filter(el => el !== bebidaID);
        user.save();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getFavoriteService,
    addFavoriteService,
    removeFavoriteService
};