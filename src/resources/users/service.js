import bcrypt from "bcrypt";
import usersRepository from "../../repositories/users.js";
import AppError from "../../app.js";

class UsersService {
    async register({ email, password }) {
        if (!email || !password) {
            throw new AppError("требуется адрес электронной почты и пароль", 400);
        }

        const existing = await usersRepository.findByEmail(email);
        if (existing) {
            throw new AppError("эта электронная почта уже существует", 409);
        }

        const password_hash = await bcrypt.hash(password, 10);

        return usersRepository.create({ email, password_hash });
    }

    async validateUser(email, password) {
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
}

export default new UsersService();

