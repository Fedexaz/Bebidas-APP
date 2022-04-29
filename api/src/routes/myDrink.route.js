const router = require('express').Router();
const verifyToken = require('../middlewares/validate-token');

const {
    getMyDrinkController,
    addMyDrinkController,
    editMyDrinkController,
    deleteMyDrinkController,
} = require('../controllers/myDrink.controller');

router.get('/:id', verifyToken, getMyDrinkController);
router.post('/', verifyToken, addMyDrinkController);
router.put('/', verifyToken, editMyDrinkController);
router.delete('/', verifyToken, deleteMyDrinkController);

module.exports = router;