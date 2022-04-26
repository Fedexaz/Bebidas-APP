export const filterByName = (data, value) => {
    return data.filter(drink => drink.nombre.toLowerCase().includes(value.toLowerCase()));
};

export const filterByAlcoholic = (data, value) => {
    return data.filter(drink => drink.tieneAlcohol.toLowerCase() === value.toLowerCase());
};

export const filterByCategory = (data, value) => {
    return data.filter(drink => drink.categoria.toLowerCase() === value.toLowerCase());
};

export const orderByComments = (data, value) => {
    return data.sort((drinkA, drinkB) => {
        if (Number(value) === 1) {
            if (drinkA.comments < drinkB.comments) {
                return -1;
            }
            else {
                return 1;
            }
        }
        else {
            if (drinkA.comments > drinkB.comments) {
                return -1;
            }
            else {
                return 1;
            }
        }
    });
};

export const orderByReactions = (data, value) => {
    return data.sort((drinkA, drinkB) => {
        if (Number(value) === 1) {
            if (drinkA.likes.length < drinkB.likes.length) {
                return -1;
            }
            else {
                return 1;
            }
        }
        else {
            if (drinkA.likes.length > drinkB.likes.length) {
                return -1;
            }
            else {
                return 1;
            }
        }
    });
};

export const orderByName = (data, value) => {
    return data.sort((drinkA, drinkB) => {
        if (Number(value) === 1) {
            if (drinkA.nombre < drinkB.nombre) {
                return -1;
            }
            else {
                return 1;
            }
        }
        else {
            if (drinkA.nombre > drinkB.nombre) {
                return -1;
            }
            else {
                return 1;
            }
        }
    });
};