const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
    category: {
        type: String,
        lowercase: true,
        trim: true,
    },
    createdAt: String,
    updatedAt: String,
});

module.exports = model('Category', categorySchema);