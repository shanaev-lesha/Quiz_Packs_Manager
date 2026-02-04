import db from '../../knex.js';

class UsersRepository {
    findByEmail(email) {
        return db('users').where({ email }).first();
    }

    async create({ email, password_hash }) {
        const [user] = await db('users')
            .insert({ email, password_hash })
            .returning(['id', 'email', 'created_at']);
        return user;
    }
}

export default new UsersRepository();
