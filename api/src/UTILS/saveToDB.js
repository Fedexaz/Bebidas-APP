const Bebida = require('./bebidas.model');
const fs = require('fs');

const saveToDB = async () => {
    try {
        const loadFile = fs.readFileSync(__dirname + '/bebidas.json', 'utf-8');
        const bebida = JSON.parse(loadFile);

        for (let i = 0; i < bebida.length; i++) {
            let datos = new Bebida({
                idDrink: bebida[i].idDrink,
                strDrink: bebida[i].strDrink,
                strDrinkAlternate: bebida[i].strDrinkAlternate,
                strTags: bebida[i].strTags,
                strVideo: bebida[i].strVideo,
                strCategory: bebida[i].strCategory,
                strIBA: bebida[i].strIBA,
                strAlcoholic: bebida[i].strAlcoholic,
                strGlass: bebida[i].strGlass,
                strInstructions: bebida[i].strInstructions,
                "strInstructionsZH-HANS": bebida[i]["strInstructionsZH-HANS"],
                "strInstructionsZH-HANT": bebida[i]["strInstructionsZH-HANT"],
                strDrinkThumb: bebida[i].strDrinkThumb,
                strIngredient1: bebida[i].strIngredient1,
                strIngredient2: bebida[i].strIngredient2,
                strIngredient3: bebida[i].strIngredient3,
                strIngredient4: bebida[i].strIngredient4,
                strIngredient5: bebida[i].strIngredient5,
                strIngredient6: bebida[i].strIngredient6,
                strIngredient7: bebida[i].strIngredient7,
                strIngredient8: bebida[i].strIngredient8,
                strIngredient9: bebida[i].strIngredient9,
                strIngredient10: bebida[i].strIngredient10,
                strIngredient11: bebida[i].strIngredient11,
                strIngredient12: bebida[i].strIngredient12,
                strIngredient13: bebida[i].strIngredient13,
                strIngredient14: bebida[i].strIngredient14,
                strIngredient15: bebida[i].strIngredient15,
                strMeasure1: bebida[i].strMeasure1,
                strMeasure2: bebida[i].strMeasure2,
                strMeasure3: bebida[i].strMeasure3,
                strMeasure4: bebida[i].strMeasure4,
                strMeasure5: bebida[i].strMeasure5,
                strMeasure6: bebida[i].strMeasure6,
                strMeasure7: bebida[i].strMeasure7,
                strMeasure8: bebida[i].strMeasure8,
                strMeasure9: bebida[i].strMeasure9,
                strMeasure10: bebida[i].strMeasure10,
                strMeasure11: bebida[i].strMeasure11,
                strMeasure12: bebida[i].strMeasure12,
                strMeasure13: bebida[i].strMeasure13,
                strMeasure14: bebida[i].strMeasure14,
                strMeasure15: bebida[i].strMeasure15,
                strImageSource: bebida[i].strImageSource,
                strImageAttribution: bebida[i].strImageAttribution,
                strCreativeCommonsConfirmed: bebida[i].strCreativeCommonsConfirmed,
                likes: 0,
                comments: 0,
                createdInPage: true,
                idCreator: userID  
            });
            await datos.save();
            console.log(`${datos.strDrink} (ID: ${datos.idDrink}) guardada en la base de datos!`);
        }

        console.log(" [ ! ] Datos guardados correctamente en la Base de Datos!");
    } catch (error) {
        console.log(error);
    }
};

module.exports = saveToDB;