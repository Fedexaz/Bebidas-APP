const User = require('../models/User.model');

const getFavoriteService = async (userID) => {
    try {
        const user = User.findById(userID);
        return user.favorites ? user.favorites : [];
    } catch (error) {
        throw error;
    }
};

const addFavoriteService = async (userID, bebidaID) => {
    try {
        const user = User.findById(userID);
        user.favorites.push(bebidaID);
        user.save();
    } catch (error) {
        throw error;
    }
};

const removeFavoriteService = async (userID, bebidaID) => {
    try {
        const user = User.findById(userID);
        user.favorites.filter(el => el != bebidaID);
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