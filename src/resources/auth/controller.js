import { register as registerUser, validateUser } from "./service.js";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await validateUser(email, password);

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

export async function me(req, res) {
    res.json({ user: req.user });
}
