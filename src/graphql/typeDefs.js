const { gql } = require("apollo-server");

module.exports = gql`
    type Query {
        getUser(userId: ID!): User
        getAllCategory: [Category]
        getAllTallas: [Talla]
        getAllProducts: [Product]
    }

    type Mutation {
        register(input: AddUserInput!): User!
        login(email: String!, password: String!): User!
        updatedUser(id: ID!, input: UpdatedUserInput): User
        addCategory(category: String!): Category!
        updatedCategory(id: ID!, category: String!): Category!
        deleteCategory(id: ID!): Boolean!
        addTalla(talla: String!): Talla!
        updatedTalla(id: ID!, talla: String!): Talla!
        deletedTalla(id: ID!): Boolean!
        addProduct(input: AddProductInput!): Product!
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

    type Category {
        id: ID!,
        category: String!
        createdAt: String!,
        updatedAt: String!,
    }

    type Talla {
        id: ID!,
        talla: String!
        createdAt: String!,
        updatedAt: String!,
    }

    type Medida {
        talla: Talla
        stock: Int!
        createdAt: String,
    }

    type Product {
        id: ID!
        codigo: String!,
        marca: String!,
        descr: String!,
        precio: Float!,
        material: String!,
        color: String!,
        urlImage: String!,
        genero: String!
        detalles: [Detalle],
        category: Category,
        medida: [Medida],
        createdAt: String!
    }

    type Detalle {
        id: ID!
        detalle: String
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

    input AddProductInput {
        codigo: String!,
        marca: String!,
        descr: String!,
        precio: Float!,
        material: String!,
        color: String!,
        urlImage: String!,
        genero: String!,
        detalles: [AddDetalle],
        categoryId: String
    }

    input AddDetalle {
        detalle: String
    }
    
`;