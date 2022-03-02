const { UserInputError } = require('apollo-server');

const Category = require('../../models/Category');
const { validatedCategory } = require('../../util/validatorsCategory');

module.exports = {
    Mutation: {
        async addCategory(parent, { category }, context) {
            const { valid, errors } = validatedCategory(category);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            const newCategory = new Category({
                category,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            const res = await newCategory.save();
            return {
                ...res._doc,
                id: res._id
            }
        },

        async updatedCategory(parent, { id, category }, context ) {
            const { valid, errors} = validatedCategory(category);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            try {
                const updatedCategory = await Category.findOneAndUpdate(
                    { _id: id },
                    { 
                        category,
                        updatedAt: new Date().toISOString(),
                    },
                    { new: true, runValidators: true }
                );

                return updatedCategory;
            } catch (error) {
                throw new Error(error)
            }
        },
    },

    Query: {
        async getAllCategory(parent, args, context) {
            try {
                const categories = await Category.find();
                return categories;
            } catch (error) {
                throw new Error(err)
            }
        },
    },
};