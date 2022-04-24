const router = require('express').Router();

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

router.get('/:id', getDrinkController);
router.get('/todas', getAllDrinksController);
router.get('/filtrar', filterDrinksController);

router.get('/likes', getLikesController);
router.post('/like', addLikeController);
router.delete('/like', removeLikeController);

router.get('/comentarios', getCommentsController); 
router.post('/comentario', addCommentController);
router.put('/comentario', editCommentController);
router.delete('/comentario', deleteCommentController);

module.exports = router;