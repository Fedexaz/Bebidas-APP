const router = require('express').Router();

const {
    getMyDrinkController,
    addMyDrinkController,
    editMyDrinkController,
    deleteMyDrinkController,
} = require('../controllers/myDrink.controller');

router.get('/', getMyDrinkController);
router.post('/', addMyDrinkController);
router.put('/', editMyDrinkController);
router.delete('/', deleteMyDrinkController);

module.exports = router;