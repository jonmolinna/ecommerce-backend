const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    codigo: {
        type: String,
        trim: true,
    },
    marca: {
        type: String,
        lowercase: true,
        trim: true,
    },
    descr: {
        type: String,
        trim: true,
    },
    precio: Number,
    material: {
        type: String,
        lowercase: true,
        trim: true,
    },
    color: {
        type: String,
        lowercase: true,
        trim: true,
    },
    urlImage: String,
    genero: {
        type: String,
        lowercase: true,
        trim: true,
    },
    detalles: [
        {
            detalle: {
                type: String,
                lowercase: true,
            }
        }
    ],
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    medida: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Talla',
            stock: Number,
            createdAt: String,
        }
    ],
    createdAt: String,
});

module.exports = model('Product', productSchema);