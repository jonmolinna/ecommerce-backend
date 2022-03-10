const { model, Schema } = require('mongoose');

const reviewsSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    comment: {
        type: String,
        trim: true,
        lowercase: true,
    },
    productId: String,
    userId: String,
    createdAt: String,
    updatedAt: String,
});

module.exports = model('Reviews', reviewsSchema);