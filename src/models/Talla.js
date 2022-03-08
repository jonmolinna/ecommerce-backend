const { model, Schema } = require('mongoose');

const tallaSchema = new Schema({
    talla: {
        type: String,
        trim: true,
        uppercase: true,
    },
    createdAt: String,
    updatedAt: String,
});

module.exports = model('Talla', tallaSchema);