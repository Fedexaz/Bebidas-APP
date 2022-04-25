const Bebidas = require('../models/Bebidas.model');
const fs = require('fs');

const saveToDB = async () => {
    try {
        const loadFile = fs.readFileSync(__dirname + '/bebidas2.json', 'utf-8');
        const bebida = JSON.parse(loadFile);

        for (let i = 0; i < bebida.length; i++) {
            let datos = new Bebidas({
                nombre: bebida[i].nombre,
                categoria: bebida[i].categoria,
                tieneAlcohol: bebida[i].tieneAlcohol,
                dondeSeSirve: bebida[i].dondeSeSirve,
                instrucciones: bebida[i].instrucciones,
                ingredientes: bebida[i].ingredientes,
                cantidades: bebida[i].cantidades,
                img: bebida[i].img,
                imgConDerechos: bebida[i].imgConDerechos
            });
            await datos.save();
            console.log(`${datos.nombre} (ID: ${datos._id}) guardada en la base de datos!`);
        } 

        console.log(" [ ! ] Datos guardados correctamente en la Base de Datos!");
    } catch (error) {
        console.log(error);
    }
};

/* 
const transform = () => {
    const loadFile = fs.readFileSync(__dirname + '/bebidas.json', 'utf-8');
    const bebidas = JSON.parse(loadFile);
    const bebidasProcesadas = [];

    for (let i = 0; i < bebidas.length; i++) {

        let ingredientes = '';
        bebidas[i].strIngredient1 ? ingredientes += bebidas[i].strIngredient1 : null;
        bebidas[i].strIngredient2 ? ingredientes += ',' +  bebidas[i].strIngredient2 : null;
        bebidas[i].strIngredient3 ? ingredientes += ',' +  bebidas[i].strIngredient3 : null;
        bebidas[i].strIngredient4 ? ingredientes += ',' +  bebidas[i].strIngredient4 : null;
        bebidas[i].strIngredient5 ? ingredientes += ',' +  bebidas[i].strIngredient5 : null;
        bebidas[i].strIngredient6 ? ingredientes += ',' +  bebidas[i].strIngredient6 : null;
        bebidas[i].strIngredient7 ? ingredientes += ',' +  bebidas[i].strIngredient7 : null;
        bebidas[i].strIngredient8 ? ingredientes += ',' +  bebidas[i].strIngredient8 : null;
        bebidas[i].strIngredient9 ? ingredientes += ',' +  bebidas[i].strIngredient9 : null;
        bebidas[i].strIngredient10 ? ingredientes += ',' +  bebidas[i].strIngredient10 : null;
        bebidas[i].strIngredient11 ? ingredientes += ',' +  bebidas[i].strIngredient11 : null;
        bebidas[i].strIngredient12 ? ingredientes += ',' +  bebidas[i].strIngredient12 : null;
        bebidas[i].strIngredient13 ? ingredientes += ',' +  bebidas[i].strIngredient13 : null;
        bebidas[i].strIngredient14 ? ingredientes += ',' +  bebidas[i].strIngredient14 : null;
        bebidas[i].strIngredient15 ? ingredientes += ',' +  bebidas[i].strIngredient15 : null;

        let cantidades = '';
        bebidas[i].strMeasure1 ? cantidades += bebidas[i].strMeasure1 : null;
        bebidas[i].strMeasure2 ? cantidades += ',' +  bebidas[i].strMeasure2 : null;
        bebidas[i].strMeasure3 ? cantidades += ',' +  bebidas[i].strMeasure3 : null;
        bebidas[i].strMeasure4 ? cantidades += ',' +  bebidas[i].strMeasure4 : null;
        bebidas[i].strMeasure5 ? cantidades += ',' +  bebidas[i].strMeasure5 : null;
        bebidas[i].strMeasure6 ? cantidades += ',' +  bebidas[i].strMeasure6 : null;
        bebidas[i].strMeasure7 ? cantidades += ',' +  bebidas[i].strMeasure7 : null;
        bebidas[i].strMeasure8 ? cantidades += ',' +  bebidas[i].strMeasure8 : null;
        bebidas[i].strMeasure9 ? cantidades += ',' +  bebidas[i].strMeasure9 : null;
        bebidas[i].strMeasure10 ? cantidades += ',' +  bebidas[i].strMeasure10 : null;
        bebidas[i].strMeasure11 ? cantidades += ',' +  bebidas[i].strMeasure11 : null;
        bebidas[i].strMeasure12 ? cantidades += ',' +  bebidas[i].strMeasure12 : null;
        bebidas[i].strMeasure13 ? cantidades += ',' +  bebidas[i].strMeasure13 : null;
        bebidas[i].strMeasure14 ? cantidades += ',' +  bebidas[i].strMeasure14 : null;
        bebidas[i].strMeasure15 ? cantidades += ',' +  bebidas[i].strMeasure15 : null;
        
        bebidasProcesadas.push({
            nombre: bebidas[i].strDrink,
            categoria: bebidas[i].strCategory,
            tieneAlcohol: bebidas[i].strAlcoholic,
            dondeSeSirve: bebidas[i].strGlass,
            instrucciones: bebidas[i].strInstructions,
            ingredientes,
            cantidades,
            img: bebidas[i].strDrinkThumb,
            imgConDerechos: bebidas[i].strCreativeCommonsConfirmed
        });
    }
    fs.writeFileSync(__dirname + '/bebidas2.json', JSON.stringify(bebidasProcesadas), 'utf-8');
    console.log("datos de bebidas procesados correctamente!");
};

//transform(); */

module.exports = saveToDB;