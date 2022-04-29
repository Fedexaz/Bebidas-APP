const {
    getFavoriteService,
    addFavoriteService,
    removeFavoriteService
} = require('../services/userFavorites.service');

const getFavoriteController = async (req, res) => {
    const { userID } = req.body;
    if(!userID) {
        return res.status(400).json({ error: "No se ha proporcionado un usuario"});
    }
    try {
        const favoritos = await getFavoriteService(userID);
        return res.status(200).json(favoritos);
    } catch (error) {
        return res.send(404).json({ error });
    }
};

const addFavoriteController = async (req, res) => {
    const { userID, bebidaID } = req.body;
    if(!userID || !bebidaID) {
        return res.status(400).json({ error: "No se ha proporcionado los datos correctamente"});
    }
    try {
        await addFavoriteService(userID, bebidaID);
        return res.status(200).json({ message: '¡Bebida agregada a favoritos!'});  
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const removeFavoriteController = async (req, res) => {
    const { userID, bebidaID } = req.body;
    if(!userID || !bebidaID) {
        return res.status(400).json({ error: "No se ha proporcionado los datos correctamente"});
    }
    try {
        await removeFavoriteService(userID, bebidaID);
        return res.status(200).json({ message: '¡Bebida eliminada de favoritos!'});  
    } catch (error) {
        return res.send(404).json({ error });
    }
};

module.exports = {
    getFavoriteController,
    addFavoriteController,
    removeFavoriteController
};