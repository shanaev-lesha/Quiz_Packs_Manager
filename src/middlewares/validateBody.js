import { AppError } from "../common/appError.js";

export function validateBody(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return next(new AppError("некорректное тело запроса", 400));
        }
        req.body = value;
        next();
    };
}
