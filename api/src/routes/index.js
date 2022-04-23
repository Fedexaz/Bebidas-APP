const app = require('express').Router();
const userRoutes = require('./user.route');

app.use('/user', userRoutes);
//app.use('/bebidas', authRoutes);

module.exports = app;