const userResolvers = require('./users');
const categoryResolvers = require('./category');
const tallaResolvers = require('./talla');
const productsResolvers = require('./products');
const reviewsResolvers = require('./reviews');

const Category = require('../../models/Category');
const Talla = require('../../models/Talla');
const Product = require('../../models/Product');
const User = require('../../models/User');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...categoryResolvers.Query,
        ...tallaResolvers.Query,
        ...reviewsResolvers.Query,
        ...productsResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...categoryResolvers.Mutation,
        ...tallaResolvers.Mutation,
        ...reviewsResolvers.Mutation,
        ...productsResolvers.Mutation,
    },
    Product: { // typeDefs => type product
        category: async (parent, args, context) => {
            const categoryId = parent.categoryId;
            return await Category.findById(categoryId)
        },
    },
    Medida: {
        talla: async (parent, args, context) => {
            const tallaId = parent.tallaId;
            return await Talla.findOne(tallaId);
        }
    },
    Review: {
        product: async (parent, args, context) => {
            const { productId } = parent;
            const product = await Product.findById(productId);

            if (!product) {
                return null;
            }
            return product;
        },
        user: async (parent, args, context) => {
            const { userId } = parent;
            const user = await User.findById(userId);

            if(!user) {
                return null;
            }
            return user;
        }
    }
};