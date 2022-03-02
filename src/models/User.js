const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    nombre: {
        type: String,
        lowercase: true,
        trim: true,
    },
    apellido: {
        type: String,
        lowercase: true,
        trim: true,
    },
    email: String,
    password: String,
    dni: String,
    telefono: String,
    fech_nacimiento: String,
    genero: {
        type: String,
        lowercase: true,
        trim: true,
    },
    createdAt: String,
    updatedAt: String,
});

module.exports = model('User', userSchema);