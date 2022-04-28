const { Schema, model } = require('mongoose');

const bebidasSchema = new Schema({
    nombre: String,
    categoria: String,
    tieneAlcohol: String,
    instrucciones: String,
    ingredientes: String,
    cantidades: String,
    img: String,
    imgConDerechos: String,
    likes: Array,
    comments: {
        type: Number,
        default: 0
    },
    createdInPage: Boolean,
    creatorID: String
});

module.exports = model('Bebidas', bebidasSchema);