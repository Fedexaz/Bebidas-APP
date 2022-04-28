import axios from 'axios';

export const getDrinks = async () => {
    try {
        const respuesta = await axios.get('/bebidas/todas');
        return respuesta.data;

    } catch (error) {
        console.log(error);
        throw Error("Ha ocurrido un error al cargar las bebidas");
    }
};

export const getDrinkDetail = async (_id) => {
    try {
        const resp = await axios.get('/bebidas/' + _id);
        return resp.data;
    } catch (error) {
        throw Error(error.response.data.error);
    }
};

export const getDrinkComments = async (_id) => {
    try {
        const resp = await axios.get('/bebidas/comentarios/' + _id);
        return resp.data;
    } catch (error) {
        throw Error(error.response.data.error);
    }
};

export const postComentario = async (drinkID, userID, comment, userName) => {
    try {
        await axios.post('/bebidas/comentario', { drinkID, userID, comment, userName }, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
    } catch (error) {
        throw Error(error.response.data.error);
    }
};

export const borrarComentario = async (commentID, userID) => {
    try {
        await axios.delete('/bebidas/comentario',
            {
                data: {
                    commentID,
                    userID
                },
                headers: {
                    "auth-token": JSON.parse(localStorage.getItem('token'))
                }
            }
        );
    } catch (error) {
        throw Error(error.response.data.error);
    }
};

export const getLikes = async (_id) => {
    try {
        const resp = await axios.get('/bebidas/likes/' + _id)
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export const addLike = async (drinkID, userID) => {
    try {
        await axios.post('/bebidas/like', { drinkID, userID }, { headers: { "auth-token": JSON.parse(localStorage.getItem('token')) } });
    } catch (error) {
        return error.response.data;
    }
};

export const removeLike = async (drinkID, userID) => {
    try {
        await axios.delete('/bebidas/like',
        {
            data: {
                drinkID,
                userID
            },
            headers: {
                "auth-token": JSON.parse(localStorage.getItem('token'))
            }
        }
    );
    } catch (error) {
        return error.response.data;
    }
};