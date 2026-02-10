import usersService from "../users/service.js";
import jwt from "jsonwebtoken";

class AuthController {
    async register(req, res, next) {
        try {
            const user = await usersService.register(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await usersService.validateUser(email, password);
            if (!user) {
                return res.status(401).json({ error: "Неверные учетные данные" });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({ token });
        } catch (e) {
            next(e);
        }
    }

    async me(req, res) {
        res.json({ user: req.user });
    }
}

export default new AuthController();
