import bcrypt from "bcrypt";
import * as usersRepository from "../../repositories/users.js";
import { AppError } from "../../common/appError.js";
import { validateEmailFormat, validatePasswordComplexity, } from "./validators/business.js";

export async function register({ email, password }) {

    validateEmailFormat(email);
    validatePasswordComplexity(password);

    const existing = await usersRepository.findByEmail(email);
    if (existing) {
        throw new AppError("эта электронная почта уже существует", 409);
    }

    const password_hash = await bcrypt.hash(password, 10);

    return usersRepository.create({ email, password_hash });
}

export async function validateUser(email, password) {
    validateEmailFormat(email);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
        throw new AppError("пользователь с таким email не найден", 404);
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
        throw new AppError("неверный пароль", 401);
    }

    return user;
}
