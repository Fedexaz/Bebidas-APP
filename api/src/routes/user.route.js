const router = require('express').Router();
const verifyToken = require('../middlewares/validate-token');
const { authRegisterController, authLoginController } = require('../controllers/user.controller');
const { getFavoriteController, addFavoriteController, removeFavoriteController } = require('../controllers/userFavorites.controller');

router.post('/login', authLoginController);
router.post('/register', authRegisterController);

router.post('/favoritos/ver', verifyToken, getFavoriteController);
router.post('/favoritos/agregar', verifyToken, addFavoriteController);
router.post('/favoritos/remover', verifyToken, removeFavoriteController);

module.exports = router;