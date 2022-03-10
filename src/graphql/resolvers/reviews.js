const { UserInputError } = require('apollo-server');

const { validateAddReview } = require('../../util/validateReviews');
const Product = require('../../models/Product');
const User = require('../../models/User');
const Reviews = require('../../models/Reviews');

module.exports = {
    Mutation: {
        async addReview(parent, { input }, context) {
            const { title, comment, productId, userId } = input;

            const { errors, valid } = validateAddReview(title, comment);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            
            try {
                const product = await Product.findById(productId);
                const user = await User.findById(userId);

                const newReview = new Reviews({
                    title,
                    comment,
                    productId: product._id,
                    userId: user._id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                })

                const res = await newReview.save();
                return {
                    ...res._doc,
                    id: res._id
                }
            } catch (error) {
                throw new Error('Error, algo salio mal')
            }
        },
        async deleteReview(parent, { idReview }, context) {
            try {
                const review = await Reviews.findByIdAndDelete({ _id: idReview });
                if (review) {
                    return true;
                }
                return false;
            } catch (error) {
                throw new Error('Error, algo salio mal')
            }
        },
    },

    Query: {
        async getAllReviews(parent, args, context){
            try {
                const reviews = await Reviews.find();
                return reviews;
            } catch (error) {
                throw new Error('Error, algo salio mal')
            }
        }
    },
}