const router = require('express').Router();
const verifyToken = require('../middlewares/validate-token');

const {
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
} = require('../controllers/drink.controller');

router.get('/todas', getAllDrinksController);
router.get('/filtrar', filterDrinksController);
router.get('/:id', getDrinkController);

router.get('/likes/:id', getLikesController);
router.post('/like', verifyToken, addLikeController);
router.delete('/like', verifyToken, removeLikeController);

router.get('/comentarios/:id', getCommentsController); 
router.post('/comentario', verifyToken, addCommentController);
router.put('/comentario', verifyToken, editCommentController);
router.delete('/comentario', verifyToken, deleteCommentController);

module.exports = router;