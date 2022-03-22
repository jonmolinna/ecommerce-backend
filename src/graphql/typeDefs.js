const { gql } = require("apollo-server");

module.exports = gql`
    type Query {
        getUser(userId: ID!): User
        getAllCategory: [Category]
        getAllTallas: [Talla]
        getAllProducts(filter: ProductsFilterInput): [Product]
        getProductById(productId: ID!): Product
        getAllReviews: [Review]
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
        addProductMedida(idProduct: ID!, input: UpdatedProductMedidaInput!): Product!
        addReview(input: AddReviewInput!): Review!
        deleteReview(idReview: ID!): Boolean!
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
        id: ID!
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

    type Review {
        id: ID!,
        title: String,
        comment: String,
        product: Product,
        user: User,
        createdAt: String,
        updatedAt: String,
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

    input UpdatedProductMedidaInput {
        tallaId: String!
        stock: Int!
    }

    input AddReviewInput {
        title: String!,
        comment: String!,
        productId: String!,
        userId: String!,
    }

    input ProductsFilterInput {
        genero: String
    }
    
`;