const {
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
} = require('../services/drink.service');

const getDrinkController = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ error: "No se ha especificado el ID a buscar" });    
    }

    try {
        const datos = await getDrinkService(req.params.id);
        return res.status(200).json(datos ? datos : {});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }
};

const getAllDrinksController = async (req, res) => {
    try {
        const datos = await getAllDrinksService();
        return res.status(200).json(datos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }
};

const filterDrinksController = async (req, res) => {
    try {
        const datos = await filterDrinksService(req.query.nombre);
        return res.status(200).json(datos ? datos : {});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }
};

const getLikesController = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ error: "No se ha especificado el ID de la bebida" });    
    }

    try {
        const datos = await getLikesService(req.params.id);
        return res.status(200).send(datos ? datos : {});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const addLikeController = async (req, res) => {
    if(!req.body.drinkID || !req.body.userID) {
        return res.status(400).json({ error: "Faltan datos para agregar el like" });    
    }

    try {
        await addLikeService(req.body.drinkID, req.body.userID);
        return res.status(201).json({ message: "Like agregado correctamente!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const removeLikeController = async (req, res) => {
    if(!req.body.drinkID || !req.body.userID) {
        return res.status(400).json({ error: "Faltan datos para remover el like" });    
    }

    try {
        await removeLikeService(req.body.drinkID, req.body.userID);
        return res.status(200).json({ message: "Like removido exitosamente!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const getCommentsController = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ error: "Necesitas el ID de alguna bebida" });    
    }

    try {
        const datos = await getCommentsService(req.params.id);
        return res.status(200).json(datos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const addCommentController = async (req, res) => {
    if(!req.body.drinkID || !req.body.userID || !req.body.comment) {
        return res.status(400).json({ error: "Faltan datos para agregar el comentario" });    
    }

    try {
        await addCommentService(req.body);
        return res.status(201).json({ message: "Comentario agregado correctamente!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const editCommentController = async (req, res) => {
    if(!req.body.commentID || !req.body.userID || !req.body.comment) {
        return res.status(400).json({ error: "Faltan datos para editar el comentario" });    
    }

    try {
        await editCommentService(req.body.commentID, req.body.userID, req.body.comment);
        return res.status(200).json({ message: "Comentario editado correctamente!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const deleteCommentController = async (req, res) => {
    if(!req.body.commentID) {
        return res.status(400).json({ error: "Necesitas proporcionar el ID de un comentario" });    
    }

    try {
        await deleteCommentService(req.body.commentID);
        return res.status(200).json({ message: "Comentario eliminado correctamente!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

module.exports = {
    getDrinkController,
    getAllDrinksController,
    filterDrinksController,
    getLikesController,
    addLikeController,
    removeLikeController,
    getCommentsController,
    addCommentController,
    editCommentController,
    deleteCommentController
};