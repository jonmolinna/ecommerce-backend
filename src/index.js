const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');
const { MONGO_URI } = require('./config.js');

const PORT = process.env.PORT || 9000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.log(err);
    });