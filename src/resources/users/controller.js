class UsersController {
    async list(req, res) {
        res.json({ message: "Список пользователей" });
    }
}

export default new UsersController();



