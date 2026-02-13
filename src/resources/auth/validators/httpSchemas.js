import Joi from "joi";

export const registerBodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const loginBodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
