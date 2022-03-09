const { UserInputError } = require('apollo-server');

const { validateRegisterProduct } = require('../../util/validateProduct');
const Product = require('../../models/Product');

module.exports = {
    Query: {
        async getAllProducts(parent, args, context){
            try {
                const products = await Product.find();
                return products;
            } catch (err) {
                throw new Error('Error, Algo salio mal')
            }
        },
        async getProductById(parent, { productId }, context) {
            try {
                return await Product.findById(productId);
            } catch (error) {
                throw new Error('Error, algo salio mal')
            }
        }
    },

    Mutation: {
        async addProduct(parent, { input }, context) {
            const { codigo, marca, descr, precio, material, color, urlImage, genero, detalles, categoryId} = input;

            const { valid, errors} = validateRegisterProduct(codigo, marca, descr, precio, material, color, urlImage, genero, detalles, categoryId);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            try {
                const newProduct = new Product({
                    codigo,
                    marca,
                    descr,
                    precio,
                    material,
                    color,
                    urlImage,
                    genero,
                    detalles,
                    categoryId,
                    createdAt: new Date().toISOString(),
                });
                
                const res = await newProduct.save();
    
                return {
                    ...res._doc,
                    id: res._id,
                }
            } catch (error) {
                console.log(error);
                throw new Error('Error, Algo salio mal')
            }
        },
        async addProductMedida(parent, {idProduct, input}, context) {
            try {
                const { tallaId, stock } = input;
                const product = await Product.findByIdAndUpdate(
                    { "_id":  idProduct},
                    {
                        $push: {
                            medida: {
                                tallaId,
                                stock,
                                createdAt: new Date().toISOString(),
                            }
                        }
                    },
                    { new: true, runValidators: true }
                )

                return product;
            } catch (err) {
                console.log(err);
                throw new Error('Error, algo salio mal')
            }
        }
    },
}