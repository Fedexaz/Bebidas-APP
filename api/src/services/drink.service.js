const Bebidas = require('../models/Bebidas.model');
const Comment = require('../models/Comment.model');
const User = require('../models/User.model');

const getDrinkService = async (drinkID) => {
    try {
        const datos = await Bebidas.findById(drinkID);
        return datos;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllDrinksService = async () => {
    try {
        const datos = await Bebidas.find();
        return datos;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const filterDrinksService = async (strDrink) => {
    try {
        const datos = await Bebidas.find({ strDrink });
        return datos;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getLikesService = async (drinkID) => {
    try {
        const datos = await Bebidas.findById(drinkID);
        return datos.likes;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const addLikeService = async (drinkID, userID) => {
    try {
        const datos = await Bebidas.findById(drinkID);
        if (datos.likes.indexOf(userID) === -1) {
            datos.likes.push(userID);
            await datos.save();
        }
        else {
            throw Error("Ya has dado Like");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const removeLikeService = async (drinkID, userID) => {
    try {
        const datos = await Bebidas.findById(drinkID);
        datos.likes = datos.likes.filter(el => el !== userID);
        await datos.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getCommentsService = async (drinkID) => {
    try {
        const comentarios = [];
        const commentsData = await Comment.find({ drinkID });

        commentsData.length ? commentsData.forEach(async (comm) => {
            const user = await User.findById(comm.userID);
            comentarios.push({
                user: user.name,
                comment: comm.comment,
                date: comm.date
            });
        }) : null;
        return comentarios;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const addCommentService = async (data) => {
    try {
        const comment = new Comment(data);
        const drink = await Bebidas.findById(data.drinkID);
        drink.comments += 1;
        await comment.save();
        await drink.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const editCommentService = async (commentID, userID, comm) => {
    try {
        const comment = await Comment.findById(commentID);
        if (comment.userID === userID) {
            comment.comment = comm;
            await comment.save();
        }
        else {
            throw Error("El comentario no es tuyo");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteCommentService = async (commentID, userID) => {
    try {
        const comment = await Comment.findById(commentID);
        if (comment.userID === userID) {
            await Comment.findByIdAndDelete(commentID);
            const drink = await Bebidas.findById(data.drinkID);
            drink.comments -= 1
            await drink.save();
        }
        else {
            throw Error("No es tu comentario");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    getDrinkService,
    getAllDrinksService,
    filterDrinksService,
    getLikesService,
    addLikeService,
    removeLikeService,
    getCommentsService,
    addCommentService,
    editCommentService,
    deleteCommentService
};