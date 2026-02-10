import usersService from './service.js';

class AuthController {
    async register(req, res, next) {
        try {
            const user = await usersService.register(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
