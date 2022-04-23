const app = require('express').Router();
const authRoutes = require('./auth');

app.use('/user', authRoutes);
//app.use('/bebidas', authRoutes);

module.exports = app;