const Bebidas = require('../models/Bebidas.model');

const getMyDrinkService = async (creatorID) => {
    try {
        const drinks = await Bebidas.find({ creatorID });
        return drinks;
    } catch (error) {
        throw error;
    }
};

const addMyDrinkService = async (data) => {
    try {
        const bebida = new Bebidas(data);
        await bebida.save();
    } catch (error) {
        throw error;
    }  
};

const editMyDrinkService = async (creatorID, drinkID) => {

};

const deleteMyDrinkService = async (userID, drinkID) => {
    try {
        const drink = await Bebidas.findOne(drinkID);
        if(drink.creatorID === userID) {
            await Bebidas.findByIdAndDelete(drinkID);
        }   
        else {
            throw Error("La bebida no es tuya");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getMyDrinkService,
    addMyDrinkService,
    editMyDrinkService,
    deleteMyDrinkService,
};