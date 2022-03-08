const userResolvers = require('./users');
const categoryResolvers = require('./category');
const tallaResolvers = require('./talla');
const productsResolvers = require('./products');

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
};