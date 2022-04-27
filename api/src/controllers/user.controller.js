const {
    authLoginService,
    authRegisterService
} = require('../services/user.service');

const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const authLoginController = async (req, res) => {
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const token = await authLoginService(req.body);
        if (token.length > 100) {
            res.header('auth-token', token).json(token);
        }
        else {
            res.status(400).json({ error: "No se pudo iniciar sesión, reintente..." })
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
};

const authRegisterController = async (req, res) => {
    const { error } = schemaRegister.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const user = await authRegisterService(req.body);
        if (typeof token !== 'string') {
            res.status(201).json(user);
        }
        else {
            res.status(400).json({ error: "No se ha podido registrar, reintente..." });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = {
    authLoginController,
    authRegisterController
}