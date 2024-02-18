const joi = require('joi');
const { validateSchema } = require('./index');

// Validation schema for the register route
const registerSchema = joi.object({
    name: joi.string().required().trim().label('Name'),
    username: joi.string().required().label('Username'),
    email: joi.string().email().required().label('Email'),
    password: joi.string().min(8).required().label('Password'),
    role: joi.string().label('Role')
});

// Validation schema for the login route
const loginSchema = joi.object({
    username: joi.string().required().label('Username'),
    password: joi.string().min(8).required().label('Password'),
});

/**
 * Middleware function to validate the request body for the register route.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
const validateRegister = (req, res, next) => {
    validateSchema(registerSchema, req, res, next);
};

/**
 * Middleware function to validate the request body for the login route.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
const validateLogin = (req, res, next) => {
    validateSchema(loginSchema, req, res, next);
};

module.exports = { validateRegister, validateLogin };
