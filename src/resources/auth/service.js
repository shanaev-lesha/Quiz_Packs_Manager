import bcrypt from "bcrypt";
import * as usersRepository from "../../repositories/users.js";
import { AppError } from "../../middlewares/errorHandler.js";

export async function register({ email, password }) {
    if (!email || !password) {
        throw new AppError("требуется адрес электронной почты и пароль", 400);
    }

    if (typeof password !== "string") {
        throw new AppError("пароль должен быть строкой", 400);
    }

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

    const existing = await usersRepository.findByEmail(email);
    if (existing) {
        throw new AppError("эта электронная почта уже существует", 409);
    }

    const password_hash = await bcrypt.hash(password, 10);

    return usersRepository.create({ email, password_hash });
}

export async function validateUser(email, password) {
    if (!email || !password) {
        throw new AppError("требуется адрес электронной почты и пароль", 400);
    }

    const user = await usersRepository.findByEmail(email);
    if (!user) {
        throw new AppError("пользователь с таким email не найден", 404)
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
        throw new AppError("неверный пароль", 401);
    }

    return user;
}