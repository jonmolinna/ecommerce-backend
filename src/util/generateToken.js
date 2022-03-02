const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../config');

module.exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
        },
        SECRET_TOKEN,
        { expiresIn: '24h'}

    )
};