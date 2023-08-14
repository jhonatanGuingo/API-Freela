import Joi from "joi";

export const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    number: Joi.string().pattern(/^\d{10,11}$/).required(),
    cpf: Joi.string().length(11).pattern(/^\d+$/),
    password: Joi.string().required().min(3),
    confirmPassword: Joi.string().required().min(3)
})

export const schemaSignIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3)
})

