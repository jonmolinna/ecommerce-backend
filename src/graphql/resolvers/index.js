const userResolvers = require('./users');
const categoryResolvers = require('./category');
const tallaResolvers = require('./talla');
const productsResolvers = require('./products');

const Category = require('../../models/Category');
const Talla = require('../../models/Talla');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...categoryResolvers.Query,
        ...tallaResolvers.Query,
        ...productsResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...categoryResolvers.Mutation,
        ...tallaResolvers.Mutation,
        ...productsResolvers.Mutation,
    },
    Product: { // typeDefs => type product
        category: async (parent, args, context) => {
            const categoryId = parent.categoryId;
            return await Category.findOne(categoryId)
        },
        medida: async (parent, args, context) => {
            // const medidas = parent.medida;

            // const medida = medidas.map(async function(medida){
            //     let talla = await Talla.findById(medida.tallaId);
            //     return await talla;
            // })

            // console.log('>>>>>', medida)

            // // return medida;
        }
    }
};