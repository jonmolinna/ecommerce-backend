const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const { generateToken } = require('../../util/generateToken');
const { validateRegisterUser, validateLoginUser, validateUpdatedUser } = require('../../util/validatorsUser');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        async register(parent, args, context) {
            const {nombre, apellido, email, password, confirmPassword} = args.input;

            const { valid, errors } = validateRegisterUser(nombre, apellido, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            const user = await User.findOne({ email });
            if (user) {
                throw new UserInputError('Errors', {
                    errors: {
                        email: "Ya existe el correo electrónico, intente con otro",
                    }
                })
            };

            const passwordHash = await bcrypt.hash(password, 6);

            const newUser = new User({
                nombre,
                apellido,
                email,
                password: passwordHash,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            const res = await newUser.save();
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },

        async login(parent, { email, password }, context) {
            const { valid, errors } = validateLoginUser(email, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            const user = await User.findOne({ email });
            if (!user) {
                errors.general = 'Credenciales incorrectas';
                throw new UserInputError('Credenciales incorrectas', { errors });
            };

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = "Credenciales incorrectas";
                throw new UserInputError('Credenciales incorrectas', { errors });
            };

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token,
            };
        },

        async updatedUser(parent, { id, input: {nombre, apellido, dni, telefono, fech_nacimiento, genero } }, context) {
            const { errors, valid } = validateUpdatedUser(nombre, apellido, dni, telefono, fech_nacimiento, genero);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            };

            const user = await User.findById(id);
            if (!user) throw new Error('Usuario no existe.');

            const updatedUser = await User.findOneAndUpdate(
                { _id: id},
                {
                    nombre: nombre || user.nombre,
                    apellido: apellido || user.apellido,
                    dni: dni || user.dni,
                    telefono: telefono || user.telefono,
                    fech_nacimiento: fech_nacimiento || user.fech_nacimiento,
                    genero: genero || user.genero,
                    updatedAt: new Date().toISOString(),
                },
                { new: true, runValidators: true }
            );

            return updatedUser;
        }
    },

    Query: {
        async getUser(parent, { userId }, context) {
            const userToken = checkAuth(context);
            
            try {
                const user = await User.findById(userId);

                if (String(user._id) === userToken.id) {
                    return user;
                } else {
                    throw new AuthenticationError('Acción no permitida');
                }
            } catch (err) {
                throw new Error(err)
            }
        },
    },
};