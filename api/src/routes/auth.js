const router = require('express').Router();

const {
    authRegisterController,
    authLoginController
} = require('../controllers/auth.controller');

router.post('/login', authLoginController);
router.post('/register', authRegisterController);

module.exports = router;