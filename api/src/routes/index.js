const app = require('express').Router();
const authRoutes = require('./auth');
const verifyToken = require('./validate-token');

//app.use('/dashboard', verifyToken, dashboadRoutes)
app.use('/user', authRoutes);

module.exports = app;