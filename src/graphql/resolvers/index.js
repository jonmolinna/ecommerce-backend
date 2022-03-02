const userResolvers = require('./users');
const categoryResolvers = require('./category');
const productsResolvers = require('./products');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...categoryResolvers.Query,
        ...productsResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...categoryResolvers.Mutation,
    },
};