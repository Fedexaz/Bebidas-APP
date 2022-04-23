const router = require('express').Router();
const verifyToken = require('./validate-token');
const {
    authRegisterController,
    authLoginController
} = require('../controllers/auth.controller');

router.post('/login', authLoginController);
router.post('/register', authRegisterController);

/* 
router.get('/favoritos/ver', authRegisterController);
router.post('/favoritos/agregar', authRegisterController);
router.put('/favoritos/editar', authRegisterController);
router.delete('/favoritos/remover', authRegisterController);
 */

module.exports = router;