const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authRegisterService = async (data) => {
    const isEmailExist = await User.findOne({ email: data.email });

    if (isEmailExist) {
        return 'Email ya registrado';
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);

    const user = new User({
        name: data.name,
        email: data.email,
        password: password
    });

    try {
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
       return error;
    }
};

const authLoginService = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) throw Error('Usuario no encontrado');

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw Error('contraseña no válida');

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET);
    
    return token;
};

module.exports = {
    authLoginService,
    authRegisterService
};