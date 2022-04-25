const app = require('express').Router();
const userRoutes = require('./user.route');
const drinkRoutes = require('./drink.route');
const myDrinkRoutes = require('./myDrink.route');

app.use('/user', userRoutes);
app.use('/bebidas', drinkRoutes);
app.use('/mis-bebidas', myDrinkRoutes);

module.exports = app;