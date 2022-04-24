const app = require('express').Router();
const userRoutes = require('./user.route');
const drinkRoutes = require('./drink.route');

app.use('/user', userRoutes);
app.use('/bebidas', drinkRoutes);

module.exports = app;