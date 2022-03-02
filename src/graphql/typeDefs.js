const { gql } = require("apollo-server");

module.exports = gql`
    type Query {
        getUser(userId: ID!): User
        getAllCategory: [Category]
        getAllProducts: [Product]
    }

    type Mutation {
        register(input: AddUserInput!): User!
        login(email: String!, password: String!): User!
        updatedUser(id: ID!, input: UpdatedUserInput): User
        addCategory(category: String!): Category!
        updatedCategory(id: ID!, category: String!): Category!
    }

    type User {
        id: ID!
        nombre: String!,
        apellido: String!,
        dni: String,
        telefono: String,
        email: String,
        fech_nacimiento: String,
        genero: String,
        createdAt: String!,
        updatedAt: String!,
        token: String,
    }

    input AddUserInput {
        nombre: String!
        apellido: String!,
        email: String!
        password: String!
        confirmPassword: String!
    }

    input UpdatedUserInput {
        nombre: String!,
        apellido: String!,
        dni: String,
        telefono: String,
        email: String,
        fech_nacimiento: String,
        genero: String,
    }

    type Category {
        id: ID!,
        category: String!
        createdAt: String!,
        updatedAt: String!,
    }

    type Product {
        id: ID!
        body: String
    }
`;