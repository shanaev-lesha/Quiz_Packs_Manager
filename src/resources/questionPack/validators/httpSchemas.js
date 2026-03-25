import Joi from 'joi';

export const createPackSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string().allow('', null),

  status: Joi.string()
    .valid('draft', 'published')
    .optional()
});
