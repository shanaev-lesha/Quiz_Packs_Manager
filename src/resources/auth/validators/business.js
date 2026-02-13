import Joi from "joi";
import { AppError } from "../../../common/appError.js";

const emailSchema = Joi.string()
    .email({ tlds: { allow: false } })
    .max(254);

export function validateEmailFormat(email) {
    const { error } = emailSchema.validate(email);
    if (error) {
        throw new AppError("некорректный формат email", 400);
    }
}

export function validatePasswordComplexity(password) {
    if (password.length < 4) {
        throw new AppError("пароль должен быть не короче 4 символов", 400);
    }

    if (password.length > 64) {
        throw new AppError("пароль должен быть не длиннее 64 символов", 400);
    }

    if (/\s/.test(password)) {
        throw new AppError("пароль не должен содержать пробелы", 400);
    }

    if (!/[a-zA-Z]/.test(password)) {
        throw new AppError("пароль должен содержать хотя бы одну букву", 400);
    }

    if (!/\d/.test(password)) {
        throw new AppError("пароль должен содержать хотя бы одну цифру", 400);
    }
}
