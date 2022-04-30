require('./database');
const morgan = require('morgan');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const rutas = require('./routes/');

var corsOptions = {
    origin: 'https://tufindeapp-3seuoy5rr-fedexaz.vercel.app/',
    optionsSuccessStatus: 200
}

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors(corsOptions));
app.use(rutas);

module.exports = app;