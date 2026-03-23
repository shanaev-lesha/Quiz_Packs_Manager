import { AppError } from '../common/appError.js';

export function validateBody(schema) {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(
        new AppError(
          'ValidationError',
          400,
          error.details.map((e) => ({
            field: e.path[0],
            message: e.message
          }))
        )
      );
    }
    req.body = value;
    next();
  };
}
