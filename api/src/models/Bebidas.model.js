const { Schema, model } = require('mongoose');

const bebidasSchema = new Schema({
    nombre: String,
    categoria: String,
    tieneAlcohol: String,
    dondeSeSirve: String,
    instrucciones: String,
    ingredientes: String,
    cantidades: String,
    img: String,
    imgConDerechos: String,
    likes: Array,
    comments: Number,
    createdInPage: Boolean,
    creatorID: String
});

module.exports = model('Bebidas', bebidasSchema);