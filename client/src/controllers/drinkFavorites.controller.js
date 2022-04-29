export const inFavorites = (data, drinkID) => {
    return data.map(el => String(el._id)).indexOf(drinkID) === -1;
};