const { UserInputError } = require('apollo-server');

const Talla = require('../../models/Talla');
const { validatedTalla } = require('../../util/validateTalla');

module.exports = {
    Mutation: {
        async addTalla(parent, { talla }, context) {
            const { errors, valid } = validatedTalla(talla);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            const newTalla = new Talla({
                talla,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            const res = await newTalla.save();
            return {
                ...res._doc,
                id: res._id
            }
        },
        async updatedTalla(parent, { id, talla }, context) {
            const { valid, errors } = validatedTalla(talla);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            try {
                const updatedTalla = await Talla.findByIdAndUpdate(
                    { _id: id },
                    {
                        talla,
                        updatedAt: new Date().toISOString(),
                    },
                    { new: true, runValidators: true }
                );

                return updatedTalla;
            } catch (err) {
                throw new Error(err)
            }
        },

        async deletedTalla(parent, { id }, context) {
            try {
                const talla = await Talla.findByIdAndDelete({ _id: id });
                if (talla) {
                    return true;
                }
                else {
                    return false;
                }
            } catch (err) {
                throw new Error(err);
            };
        }
    },

    Query: {
        async getAllTallas(parent, args, context) {
            try {
                const tallas = await Talla.find();
                return tallas;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
};