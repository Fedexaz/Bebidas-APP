const {
    getMyDrinkService,
    addMyDrinkService,
    editMyDrinkService,
    deleteMyDrinkService,
} = require('../services/myDrink.service');

const getMyDrinkController = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ error: 'No se ha especificado el ID' });
    }

    try {
        const data = await getMyDrinkService(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const addMyDrinkController = async (req, res) => {
    const { nombre, categoria, tieneAlcohol, instrucciones, ingredientes, img, createdInPage, creatorID } = req.body;

    if(!nombre || !categoria || !tieneAlcohol || !instrucciones || !ingredientes || !img || !createdInPage || !creatorID) {
        return res.status(400).json({ error: 'Faltan datos para agregar tu bebida!' });
    }

    try {
        const data = await addMyDrinkService(req.body);
        if(data) {
            return res.sendStatus(201);
        }
        else {
            return res.status(403).json({ error: "No se pudo crear la bebida!" });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const editMyDrinkController = async (req, res) => {

};

const deleteMyDrinkController = async (req, res) => {
    const { drinkID, userID } = req.body;

    if(!drinkID || !userID) {
        return res.status(400).json({ error: "Faltan datos para eliminar la bebida" });
    }

    try {
        await deleteMyDrinkService(userID, drinkID);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(403).json({ error: 'No se ha podido eliminar la bebida...' });
    }
};

module.exports = {
    getMyDrinkController,
    addMyDrinkController,
    editMyDrinkController,
    deleteMyDrinkController,
};